import format from "date-fns/format"

export const generateTicket = (params) => {
  const ticket_date = format(new Date(), "yyLLdd-kkmm-")
  const rand1 = Math.floor(Math.random() * 10)
  const rand2 = Math.floor(Math.random() * 10)
  const rand3 = Math.floor(Math.random() * 10)
  const rand4 = Math.floor(Math.random() * 10)
  const ticket = `INC-${ticket_date}${rand1}${rand2}${rand3}${rand4}`
  return ticket
}
