import io from "socket.io-client"

import getConfig from "next/config"
const { publicRuntimeConfig } = getConfig()

const webSocket = publicRuntimeConfig.webSocket
// const webSocket = "ws://localhost:2020"

// ws://192.168.227.62:2022
let socket = io(webSocket)

if (process.env.NODE_ENV === "production") {
  socket = io(webSocket)
} else {
  if (!global.socket) {
    global.socket = io(webSocket)
  }
  socket = global.socket
}

export default socket
