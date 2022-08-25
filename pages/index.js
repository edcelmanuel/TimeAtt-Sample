import Buttons from "@components/Buttons"
import Modal from "@components/Modal"
import TextInput from "@components/TextInput"
import { useState } from "react"
import UsersModal from "@components/UsersModal"
import axios from "axios"
import { toast } from "react-toastify"

const UsersIcon = <i className="fa-solid fa-user-bounty-hunter"></i>

export default function Home() {
  const [pass, setPass] = useState("")
  const [visUsers, setVisUsers] = useState(false)

  const handleSubmit = async (params) => {
    console.log(pass)
    const response = await axios.put("/api/timestamp", { password: pass })
    console.log(response.data)

    if (response.data.status === "success") {
      toast.success(`TimeStamped: ${response.data.user.User.name}`)
    } else {
      toast.error(response.data.status)
    }

    setPass("")
  }

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen">
      <div className="mb-4">
        <Buttons icon={UsersIcon} text="View Users" onClick={() => setVisUsers(true)} />
      </div>

      <div className="max-w-8xl">
        <TextInput placeholder="Pass Code" value={pass} setValue={setPass} submit={handleSubmit} type="password" />
      </div>

      <Modal isVisible={visUsers} setIsVisible={setVisUsers} title={"Users"} cancelButton={true} size={9}>
        <UsersModal />
      </Modal>
    </div>
  )
}
