import * as fns from "date-fns"

export const getDate = (date) => {
  var readable_date = new Date(date)
  var newDate = fns.format(readable_date, "PP")
  return newDate
}

export const getTime = (date) => {
  var readable_date = new Date(date)
  var newDate = fns.format(readable_date, "p")
  return newDate
}

const dateParser = {
  getDate,
  getTime,
}

export default dateParser
