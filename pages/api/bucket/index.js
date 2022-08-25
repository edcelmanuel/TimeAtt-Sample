import nextConnect from "next-connect"
import multer from "multer"
import { v4 as uuidv4 } from "uuid"

const upload = multer({
  storage: multer.diskStorage({
    destination: "./public/uploads",
    filename: (req, file, cb) => {
      // console.log("first")
      const ext = file.mimetype.split("/")[1]
      const filename = `${uuidv4()}.${ext}`
      return cb(null, filename)
    },
    // console.log()
    // return cb(null, uuidv4)},
  }),
})

const apiRoute = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` })
  },
})

apiRoute.use(upload.array("theFiles"))

apiRoute.post((req, res) => {
  // console.log("uploads", req.files.length)
  const files = []

  req.files.forEach((file) => {
    files.push({
      link: `http://${req.headers.host}:${process.env.NEXT_PUBLIC_WEB_SOCKET_PORT}/uploads/${file.filename}`,
      filename: file.filename,
    })
  })
  res.status(200).json({ data: "success", files })
})

export default apiRoute

export const config = {
  api: {
    bodyParser: false, // Disallow body parsing, consume as stream
  },
}
