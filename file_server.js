const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const { Server } = require("socket.io")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()
const { XMLParser } = require("fast-xml-parser")
const Net = require("net")

const options = {
  ignoreAttributes: true,
}

function xmlParser(text) {
  const parser = new XMLParser(options)
  let jsonObj = parser.parse(text)
  return jsonObj
}

dotenv.config()
const port = 2020

const app = express()
var server = app.listen(port, () => console.log(`websocket:${port}`))
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

const tcpport = 2030
const tcpserver = new Net.Server()
tcpserver.listen(tcpport, function () {
  console.log(`tcpport:${tcpport}`)
})
tcpserver.on("connection", function (socket) {
  console.log("A new connection has been established.")

  socket.on("data", function (chunk) {
    // console.log(`Data received from client: ${chunk.toString()}`)
    processData(chunk.toString())
  })
})

app.use(express.static("public"))
app.use(express.text())

io.on("connection", (socket) => {
  socket.emit("id", socket.id)
  //   socket.on("disconnect", async () => {
  //     console.log("disconnect")
  //   })

  socket.on("timestamp", async (payload) => {
    console.log("timestamp")
    io.emit("new_data", payload)
  })
})

const processData = async (xml) => {
  let jsonParsed
  try {
    jsonParsed = xmlParser(xml)
  } catch (error) {
    console.log("Error1")
    return null
  }
  let InOut
  let MatchedPerson
  try {
    console.log("Camera = ", jsonParsed.Alarm.AlarmCamera.CameraID)
    if (jsonParsed.Alarm.AlarmCamera.CameraID === 0) {
      MatchedPerson = jsonParsed.Alarm.MatchedPerson
      InOut = "in"
    } else {
      MatchedPerson = jsonParsed.Alarm.MatchedPerson[0]
      InOut = "out"
    }
  } catch (error) {
    console.log("Error2")
    return null
  }

  if (!MatchedPerson?.Person_ID) {
    console.log("Person_ID, Undifiened")
    fs = require("fs")
    fs.writeFile("error2.txt", JSON.stringify(jsonParsed))
    return null
  } else {
    console.log("ID: ", MatchedPerson.Person_ID)
  }

  const user = await prisma.users.findUnique({
    where: {
      person_id: MatchedPerson.Person_ID,
    },
  })

  if (user?.id) {
    const newTimeIn = await prisma.timeInOut
      .create({
        data: {
          UserId: user.id,
          image_url: jsonParsed.Alarm.ImageUrl,
          status: InOut,
        },
        include: {
          User: true,
        },
      })
      .then((user) => {
        io.emit("new_data", { ...user, coords: jsonParsed.Alarm.AlarmCamera.LongDescription })
        console.log("status: Success")
      })
  } else {
    console.log("status: Not Found")
  }
}
