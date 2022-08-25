const jwt = require("jsonwebtoken")
import getConfig from "next/config"

import { apiHandler } from "../../../lib/api"
import { compare } from "../../../lib/functions/bcryptProc"
import prisma from "@lib/prisma"

const { serverRuntimeConfig } = getConfig()

export default apiHandler(handler)

function handler(req, res) {
  switch (req.method) {
    case "POST":
      return authenticate()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function authenticate() {
    const { username, password } = req.body

    const users = await prisma.users.findMany({
      where: { username: username },
    })

    const user = users[0]

    if (!user) throw "Username or password is incorrect"
    const isMatched = await compare(password, user.password)
    if (!isMatched) throw "Password is incorrect"

    const publicData = {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      phone_no: user.phone_no,
      name_first: user.name_first,
      name_middle: user.name_middle,
      name_last: user.name_last,
      profile_picture: user.profile_picture,
      user_type: user.user_type,
      is_deleted: user.is_deleted,
      is_first: user.is_first,
      user_type_id: user.user_type_id,
    }

    // console.log(username, password, user.user_type_id)

    const token = jwt.sign({ data: publicData }, serverRuntimeConfig.secret, {
      expiresIn: "1y",
    })

    // return basic user details and token
    return res.status(200).json({
      user: publicData,
      token,
    })
  }
}
