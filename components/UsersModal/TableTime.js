import axios from "axios"
import { id } from "date-fns/locale"
import React, { useEffect, useState } from "react"
import { useStoreUsers } from "store/useStore"
import { getDate, getTime } from "@lib/functions/dateParser"
import CalendarHeatmap from "react-calendar-heatmap"
import ReactTooltip from "react-tooltip"

var date = new Date()

function TableTime() {
  const [isLoading, setIsLoading] = useState(true)
  const [rows, setRows] = useState([])
  const [month, setMonth] = useState({
    firstDay: null,
    lastDay: null,
  })
  const [monthDates, setMonthDates] = useState([])
  const selectedUser = useStoreUsers((state) => state.selectedUser)
  const [dateSelected, setDateSelected] = useState("")

  useEffect(() => {
    const fetchTimeStamps = (second) => {
      console.log(selectedUser)
      if (!selectedUser.id) return null
      axios.get("/api/timestamp/" + selectedUser.id).then((res) => setRows(res.data))
    }
    fetchTimeStamps()
  }, [selectedUser])

  useEffect(() => {
    console.log(rows)
  }, [rows])

  useEffect(() => {
    console.log(selectedUser)
    setIsLoading(true)
    const runDateFunction = async () => {
      var firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
      var lastDay = new Date(date.getFullYear(), date.getMonth(), daysInMonth(date.getMonth() + 1, date.getFullYear()))
      setMonth({
        firstDay: firstDay.setDate(firstDay.getDate() - 1),
        lastDay,
      })

      var xfD = new Date(firstDay.setDate(firstDay.getDate() - 1))

      const result = await axios.post("/api/timestamp/" + selectedUser.id, {
        firstday: xfD.toISOString(),
        lastday: lastDay.toISOString(),
      })
      const attendances = result.data
      console.log(attendances)

      const xmonthDates = getRange(daysInMonth(date.getMonth() + 1, date.getFullYear())).map((index) => {
        const gDate = shiftDate(date, -index)
        const nDate = gDate.toISOString().substring(0, 10)
        let count = 0

        for (let index = 0; index < attendances.length; index++) {
          const attendance = attendances[index]
          if (attendance.timestamp === nDate) {
            count = Number(attendance.count)
          }
        }

        return {
          date: gDate,
          count: count,
        }
      })
      setMonthDates(xmonthDates)
      setIsLoading(false)
    }

    runDateFunction()
  }, [selectedUser])

  function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
  }

  function getRange(count) {
    return Array.from({ length: count }, (_, i) => i)
  }

  function shiftDate(date, numDays) {
    const newDate = new Date(date)
    newDate.setDate(newDate.getDate() + (numDays + 2))
    return newDate
  }

  return (
    <div>
      <div className="mt-2">
        <div className="mb-2">{selectedUser.name}: </div>

        {!isLoading ? (
          <div className="p-4">
            <CalendarHeatmap
              startDate={month.firstDay}
              endDate={month.lastDay}
              values={monthDates}
              showMonthLabels={true}
              showWeekdayLabels={true}
              // showOutOfRangeDays={true}
              horizontal={false}
              tooltipDataAttrs={(value) => {
                return {
                  "data-tip": `has count: ${value.count}`,
                }
              }}
              transformDayElement={(element, value, index) => (
                <g key={index}>
                  {element}
                  <text
                    x={element["props"].x + 1}
                    y={element["props"].y + 8}
                    style={{
                      fontSize: "0.2em",
                      fill: "#fff",
                    }}
                    className="pointer-events-none"
                  >
                    {value?.date && value.date.getDate()}
                  </text>
                </g>
              )}
              classForValue={(value) => {
                if (!value?.count) {
                  return "color-empty"
                }
                if (value.count % 2 === 1) {
                  return `color-scale-odd`
                } else {
                  return `color-scale-add`
                }
                // return `color-scale-${value.count}`
              }}
              onClick={
                (value) => setDateSelected(value.date.toISOString().substring(0, 10))
                // alert(`Clicked on value with count: ${value.count} ${}`)
              }
            />

            <ReactTooltip />
          </div>
        ) : (
          <div>Loading</div>
        )}
        <Table rows={rows} dateSelected={dateSelected} />
      </div>
    </div>
  )
}

export default TableTime

const Table = ({ rows, dateSelected }) => {
  const [xrows, setxRows] = useState([])
  useEffect(() => {
    if (dateSelected) {
      const newRow = []
      for (let index = 0; index < rows.length; index++) {
        const element = rows[index]

        if (element.timestamp.substring(0, 10) === dateSelected) {
          // console.log(element)
          newRow.push(element)
        }
      }
      setxRows(newRow)
    }
  }, [dateSelected])

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th />
            <th>In/Out</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          {dateSelected
            ? xrows.map((item, key) => {
                return (
                  <tr key={key}>
                    <th>{item.id}</th>
                    <td className="capitalize">{item?.status}</td>
                    <td>{getTime(item.timestamp)}</td>
                    <td>{getDate(item.timestamp)}</td>
                  </tr>
                )
              })
            : rows.map((item, key) => {
                return (
                  <tr key={key}>
                    <th>{item.id}</th>
                    <td className="capitalize">{item?.status}</td>
                    <td>{getTime(item.timestamp)}</td>
                    <td>{getDate(item.timestamp)}</td>
                  </tr>
                )
              })}
        </tbody>
      </table>
    </div>
  )
}
