import { PricingTable } from '@clerk/nextjs'
import React from 'react'

function page() {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen '>
      <h2 className='font-bold'>pricing</h2>
      <div className='flex w-[800px]'>
      <PricingTable/>
      </div>
    </div>
  )
}

export default page
