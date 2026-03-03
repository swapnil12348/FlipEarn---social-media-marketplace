import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const ManageListing = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const {userListings, balance} = useSelector((state)=>state.listing)

  const [loadingListing, setLoadingListing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  

  return (
    <div>
        <h1>ManageListing page</h1>
    </div>
  )
}

export default ManageListing