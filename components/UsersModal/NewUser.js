import TextInput from "@components/TextInput"
import React, { useRef, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { faker } from "@faker-js/faker"

export default function NewUser({ setIsVisible }) {
  const [submitData, setSubmitData] = useState({
    name: faker.name.fullName(),
    // password: "",
  })
  const [img, setImg] = useState("")

  const fileRef = useRef(null)

  const onImageChange = (e) => {
    const [file] = e.target.files
    setImg(URL.createObjectURL(file))
  }

  const handleOnChaneData = (value, key) => {
    const newSubmitData = { ...submitData }
    newSubmitData[key] = value
    setSubmitData(newSubmitData)
  }

  async function uploadFile(files) {
    var formData = new FormData()

    for (let index = 0; index < files.length; index++) {
      const file = files[index]
      formData.append(`theFiles`, file)
    }

    const xfiles = await fetch("/api/bucket", {
      // content-type header should not be specified!
      method: "POST",
      body: formData,
    }).then((response) => response.json())

    // console.log(xfiles)
    return xfiles
  }

  const handleSubmit = async () => {
    let hasError = false
    if (!img) {
      toast.info("Must Have Image")
      hasError = true
    }
    if (!submitData.name) {
      toast.info("Must Have Name")
      hasError = true
    }
    if (!submitData.person_id) {
      toast.info("Must Have Person Id")
      hasError = true
    }

    if (hasError === true) return null

    const uploaded = await uploadFile(fileRef.current.files)

    const response = await axios.put("/api/users", { ...submitData, profile_picture: uploaded.files[0].filename })
    if (response.data.status === "success") {
      toast.success("Successfully Added")
      setIsVisible(false)
    } else {
      toast.error(response.data.error)
    }
  }

  return (
    <div className="flex flex-col">
      <div className="flex mt-6">
        <div className="flex items-center justify-center">
          <div className="avatar">
            <div
              className="w-24 rounded-full cursor-pointer ring ring-primary ring-offset-base-100 ring-offset-2"
              onClick={() => fileRef.current.click()}
            >
              <img src={img ? img : "/defaultPicture.png"} />
            </div>
            <input type="file" ref={fileRef} accept=".jpg,.jpeg,.png" onChange={onImageChange} />
          </div>
        </div>

        <div className="flex flex-col w-full ml-4 space-y-4">
          <TextInput
            size={1}
            placeholder="Name"
            setValue={(e) => handleOnChaneData(e, "name")}
            value={submitData?.name}
          />
          <TextInput
            size={1}
            placeholder="Face ID"
            setValue={(e) => handleOnChaneData(parseInt(e), "person_id")}
            value={submitData?.person_id}
            type="number"
          />
        </div>
      </div>
      <div className="mt-4">
        <button className="w-full text-white btn btn-active btn-accent" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </div>
  )
}
