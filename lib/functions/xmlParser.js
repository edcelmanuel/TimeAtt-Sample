import { XMLParser } from "fast-xml-parser"

const options = {
  ignoreAttributes: true,
}

export default function xmlParser(text) {
  const parser = new XMLParser(options)
  let jsonObj = parser.parse(text)
  return jsonObj
}
