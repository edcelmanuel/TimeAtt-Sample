import xmlParser from "@lib/functions/xmlParser"

const handler = async (req, res) => {
  switch (req.method) {
    case "POST":
      const jsonParsed = xmlParser(req.body)
      res.status(200).json(jsonParsed.Alarm.MatchedPerson)
      break
    default:
      return res.status(405).end(`Method ${req.method} not allowed`)
  }
}

export default handler
