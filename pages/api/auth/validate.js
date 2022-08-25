// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@lib/prisma"
import { apiHandler } from "../../../lib/api"
import parseToken from "../../../lib/functions/parseToken"

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      return validate()
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function validate() {
    const tokenData = parseToken(req.headers.authorization)
    const { data } = tokenData
    const { username } = tokenData.data

    const users = await prisma.users.findMany({
      where: {
        username: username,
      },
    })

    if (users.length === 0) return res.status(200).json({ isValidate: false })

    const user = users[0]
    const compare1 = {
      username: user.username,
      password: user.password,
      is_deleted: user.is_deleted,
    }
    const compare2 = {
      username: data.username,
      password: data.password,
      is_deleted: data.is_deleted,
    }

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
    }

    const isValidate = JSON.stringify(compare1) === JSON.stringify(compare2)

    if (isValidate) {
      return res.status(200).json({ isValidate, user: publicData })
    } else {
      return res.status(200).json({ isValidate })
    }
  }
}

export default apiHandler(handler)
