import React, { useState } from 'react'
import toast from 'react-hot-toast'

const CredentialSubmission = ({onClose, listing}) => {

    const [newField, setNewField]= useState("")
    const [credential, setCredential] = useState([
        {type: "email", name: "Email", value:""},
        {type: "password", name:"Password", value:""}
    ])

    const handleAddField = ()=>{
        const name = newField.trim();
        if(!name) return toast("Please enter a field name");
        setCredential((prev)=>[...prev, {type: "text", name, value: ""}])
        setNewField("")
    }

    const handleSubmission = async (e) => {
        e.preventdefault();
        
    }

  return (
    <div>
       
    </div>
  )
}

export default CredentialSubmission