import xmlParser from "@lib/functions/xmlParser"
import socket from "@lib/initIO"
import prisma from "@lib/prisma"

const handler = async (req, res) => {
  const put = async () => {
    const jsonParsed = xmlParser(req.body)
    console.log(jsonParsed.Alarm.MatchedPerson.Person_ID)

    const user = await prisma.users.findUnique({
      where: {
        person_id: jsonParsed.Alarm.MatchedPerson.Person_ID,
      },
    })

    if (user) {
      const newTimeIn = await prisma.timeInOut
        .create({
          data: { UserId: user.id },
          include: {
            User: true,
          },
        })
        .then((user) => {
          socket.emit("timestamp", user)
          return res.status(200).json({ status: "success", user })
        })
    } else {
      return res.status(200).json({ status: "not found" })
    }
  }

  switch (req.method) {
    case "POST":
      await put()
      break
    case "GET":
      console.log("GET")
      break
    default:
      return res.status(405).end(`Method ${req.method} not allowed`)
  }
}

export default handler
