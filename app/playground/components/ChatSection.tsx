import React, { useState } from 'react'
import { Messages } from '../[projectId]/page'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'

type Props={
    messages:Messages[]
    onSend:any
}

function ChatSection({messages,onSend}:Props) {
    const [input ,setInput]=useState<string>()

    const handleSend=()=>{
        if(!input?.trim())return
        onSend(input)
        setInput('')
    }
    console.log(messages)
  return (
    <div className='w-96 shadow h-[91vh] p-4 flex flex-col'>
      <div className='flex-1 overflow-y-auto p-4 space-y-2 flex flex-col'>
          {messages?.length==0?
          (
            <p className='text-gray-400 text-center'>no messages yet</p>
          ):(
            messages.map((msg,idx)=>(
                <div key={idx} className={`flex ${msg.role=='user'?'justify-end':'justify-start'}`}>
                  <div className={`p-2 rounded-lg max-w-[80%] ${msg.role=='user'?'bg-gray-100 text-black':'bg-gray-300 text-black'}`}>
                    {msg.Content }
                  </div>
                </div>
            ))
          )}
      </div>
      <div className='p-3 border-t flex items-center gap-2 '>
        <textarea value={input} className='flex-1 resize-none px-3 py-3 border rounded-lg focus:outline-none focus:ring-2' placeholder='decribe your website design'
        onChange={(event)=>setInput(event.target.value)}
        />
        <Button><ArrowUp/></Button>
      </div>
    </div>
  )
}

export default ChatSection
