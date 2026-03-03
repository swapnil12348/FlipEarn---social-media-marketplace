import React, { useState } from 'react'

const WithdrawModal = ({onClose}) => {
    const [amount, setAmount] = useState("")
    const [account, setAccount]=useState([
        {type:"text", name: "Account Holder Name", value: "" },
        {type:"text", name: "Bank Name", value:"" },
        {type:"number", name: "Account Number", value:""},
        {type:"text", name:"Account Type", value: ""},
        {type:"text", name: "SWIFT", value: ""},
        {type:"text", name:"Branch", value:""},
    ])

  return (
    <div>

    </div>
  )
}

export default WithdrawModal