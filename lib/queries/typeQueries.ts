import { axi } from "@lib/fetchHelper"
import { Query } from "./queries"

export const typeQueries: Query[] = [
  {
    queryKey: "event_priorities",
    queryFn: async () => await axi.get("/event_priorities"),
  },
  {
    queryKey: "event_report_types",
    queryFn: async () => await axi.get("/event_report_types"),
  },
  {
    queryKey: "responder_types",
    queryFn: async () => await axi.get("/responder_types"),
  },
  {
    queryKey: "event_incident_types",
    queryFn: async () => await axi.get("/event_incident_types"),
  },
  {
    queryKey: "event_types",
    queryFn: async () => await axi.get("/event_types"),
  },
  {
    queryKey: "event_report_types",
    queryFn: async () => await axi.get("/event_report_types"),
  },
  {
    queryKey: "departments",
    queryFn: async () => await axi.get("/departments"),
  },
  {
    queryKey: "department_types",
    queryFn: async () => await axi.get("/department_types"),
  },
  {
    queryKey: "responders",
    queryFn: async () => await axi.get("/responders"),
  },
]
