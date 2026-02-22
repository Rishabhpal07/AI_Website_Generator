import { ModeToggle } from '@/app/_components/themeButton'
import { Button } from '@/components/ui/button'
import { OnSaveContext } from '@/context/OnSaveContext'
import Image from 'next/image'
import React, { useContext } from 'react'

function Playgroundheadre() {
  const {OnSaveData,setOnSaveData}=useContext(OnSaveContext)
  return (
    <div className='flex items-center justify-between p-4 shadow'>
      <Image src={'/logo1.png'} alt='logo' width={30} height={30}/>
      <div className='flex gap-7'>
      <ModeToggle/>
      <Button onClick={()=>setOnSaveData(Date.now())}>save</Button>
      </div>
    </div>
  )
}

export default Playgroundheadre
