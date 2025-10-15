"use client"
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
import { UserDetailContext } from "@/context/userDetailContext"
import { UserButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { useContext, useState } from "react"
  
  export function AppSidebar() {
    const [projectlist,setprojectlist]=useState([]);
    const {userDetail,setUserDetail}=useContext(UserDetailContext)
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
            {projectlist.length==0 && 
            <h2 className="text-sm px-2 text-gray-500">No project found</h2>
            }
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter>
            <div className="p-3 border rounded-xl space-y-3 bg-secondary">
                <h2 className="flex justify-between items-center">
                    Remaning creadits<span className="font-bold">{userDetail?.creadits}</span>
                </h2>
                <Progress value={93}/>
                <Button className="w-full">upgarded to unlimited</Button>
            </div>
            <div className="flex items-center gap-2 px-3">
                <UserButton/>
                <h1></h1>
                <Button variant={'ghost'}>settings</Button>
            </div>
        </SidebarFooter>
      </Sidebar>
    )
  }