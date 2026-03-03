import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const ManageListing = () => {

  const {id} = useParams()
  const navigate = useNavigate()
  const {userListings, balance} = useSelector((state)=>state.listing)

  const [loadingListing, setLoadingListing] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const [formData, setFormData] = useState({

    title: '',
    platform: '',
    username: '',
    followers_count: '',
    engagement_rate: '',
    monthly_views: '',
    niche: '',
    price: '',
    description: '',
    verified: false,
    monetized: false,
    country: '',
    age_range: '',
    images: [],


  })

  const platforms = ['youtube', 'instagram', 'tiktok', 'facebook', 'twitter', 'linkedin', 'pinterest', 'snapchat', 'twitch', 'discord']

   const niches = ['lifestyle', 'fitness', 'food', 'travel', 'tech', 'gaming', 'fashion', 'beauty', 'buisness', 'education', 'entertainment', 'music', 'art', 'sports', 'health', 'finance', 'other'];

   const ageRanges = ['13-17 years', '18-24 years', '25-34 years', '35-44 years', '45-54 years', '55+ years', 'Mixed ages']

   const handleInputChange = (field, value)=>{
    setFormData((prev) => ({...prev, [field]: value}))

   }


  return (
    <div>
        <h1>ManageListing page</h1>
    </div>
  )
}

export default ManageListing