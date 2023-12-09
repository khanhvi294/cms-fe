import React from 'react'
import BoxOverview from '../../../components/BoxOverview/BoxOverview';

const Box = () => {
  return (
   <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-6 text-white'>
     <BoxOverview className={"bg-red-400"} />
     <BoxOverview className={"bg-red-400"} />
     <BoxOverview className={"bg-red-400"} />
     <BoxOverview className={"bg-red-400"} />
     <BoxOverview className={"bg-red-400"} />
   </div>
  )
}

export default Box;