import { Button } from '@/components/ui/button'
import { OnSaveContext } from '@/context/OnSaveContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function Playgroundheadre() {
  const {OnSaveData,setOnSaveData}=useContext(OnSaveContext)
  return (
    <div className='flex items-center justify-between p-4 shadow'>
      <Image src={'/logo.svg'} alt='logo' width={30} height={30}/>
      <Button onClick={()=>setOnSaveData(Date.now())}>save</Button>
    </div>
  )
}

export default Playgroundheadre
