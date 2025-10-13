'use client'
import { Button } from '@/components/ui/button'
import { SignIn, SignInButton } from '@clerk/nextjs'
import { ArrowUp, HomeIcon, icons, ImagePlus, Key, LayoutDashboard, User } from 'lucide-react'
import React, { useState } from 'react'

const suggestions = [
    {
    label: 'Dashboard',
    prompt: 'Create an analytics dashboard to track customers and revenue data for a SaaS',
    icon: LayoutDashboard
    },
    {
    label: 'SignUp Form',
    prompt: 'Create a modern sign up form with email/password fields, Google and Github login options, and terms checkbox',
    icon:Key
    },
    {
    label: 'Hero',
    prompt: 'Create a modern header and centered hero section for a productivity SaaS. Include a badge for feature announcement, a title with a subtle gradient effec,subtitle,CTA,small social proff and image',
    icon: HomeIcon
    },{
        label: 'User Profile Card',
        prompt: 'Create a modern user profile card component for a social media website',
        icon: User
    }
]

function Hero() {

    const [userInput,setUserInput]=useState<string>()
  return (
    <div className='flex items-center flex-col h-[80vh] justify-center'>
      <h2 className='font-bold text-5xl'>what should be Design?</h2>
      <p className='mt-2 text-xl text-gray-500'> Generate, Edit and Explore desig with AI, Export code as well</p>
      <div className='w-full max-w-2xl p-5 border mt-5 rounded-2xl'>
        <textarea placeholder='Describe you page design'
        className='w-full h-24 focus:outline-none focus:ring-0 resize-none'
        value={userInput}
        onChange={(event)=>{
            setUserInput(event.target.value)
        }}
        />
        <div className='flex justify-between items-center'>
            <Button variant={'ghost'} size={'icon'}><ImagePlus/></Button>
            <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
            <Button disabled={!userInput}><ArrowUp/></Button>
            </SignInButton>
        </div>
      </div>
      <div className='mt-4 flex gap-3'>
        {suggestions.map((suggestion,index)=>(
           <Button key={index} variant={'outline'} onClick={()=>{
            setUserInput(suggestion.prompt)
           }}>
           {suggestion.label}
           </Button> 
        ))}
      </div>
    </div>
  )
}

export default Hero
