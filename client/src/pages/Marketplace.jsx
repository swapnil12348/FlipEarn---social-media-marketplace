import { ArrowLeftIcon, FilterIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Marketplace = () => {

    const navigate = useNavigate()
    const [showFilterPhone, setShowFilterPhone]=useState(false)



  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32'>
        <div className='flex items-center justify-between text-slate-500'>
            <button onClick={()=>{navigate('/'); scrollTo(0,0)}} className='flex items-center gap-2 py-5'>
                <ArrowLeftIcon className='size-4'/>
                Back to Home

            </button>
            <button onClick={()=>{}}>
                <FilterIcon className='size-4'/>
                Filters

            </button>

        </div>
        <div>

        </div>
    </div>
  )
}

export default Marketplace