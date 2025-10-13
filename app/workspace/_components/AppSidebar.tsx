"use client"
import { Button } from "@/components/ui/button"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
  
  export function AppSidebar() {
    const [projectlist,setprojectlist]=useState([]);
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
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            {projectlist.length==0 && 
            <h2>No project found</h2>
            }
          </SidebarGroup>
          <SidebarGroup />
        </SidebarContent>
        <SidebarFooter />
      </Sidebar>
    )
  }