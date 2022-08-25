import { generate } from "randomstring"
import prisma from "@lib/prisma"
import { encrypt } from "@lib/functions/bcryptProc"

const handler = async (req, res) => {
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

  async function isNull(req) {
    if (req == null) {
      return ""
    } else {
      return req
    }
  }

  async function get() {
    const is_deleted = false
    // const userData = await prisma.$queryRaw`
    // SELECT * FROM public.user WHERE is_deleted = ${is_deleted};
    // `
    const userData = await prisma.user.findMany({
      where: {
        is_deleted: is_deleted,
      },
    })
    res.status(200).json(userData)
  }

  async function post() {
    const email = await isNull(req.body.email)
    const username = await isNull(req.body.username)
    const password = generate(10)
    const phone_no = await isNull(req.body.phone_no)
    const home_no = await isNull(req.body.home_no)
    const token = await isNull(req.body.token)
    const name = await isNull(req.body.name)
    const name_first = await isNull(req.body.name_first)
    const name_middle = await isNull(req.body.name_middle)
    const name_last = await isNull(req.body.name_last)
    const suffix = await isNull(req.body.suffix)
    const gender = await isNull(req.body.gender)
    const dob = await isNull(req.body.dob)
    const barangay = await isNull(req.body.barangay)
    const region = await isNull(req.body.region)
    const city = await isNull(req.body.city)
    const province = await isNull(req.body.province)
    const remarks = await isNull(req.body.remarks)
    const profile_picture = await isNull(req.body.profile_picture)
    const is_deleted = false
    const is_online = false
    const is_first = true
    const added_by = 0
    const updated_by = 0

    // console.log(JSON.stringify(password))

    const newUser = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: await encrypt(password),
        phone_no: phone_no,
        home_no: home_no,
        token: token,
        name: name,
        name_first: name_first,
        name_middle: name_middle,
        name_last: name_last,
        suffix: suffix,
        gender: gender,
        dob: dob,
        barangay: barangay,
        region: region,
        city: city,
        province: province,
        remarks: remarks,
        profile_picture: profile_picture,
        user_type: 2,
        is_deleted: is_deleted,
        is_online: is_online,
        is_first: is_first,
        added_by: added_by,
        updated_by: updated_by,
      },
    })
    res.status(201).json(newUser)
  }
}

export default handler
