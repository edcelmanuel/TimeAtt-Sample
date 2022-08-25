import React from "react"
import Button from "@mui/material/Button"

function Buttons({ icon, text, onClick }) {
  return (
    <Button variant="outlined" startIcon={icon} onClick={onClick}>
      {text}
    </Button>
  )
}

export default Buttons
