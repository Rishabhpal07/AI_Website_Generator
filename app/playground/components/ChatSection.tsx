import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowUp } from 'lucide-react'
import { Messages } from '../[projectId]/page'

type Props={
    messages:Messages[]
    onSend:any,
    loading:boolean
}

function ChatSection({messages,onSend,loading}:Props) {
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
                    {msg.content }
                  </div>
                </div>
            ))
          )}
         {loading&& <div className='flex justify-center items-center p-4'>
            <div className='animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-zinc-200'>
            </div>
            <span className='ml-2 text-zinc-800'>thinking...</span>
          </div>
}
      </div>
      <div className='p-3 border-t flex items-center gap-2 '>
        <textarea value={input} className='flex-1 resize-none px-3 py-3 border rounded-lg focus:outline-none focus:ring-2' placeholder='decribe your website design'
        onChange={(event)=>setInput(event.target.value)}
        />
        <Button onClick={handleSend}><ArrowUp/></Button>
      </div>
    </div>
  )
}

export default ChatSection
