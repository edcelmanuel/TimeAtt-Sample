import Buttons from "@components/Buttons"
import Modal from "@components/Modal"
import TextInput from "@components/TextInput"
import { useEffect, useState } from "react"
import UsersModal from "@components/UsersModal"
import axios from "axios"
import { toast } from "react-toastify"
import moment, { now } from "moment"
import { getDate, getTime } from "@lib/functions/dateParser"
import socket from "@lib/initIO"
import { useStoreUsers } from "store/useStore"

const UsersIcon = <i className="fa-solid fa-user-bounty-hunter"></i>

export default function Home() {
  const [pass, setPass] = useState("")
  const [visUsers, setVisUsers] = useState(false)
  const [date, setDate] = useState({ now: "", time: "" })
  const isIn = useStoreUsers((state) => state.isIn)
  const setIsIn = useStoreUsers((state) => state.setIsIn)

  const handleSubmit = async (params) => {
    console.log(pass)
    const response = await axios.put("/api/timestamp", { password: pass })
    console.log(response.data)

    // `TimeStamped: ${response.data.user.User.name}`
    if (response.data.status === "success") {
      toast.success(<UserComponent user={response.data.user} />, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: false,
      })
    } else {
      toast.error(response.data.status)
    }

    setPass("")
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date()
      setDate({ now: getDate(d), time: getTime(d) })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    socket.on("new_data", (user) => {
      toast.success(<UserComponent user={user} />, {
        position: toast.POSITION.TOP_LEFT,
        autoClose: false,
      })
    })

    return () => {
      socket.off("new_data")
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="mb-4">
        <Buttons icon={UsersIcon} text="View Users" onClick={() => setVisUsers(true)} />
      </div>

      {/* <div className="w-full max-w-lg">
        <TextInput placeholder="Pass Code" value={pass} setValue={setPass} submit={handleSubmit} type="password" />
      </div> */}

      <div className="flex flex-col items-center justify-center w-full mt-4 font-black max-w-8xl">
        <div className="flex">
          <div className="mx-1">Time</div>
          <div
            className={`py-0 cursor-pointer mx-1 ${isIn ? "text-white bg-gray-700 rounded px-4" : ""}`}
            onClick={() => setIsIn(true)}
          >
            In
          </div>
          <div
            className={`mx-1 cursor-pointer ${!isIn ? "text-white bg-gray-700 rounded px-4" : ""}`}
            onClick={() => setIsIn(false)}
          >
            Out
          </div>
        </div>
        <div>{date.now}</div>
        <div>{date.time}</div>
      </div>

      <Modal isVisible={visUsers} setIsVisible={setVisUsers} title={"Users"} cancelButton={true} size={9}>
        <UsersModal />
      </Modal>
    </div>
  )
}

const UserComponent = ({ user }) => {
  const [ago, setAgo] = useState("")
  const nowDate = now()
  console.log(user)

  useEffect(() => {
    const timer = setInterval(() => {
      const parsed = moment.parseZone(user.timestamp).local()
      const ago = parsed.startOf("second").fromNow()
      setAgo(ago)
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const coords = user.coords.split(",")
  console.log(coords)

  return (
    <div>
      <div className="flex items-center space-x-3">
        <div className="avatar">
          <div className="w-12 h-12 mask mask-squircle">
            {/* <img
              src={`http://localhost:2020/uploads/${user.User.profile_picture}`}
              alt="Avatar Tailwind CSS Component"
            /> */}
            <img src={user.image_url} alt="Avatar Tailwind CSS Component" />
          </div>
        </div>
        <div>
          <div className="font-bold capitalize">{user.User.name}</div>
          <div className="text-sm opacity-50">
            Time <i>{user.status}</i> : {ago}
          </div>
          <div className="text-sm">
            <a
              className="flex items-center cursor-pointer"
              href={`https://www.google.com/maps/place/${user.coords}`}
              target="_blank"
            >
              <i className="mr-2 fa-solid fa-location-dot"></i>
              {parseFloat(coords[0]).toFixed(5)},{parseFloat(coords[1]).toFixed(5)}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
