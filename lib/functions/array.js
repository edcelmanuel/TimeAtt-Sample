export const getIndex = (array, id) => array.findIndex((item) => item.id === id)

export const getArrayType = (lists, panel) => lists[panel]

const queryKey = ["event_levels", "event_report_types", "responder_types", "event_incident_types"]

export const getQueryKey = (panel) => queryKey[panel]

export const findType = (value, list) => list.find((item) => item.id === value)

export const sortArrayObj = (elements) => {
  return elements.sort((a, b) => {
    return a.id - b.id
  })
}
