'use client'
import React, { useEffect, useState } from 'react'
import Playgroundheadre from '../components/Playgroundheadre'
import ChatSection from '../components/ChatSection'
import WebsiteDesignSection from '../components/WebsiteDesignSection'
import ElementSettingSection from '../components/ElementSettingSection'
import { useParams, useSearchParams } from 'next/navigation'
import axios from 'axios'

export type Frame={
    projectId:string,
    frameId:string,
    designCode:string,
    chatMessages:Messages[]
}
export type Messages={
    role:string,
    Content:string
}

function PlayGround() {
    const {projectId}=useParams()
    const params=useSearchParams()
    const frameId=params.get('frameId')
    const [framedetail,setframeDetail]=useState<Frame>()

    useEffect(()=>{
       frameId && getFrameDetails()
    },[frameId])

const getFrameDetails = async () => {
    try {
      const result = await axios.get(`/api/frames?frameId=${frameId}&projectId=${projectId}`);
      console.log("API Response Data:", result.data); 
      setframeDetail(result.data)
    } catch (error) {
      console.error("Error fetching frame details:", error);
    }
  };
  const SendMessage=(userInput:string)=>{

  }
  return (
    <div>
      <Playgroundheadre/>
      <div className='flex '>
      <ChatSection messages={framedetail?.chatMessages??[]}
      onSend={(input: string)=>SendMessage(input)}/>
      <WebsiteDesignSection/>
      {/* <ElementSettingSection/> */}
      </div>
    </div>
  )
}

export default PlayGround
