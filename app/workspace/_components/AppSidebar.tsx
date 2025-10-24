'use client'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { UserDetailContext } from "@/context/userDetailContext"
import { useAuth, UserButton } from "@clerk/nextjs"
import axios from "axios"
import Image from "next/image"
import Link from "next/link"
import { useContext, useEffect, useState } from "react"
  export function AppSidebar() {
    const [projectlist,setprojectlist]=useState([]);
    const {userDetail,setUserDetail}=useContext(UserDetailContext)
    const [loading,setloading]=useState(false)
    const {has}=useAuth();
  

    const hasUnlimitedAcess=has&&has({plan:'unlimited'})

    useEffect(()=>{
     getProjectList()
    },[])
  
     const getProjectList=async()=>{
      setloading(true)
      const res=await axios.get('/api/get-all-projects')
      console.log(res.data)
      setprojectlist(res.data)
      setloading(false)
     }

    return (
      <Sidebar>
        <SidebarHeader className="p-3">
            <div className="flex items-center gap-3 p-3">
                <Image src={'/logo.svg'} alt='logo' width={30} height={30} />
                <h2 className="font-bold text-md">Ai Website Generator</h2>
            </div>
            <Link href={'/workspace'} className="mt-2 w-full" >
            <Button className="w-full">
                + Add new project
            </Button>
            </Link>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            {!loading && projectlist.length==0 && 
            <h2 className="text-sm px-2 text-gray-500">No project found</h2>
            }
            <div>
              {(!loading && projectlist.length>0)? projectlist.map((project:any,index)=>(
                <Link href={`/playground/${project.projectId}?frameId=${project.frameId}`} key={index} className="my-2 hover:bg-secondary p-2 rounded-lg cursor-pointer">
                  <h2 className="line-clamp-1">{project?.chats?.[0]?.chatMessage?.[0]?.content}</h2>
                </Link>
              )):
              [1,2,3,4,5].map((_,index)=>(
                <Skeleton className="w-full h-10 rounded-lg mt-2"/>
              ))
            }
            </div>
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
            {!hasUnlimitedAcess&& <div className="p-3 border rounded-xl space-y-3 bg-secondary">
                <h2 className="flex justify-between items-center">
                    Remaning creadits<span className="font-bold">{userDetail?.creadits}</span>
                </h2>
                <Progress value={(userDetail?.creadits/2)*100}/>
                <Link href={'/workspace/pricing'} className="w-full">
                <Button className="w-full">upgarded to unlimited</Button>
                </Link>
            </div>
  }
            <div className="flex items-center gap-2 px-3">
                <UserButton/>
                <h1></h1>
                <Button variant={'ghost'}>settings</Button>
            </div>
        </SidebarFooter>
      </Sidebar>
    )
  }