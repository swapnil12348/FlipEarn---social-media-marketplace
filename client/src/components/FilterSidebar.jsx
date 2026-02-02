import { Filter } from 'lucide-react'
import React from 'react'

const FilterSidebar = ({showFilterPhone, setShowFilterPhone, filters}) => {


  return (


    <div className={`${showFilterPhone ? "max-sm:fixed" : "max-sm:hidden"} max-sm:inset-0 z-100 max-sm:h-screen max-sm:overflow-scroll bg-white rounded-lg shadow-sm border border-gray-200 h-fit sticky top-24 md:min-w-[300px]`}>
        <div className='p-4 border-b border-gray-200'>
            <div className='flex items-center justify-between'>
                <div className='flex items-center space-x-2 text-gray-700 '>
                    <Filter className='size-4'/>
                    <h3 className='font-semibold'>Filters</h3>
                </div>
                <div className='flex items-center gap-2'>

                </div>
            </div>
        </div>
    </div>
  )
}

export default FilterSidebar