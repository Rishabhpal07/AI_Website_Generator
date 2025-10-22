import React from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from 'sonner';


function ViewCodeBlock({children,code}:any) {
    const handleCopy=async()=>{
        await navigator.clipboard.writeText(code)
        toast.success("code copied!")
    }
  return (
    <div>
      <Dialog>
  <DialogTrigger>{children}</DialogTrigger>
  <DialogContent className="min-w-7xl max-h-[600px] overflow-auto">
    <DialogHeader>
      <DialogTitle><div className='flex gap-2 items-center'>source code<Button onClick={handleCopy} variant={'outline'}><Copy/></Button></div></DialogTitle>
      <DialogDescription>
        <div>
        <SyntaxHighlighter>
        {code}
        </SyntaxHighlighter>
        </div>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
    </div>
  )
}

export default ViewCodeBlock
