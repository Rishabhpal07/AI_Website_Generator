'use client'
import { Button } from '@/components/ui/button'
import { SignIn, SignInButton, useUser,  } from '@clerk/nextjs'
import axios from 'axios'
import { ArrowUp, HomeIcon, icons, ImagePlus, Key, LayoutDashboard, Loader2Icon, User } from 'lucide-react'
import { Content } from 'next/font/google'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { v4 as uuidv4 } from 'uuid';

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
const GenerateRandomFrameNumber=()=>{
  const number=Math.floor(Math.random()*10000)
  return number
}


function Hero() {

    const [userInput,setUserInput]=useState<string>()
    const {user}=useUser();
    const Router=useRouter()
    const [loading,setloading]=useState(false)

    const createNewProject=async()=>{
      setloading(true)
      const projectId=uuidv4()
      const frameId=GenerateRandomFrameNumber()
      const message=[
        {
          role:'user',
          Content:userInput
        }
      ]
      try {
        const result=await axios.post('/api/projects',{
           projectId:projectId,
           frameId:frameId,
           message:message
        })
        console.log(result.data)
        toast.success('project created')
        Router.push(`/playground/${projectId}?frameId=${frameId}`)
        setloading(false)
      } catch (error) {
        toast.error('internal server error')
        console.log(error)
        setloading(false)

      }
    }

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
            {!user ? <SignInButton mode='modal' forceRedirectUrl={'/workspace'}>
            <Button disabled={!userInput}><ArrowUp/></Button>
            </SignInButton>:
            <Button disabled={!userInput || loading} onClick={createNewProject}>
              {loading?<Loader2Icon className='animate-spin'/>:<ArrowUp/>}</Button>
}
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
