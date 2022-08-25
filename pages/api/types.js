import { apiHandler } from "@lib/api"
import prisma from "@lib/prisma"

const handler = async (req, res) => {
  switch (req.method) {
    case "GET":
      const types = {
        report_types: await get_event_report_types(),
        event_priorities: await get_event_priorities(),
        incident_types: await get_event_incident_types(),
        responder_types: await get_responder_types(),
      }
      res.status(201).json(types)
      break
    default:
      return res.status(405).end(`Method ${req.method} not allowed`)
  }
}

export default apiHandler(handler)

async function get_event_report_types(params) {
  const event_report_types = await prisma.event_report_types.findMany({
    where: {
      is_deleted: false,
    },
    include: {
      event_types: {
        select: {
          id: true,
          name: true,
          logo: true,
          report_type: true,
          default_responders: {
            select: {
              id: true,
              name: true,
              logo: true,
            },
          },
        },
      },
    },
  })
  return event_report_types
}

async function get_event_priorities() {
  const event_priorities = await prisma.event_priorities.findMany({
    where: {
      is_deleted: false,
    },
  })
  return event_priorities
}

async function get_event_incident_types() {
  const event_incident_types = await prisma.event_incident_types.findMany({
    where: {
      is_deleted: false,
    },
  })
  return event_incident_types
}

async function get_responder_types(params) {
  const responder_types = await prisma.responder_types.findMany({
    where: {
      is_deleted: false,
    },
  })
  return responder_types
}
