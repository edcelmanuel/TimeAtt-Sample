import axios from "axios"
import { id } from "date-fns/locale"
import React, { useEffect, useState } from "react"
import { useStoreUsers } from "store/useStore"
import { getDate, getTime } from "@lib/functions/dateParser"

function TableTimeAll() {
  const [rows, setRows] = useState([])
  useEffect(() => {
    const fetchTimeStamps = (second) => {
      axios.get("/api/timestamp").then((res) => setRows(res.data))
    }
    fetchTimeStamps()
  }, [])

  return (
    <div>
      <div className="mt-2">
        <Table rows={rows} />
      </div>
    </div>
  )
}

export default TableTimeAll

const Table = ({ rows }) => (
  <div className="overflow-x-auto">
    <table className="table w-full">
      {/* head */}
      <thead>
        <tr>
          <th />
          <th>Name</th>
          <th>Time</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        {/* row 1 */}
        {rows.map((item, key) => {
          return (
            <tr>
              <th>{item.id}</th>
              <th>{item.User.name}</th>
              <td>{getTime(item.timestamp)}</td>
              <td>{getDate(item.timestamp)}</td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
)
