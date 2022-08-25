import * as React from "react"
import Box from "@mui/material/Box"
import FormControl from "@mui/material/FormControl"
import Input from "@mui/material/Input"
import InputLabel from "@mui/material/InputLabel"
import TextField from "@mui/material/TextField"

export default function TextInput({ placeholder, value, setValue, submit, type = "text", size = 2 }) {
  const keyPress = (e) => {
    if (e.keyCode == 13) {
      // triggerSubmit
      submit()
    }
  }

  return (
    <TextField
      type={type}
      label={placeholder}
      color="secondary"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={keyPress}
      fullWidth={true}
      size={size === 1 ? "small" : "medium"}
    />
  )
}
