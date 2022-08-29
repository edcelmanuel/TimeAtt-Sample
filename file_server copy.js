const express = require("express")
const bodyParser = require("body-parser")
const dotenv = require("dotenv")
const { Server } = require("socket.io")
const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

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

app.use(express.static("public"))

app.post("/post-test", (req, res) => {
  console.log("Got body:", req.body)
  res.sendStatus(200)
})

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
