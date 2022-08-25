import Modal from "@components/Modal"
import axios from "axios"
import React, { useEffect, useState } from "react"
import { useStoreUsers } from "store/useStore"
import NewUser from "./NewUser"

export const Table = () => {
  const [isVisible, setIsVisible] = useState(false)
  const users = useStoreUsers((state) => state.users)
  const setUsers = useStoreUsers((state) => state.setUsers)

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await axios.get("/api/users")
      setUsers(users.data)
    }
    fetchUsers()
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <div className="w-full mt-4 overflow-x-auto">
      <Modal isVisible={isVisible} setIsVisible={setIsVisible} title="New User" size={3}>
        <NewUser setIsVisible={setIsVisible} />
      </Modal>
      <div className="btn btn-primary" onClick={() => setIsVisible(true)}>
        Create User
      </div>
      <table className="table w-full">
        {/* head */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Job</th>
            <th>Favorite Color</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((item, key) => (
            <TableRow key={key} user={item} />
          ))}
        </tbody>
      </table>
    </div>
  )
}

const TableRow = ({ user }) => (
  <tr>
    <th>
      <label>
        <input type="checkbox" className="checkbox" />
      </label>
    </th>
    <td>
      <div className="flex items-center space-x-3">
        <div className="avatar">
          <div className="w-12 h-12 mask mask-squircle">
            <img src={`http://localhost:2020/uploads/${user.profile_picture}`} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div className="font-bold">{user.name}</div>
          <div className="text-sm opacity-50">{user.password}</div>
        </div>
      </div>
    </td>
    <td>
      Zemlak, Daniel and Leannon
      <br />
      <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
    </td>
    <td>Purple</td>
    <th>
      <button className="btn btn-ghost btn-xs">details</button>
    </th>
  </tr>
)
