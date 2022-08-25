const bcrypt = require("bcrypt")
const saltRounds = 10

const encrypt = async (password) => {
  const hash = await bcrypt.hash(password, saltRounds)
  return hash
}

const compare = async (password, hash) => {
  const isMatched = await bcrypt.compare(password, hash)
  return isMatched
}

export { encrypt, compare }
