import React from 'react'
import Image from 'next/image'
import path from 'path'
import { Button } from '@/components/ui/button'
import { ArrowBigLeft, ArrowRight, Ghost } from 'lucide-react'
import { SignInButton } from '@clerk/nextjs'
import Link from 'next/link'

const MenuOption=[
  {
    name:'Pricing',
    path:'/pricing'
  },
  {
    name:'Contacts-us',
    path:'/contacts'
  }
]

function Header() {
  return (
    <div className='flex justify-between p-3 shadow'>
      <div className='flex items-center gap-4 '>
      <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
      <h2 className='font-bold text-2xl'>AI website generator</h2>
      </div>
      <div>
        {MenuOption.map((item,index)=>(
         <Button variant={'ghost'} key={index}>{item.name}</Button>
        ))}
      </div>
      <div>
        <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
        <Link href='/workspace'>
        <Button>Get started <ArrowRight/></Button>
        </Link>
        </SignInButton>
      </div>
    </div>
  )
}

export default Header
