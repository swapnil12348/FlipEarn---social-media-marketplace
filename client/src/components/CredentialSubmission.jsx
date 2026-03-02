import { X } from 'lucide-react'
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
    <div className='fixed inset-0 bg-black/70 backdrop-blur bg-opacity-50 z-100 flex items-center justify-center sm:p-4 '>
        <div className='bg-white sm:rounded-lg shadow-2xl w-full max-w-lg h-screen sm:h-[320px] flex flex-col'>
            {/* header */}
            <div>
                <div>
                    <h3>{listing?.title}</h3>
                    <p>Adding Credentials for {listing?.username} on {listing?.platform}</p>
                </div>
                <button>
                    <X className='w-5 h-5'/>
                </button>
            </div>

        </div>
       
    </div>
  )
}

export default CredentialSubmission