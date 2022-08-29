const handler = (req, res) => {
  console.log(req.method, req.body)
  switch (req.method) {
    case "GET":
      console.log("GET")
      res.status(200).end(`Method ${req.method} is allowed`)
      break
    case "POST":
      console.log("POST")
      res.status(200).end(`Method ${req.method} is allowed`)
      break
    case "PUT":
      console.log("PUT")
      res.status(200).end(`Method ${req.method} is allowed`)
      break
    default:
      return res.status(405).end(`Method ${req.method} not allowed`)
  }
}

export default handler
