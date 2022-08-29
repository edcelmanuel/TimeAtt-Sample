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
var server = app.listen(port, () => console.log(`Listening on port ${port}`))
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
})

const tcpserver = new Net.Server()
tcpserver.listen(port, function () {
  console.log(`Server listening for connection requests on socket localhost:${port}`)
})
tcpserver.on("connection", function (socket) {
  console.log("A new connection has been established.")

  socket.on("data", function (chunk) {
    console.log(`Data received from client: ${chunk.toString()}`)
  })
})

app.use(express.static("public"))
app.use(express.text())

io.on("connection", (socket) => {
  socket.emit("id", socket.id)
  socket.on("disconnect", async () => {
    console.log("disconnect")
  })

  socket.on("timestamp", async (payload) => {
    console.log("timestamp")
    io.emit("new_data", payload)
  })
})

app.get("/", async (req, res) => {
  console.log("GET")
  return res.status(200).json("")
})

app.put("/", async (req, res) => {
  console.log("GET")
  return res.status(200).json("")
})

app.patch("/", async (req, res) => {
  console.log("GET")
  return res.status(200).json("")
})

app.post("/", async (req, res) => {
  console.log("Got body: raw", req.body)
  return res.status(200).json("")
  // const jsonParsed = xmlParser(req.body)
  // console.log(jsonParsed.Alarm.MatchedPerson.Person_ID)

  // const user = await prisma.users.findUnique({
  //   where: {
  //     person_id: jsonParsed.Alarm.MatchedPerson.Person_ID,
  //   },
  // })

  // if (user) {
  //   const newTimeIn = await prisma.timeInOut
  //     .create({
  //       data: { UserId: user.id },
  //       include: {
  //         User: true,
  //       },
  //     })
  //     .then((user) => {
  //       io.emit("new_data", user)
  //       return res.status(200).json({ status: "success", user })
  //     })
  // } else {
  //   return res.status(200).json({ status: "not found" })
  // }
})
