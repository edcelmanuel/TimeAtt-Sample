import prisma from "@lib/prisma"

const handler = async (req, res) => {
  const { userId } = req.query
  switch (req.method) {
    case "GET":
      await get()
      break
    case "POST":
      await post()
      break
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  async function get() {
    const timestamps = await prisma.timeInOut.findMany({
      where: {
        UserId: Number(userId),
      },
    })
    return res.status(200).json(timestamps)
  }

  async function post() {
    const { firstday, lastday } = req.body
    const x = await prisma.$queryRaw`
      SELECT  "UserId", timestamp::date, COUNT(*)
      FROM public."TimeInOut"
      Where timestamp >= ${new Date(firstday)} AND timestamp <= ${new Date(lastday)} and "UserId" = ${Number(userId)}
      group by "UserId", timestamp::date
    `
    const newX = x.map((item) => {
      return { ...item, timestamp: item.timestamp.toISOString().substring(0, 10), count: item.count.toString() }
    })
    return res.status(200).json(newX)
  }
}

export default handler
