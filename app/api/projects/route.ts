import { db } from "@/config/db";
import { chatTable, frameTable, projectTable } from "@/config/schema";
import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {projectId,frameId,message}=await req.json();
    const user=await currentUser();
    const projecResult=await db.insert(projectTable).values({
        projectId:projectId,
        createdBy:user?.primaryEmailAddress?.emailAddress
    })

    const frameresult=await db.insert(frameTable).values({
        frameId:frameId,
        projectId:projectId
    })

    const chatResult=await db.insert(chatTable).values({
        chatMessage:message,
        createdBy:user?.primaryEmailAddress?.emailAddress
    })
    return NextResponse.json({
        projectId,frameId, message  
    })

}