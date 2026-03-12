import { Loader2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const ManageListing = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const { userListings, balance } = useSelector((state) => state.listing)

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    if (!files.length) return;
    if (files.length + formData.images.length > 5) return toast.error("You can add up to 5 images")

    setFormData((prev) => ({ ...prev, images: [...prev.images, ...files] }))
  }

  const removeImage = (indexToRemove) => {
    setFormData((prev) => ({
      ...preview, images: prev.images.filter((_, i) => i !== indexToRemove)
    }))
  }

  // get lisitng data for edit if 'id' is provided (edit node)
  useEffect(() => {
    if (!id) return;

    setIsEditing(true)
    setLoadingListing(true)
    const listing = userListings.find((listing) => listing.id === id)
    if (listing) {
      setFormData(listing)
      setLoadingListing(false)
    } else {
      toast.error("Listing not found")
      navigate("/my-listings")
    }
  }, [id])

  const handleSubmit = async (e) => {
    e.preventDefault();


  };

  if (loadingListing) {
    return (
      <div className='h-screen flex items-center justify-center'>
        <Loader2Icon className='size-7 animate-spin text-indigo-600' />

      </div>
    )

  }


  return (
    <div className='min-h-screen py-8'>
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold text-gray-800'>
            {isEditing ? "Edit Listing" : "List Your Account"}
          </h1>
          <p className='text-gray-600 mt-2'>
            {isEditing ? 'Update your existing account listing' : 'Create a mock listing to display your account info'}
          </p>
        </div>
        <form onSubmit={handleSubmit} className='space-y-8'>
          {/* basic info */}
          <Section title='Basic Information'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <InputField label='Listing Title *' value={formData.title} placeholder='e.g., Premium Travel Instagram Account' onChange={(v) => handleInputChange('title', v)} required={true}/>
              <SelectField label='Platform *' options={platforms} value={formData.platform} onChange={(v) => handleInputChange('platform', v)} required={true}/>
              <InputField label='Listing Username/handle' value={formData.username} placeholder='@username' onChange={(v) => handleInputChange('username', v)} required={true}/>
              <SelectField label='Platform *' options={platforms} value={formData.platform} onChange={(v) => handleInputChange('platform', v)} required={true}/>


            </div>

          </Section>

          
        </form>
      </div>
    </div>
  )
}

/* --- Common Elements ---*/

const Section = ({title, children})=>(
  <div className='bg-white rounded-lg border border-gray-200 p-6 space-y-6'>
    <h2 className='text-lg font-semibold text-gray-800'>
      {title}
    </h2>
    {children}
  </div>
)

const InputField = ({label, value, onChange, placeholder, type = 'text', required = false, min=null, max=null})=>(
  <div>
    <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
    <input type={type} min={min} max={max} placeholder={placeholder} value={value} onChange={(e)=>onChange(e.target.value)} className='w-full px-3 py-1.5 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300' required={required} />
  </div>
)

const SelectField = ({label, options, value, onChange, required = false}) =>(
  <div>
    <label className='block text-sm font-medium text-gray-700 mb-2'>{label}</label>
    <select value={value} onChange={(e)=>onChange(e.target.value)} className='w-full px-3 py-1.5 text-gray-600 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 border-gray-300' required={required}>
      <option value=''>Select...</option>
      {options.map((opt)=>(
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>

  </div>
)

export default ManageListing