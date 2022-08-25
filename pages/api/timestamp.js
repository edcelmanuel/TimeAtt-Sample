import prisma from "@lib/prisma"

const handler = async (req, res) => {
  const get = async () => {
    const users = await prisma.timeInOut.findMany()
    res.status(200).json(users)
  }

  const put = async () => {
    const payload = req.body

    const user = await prisma.users.findUnique({
      where: {
        password: payload.password,
      },
    })

    if (user) {
      await prisma.timeInOut
        .create({
          data: { UserId: user.id },
          include: {
            User: true,
          },
        })
        .then((user) => {
          return res.status(200).json({ status: "success", user })
        })
        .catch((error) => {
          return res.status(404).json({ status: "error", error })
        })
    } else {
      return res.status(200).json({ status: "not found" })
    }
  }

  switch (req.method) {
    case "GET":
      await get()
      break
    case "PUT":
      await put()
      break
    default:
      return res.status(405).end(`Method ${req.method} not allowed`)
  }
}

export default handler
