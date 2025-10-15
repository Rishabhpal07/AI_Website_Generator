import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

function Playgroundheadre() {
  return (
    <div className='flex items-center justify-between p-4 shadow'>
      <Image src={'/logo.svg'} alt='logo' width={30} height={30}/>
      <Button>save</Button>
    </div>
  )
}

export default Playgroundheadre
