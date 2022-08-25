import prisma from "@lib/prisma"

const handler = async (req, res) => {
  const get = async () => {
    const users = await prisma.users.findMany()
    res.status(200).json(users)
  }

  const put = async () => {
    const payload = req.body
    await prisma.users
      .create({
        data: { ...payload },
      })
      .then((user) => {
        return res.status(200).json({ status: "success", user })
      })
      .catch((error) => {
        return res.status(404).json({ status: "error", error })
      })
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
