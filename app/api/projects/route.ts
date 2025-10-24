import { db } from "@/config/db";
import { chatTable, frameTable, projectTable, usersTable } from "@/config/schema";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest) {
    const {projectId,frameId,message,creadits}=await req.json();
    const user=await currentUser();
    const {has}=await auth()
    const hasUnlimitedAcess=has&&has({plan:'unlimited'})

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
        createdBy:user?.primaryEmailAddress?.emailAddress,
        frameId:frameId
    })
      if(!hasUnlimitedAcess){
        const userResult=await db.update(usersTable).set({
            creadits:creadits-1
            //@ts-ignore
        }).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress))
      }
    return NextResponse.json({
        projectId,frameId, message  
    })

}