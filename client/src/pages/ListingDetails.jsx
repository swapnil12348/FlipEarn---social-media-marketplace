import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getProfileLink } from '../assets/assets';
import { useSelector } from 'react-redux';
import { Loader2Icon } from 'lucide-react';

const ListingDetails = () => {

  const navigate = useNavigate()
  const currency = import.meta.env.VITE_CURRENCY || '$';

  const [listing, setListing] = useState(null)
  const profileLink = listing && getProfileLink(listing.platform, listing.username)

  const {listingId} = useParams()
  const {listings} = useSelector((state)=>state.listing)

  useEffect(()=>{

    const listing = listings.find((listing)=>listing.id === listingId);
    if (listing) {
      setListing(listing)
    }

  }, [listingId, listings])




  return listing ?  (
    <div className='mx-auto min-h-screen px-6 md:px-16 lg:px-24 xl:px-32'>
        
    </div>
  ) : (
    <div className='h-screen flex justify-center items-center'>

      <Loader2Icon className='size-7 animate-spin text-indigo-600'/>

    </div>
  )
}

export default ListingDetails