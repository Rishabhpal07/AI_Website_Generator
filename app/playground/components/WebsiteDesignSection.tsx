'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import WebPageTools from './WebPageTools';
import ElementSettingSection from './ElementSettingSection';
import ImageSettingSection from './ImageSettingSection';
import { OnSaveContext } from '@/context/OnSaveContext';
import axios from 'axios';
import { toast } from 'sonner';
import { useParams, useSearchParams } from 'next/navigation';

type Props={
    generatedCode:string
    codeReady?:boolean
}

const HTML_CODE=` <!DOCTYPE html>
            <html lang="en">
            <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <meta name="description" content="AI Website Builder - Modern TailwindCSS + Flowbite Template">
                    <title>AI Website Builder</title>

                    <!-- Tailwind CSS -->
                    <script src="https://cdn.tailwindcss.com"></script>

                    <!-- Flowbite CSS & JS -->
                    <link href="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.css" rel="stylesheet">
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/flowbite/2.3.0/flowbite.min.js"></script>

                    <!-- Font Awesome / Lucide -->
                    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.js"></script>

                    <!-- Chart.js -->
                    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>

                    <!-- Tippy.js -->
                    <link rel="stylesheet" href="https://unpkg.com/tippy.js@6/dist/tippy.css" />
                    <script src="https://unpkg.com/@popperjs/core@2"></script>
                    <script src="https://unpkg.com/tippy.js@6"></script>
            </head>
            <body id="root">
            {code}
            </body>
            </html>`

function WebsiteDesignSection({ generatedCode, codeReady }: Props) {
        const iframeRef = useRef<HTMLIFrameElement>(null);
        const [selectedScreenSize,setSelectedScreenSize]=useState('web')
         const [selectedElement,setSelectedElement]=useState<HTMLElement|null>()
         const {OnSaveData,setOnSaveData}=useContext(OnSaveContext)
         const {projectId}=useParams()
         const params=useSearchParams()
         const frameId=params.get('frameId')
        // Initialize iframe shell once

        const hoverRef = useRef<HTMLElement | null>(null)
        const selectedRef = useRef<HTMLElement | null>(null)
        const handlersCleanupRef = useRef<() => void | null>(null)

useEffect(() => {
        if (!iframeRef.current) return;
        const doc = iframeRef.current.contentDocument;
        if (!doc) return;

        doc.open();
        doc.write(HTML_CODE);
        doc.close();

        // Attach handlers and keep a cleanup reference
        const attachHandlers = () => {
            // cleanup previous if any
            if (handlersCleanupRef.current) {
                handlersCleanupRef.current()
            }

            hoverRef.current = null
            selectedRef.current = null

            const handleMouseOver = (e: MouseEvent) => {
                if (selectedRef.current) return;
                const target = e.target as HTMLElement;
                if (hoverRef.current && hoverRef.current !== target) {
                    try { hoverRef.current.style.outline = "" } catch {};
                }
                hoverRef.current = target;
                try { hoverRef.current.style.outline = "2px dotted blue" } catch {};
            };

            const handleMouseOut = (_e: MouseEvent) => {
                if (selectedRef.current) return;
                if (hoverRef.current) {
                    try { hoverRef.current.style.outline = "" } catch {};
                    hoverRef.current = null;
                }
            };

            const handleClick = (e: MouseEvent) => {
                e.preventDefault();
                e.stopPropagation();
                const target = e.target as HTMLElement;

                if (selectedRef.current && selectedRef.current !== target) {
                    try { selectedRef.current.style.outline = "" } catch {};
                    try { selectedRef.current.removeAttribute("contenteditable") } catch {};
                }

                selectedRef.current = target;
                try { selectedRef.current.style.outline = "2px solid red" } catch {};
                try { selectedRef.current.setAttribute("contenteditable", "true") } catch {};
                try { selectedRef.current.focus() } catch {};
                setSelectedElement(selectedRef.current)
            };

            const handleKeyDown = (e: KeyboardEvent) => {
                if (e.key === "Escape" && selectedRef.current) {
                    try { selectedRef.current.style.outline = "" } catch {};
                    try { selectedRef.current.removeAttribute("contenteditable") } catch {};
                    selectedRef.current = null;
                }
            };

            doc.body?.addEventListener("mouseover", handleMouseOver);
            doc.body?.addEventListener("mouseout", handleMouseOut);
            doc.body?.addEventListener("click", handleClick);
            doc?.addEventListener("keydown", handleKeyDown);

            handlersCleanupRef.current = () => {
                try { doc.body?.removeEventListener("mouseover", handleMouseOver) } catch {}
                try { doc.body?.removeEventListener("mouseout", handleMouseOut) } catch {}
                try { doc.body?.removeEventListener("click", handleClick) } catch {}
                try { doc?.removeEventListener("keydown", handleKeyDown) } catch {}
            }
        }

        attachHandlers()

        return () => {
            if (handlersCleanupRef.current) handlersCleanupRef.current()
        }
}, []);


        // Update body only when code changes
        useEffect(() => {
                if (!iframeRef.current) return;
                const doc = iframeRef.current.contentDocument;
                if (!doc) return;

                const root = doc.getElementById("root");
                if (root) {
                        const cleaned = generatedCode
                                ?.replaceAll("```html", "")
                                .replaceAll("```", "")
                                .trim() ?? "";

                        // If the saved/generated code is a full HTML document, extract the body content
                        const bodyMatch = cleaned.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
                        const inner = bodyMatch ? bodyMatch[1] : (cleaned.match(/<html[\s\S]*?<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? cleaned);

                        root.innerHTML = inner;

                        // Re-attach handlers so newly injected elements are interactive
                        if (handlersCleanupRef.current) handlersCleanupRef.current();
                        // Small delay to ensure DOM is parsed then attach same handlers
                        setTimeout(() => {
                            if (!iframeRef.current) return;
                            const newDoc = iframeRef.current.contentDocument;
                            if (!newDoc) return;

                            const handleMouseOver = (e: MouseEvent) => {
                                if (selectedRef.current) return;
                                const target = e.target as HTMLElement;
                                if (hoverRef.current && hoverRef.current !== target) {
                                    try { hoverRef.current.style.outline = "" } catch {};
                                }
                                hoverRef.current = target;
                                try { hoverRef.current.style.outline = "2px dotted blue" } catch {};
                            };

                            const handleMouseOut = (_e: MouseEvent) => {
                                if (selectedRef.current) return;
                                if (hoverRef.current) {
                                    try { hoverRef.current.style.outline = "" } catch {};
                                    hoverRef.current = null;
                                }
                            };

                            const handleClick = (e: MouseEvent) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const target = e.target as HTMLElement;

                                if (selectedRef.current && selectedRef.current !== target) {
                                    try { selectedRef.current.style.outline = "" } catch {};
                                    try { selectedRef.current.removeAttribute("contenteditable") } catch {};
                                }

                                selectedRef.current = target;
                                try { selectedRef.current.style.outline = "2px solid red" } catch {};
                                try { selectedRef.current.setAttribute("contenteditable", "true") } catch {};
                                try { selectedRef.current.focus() } catch {};
                                setSelectedElement(selectedRef.current)
                            };

                            const handleKeyDown = (e: KeyboardEvent) => {
                                if (e.key === "Escape" && selectedRef.current) {
                                    try { selectedRef.current.style.outline = "" } catch {};
                                    try { selectedRef.current.removeAttribute("contenteditable") } catch {};
                                    selectedRef.current = null;
                                }
                            };

                            newDoc.body?.addEventListener("mouseover", handleMouseOver);
                            newDoc.body?.addEventListener("mouseout", handleMouseOut);
                            newDoc.body?.addEventListener("click", handleClick);
                            newDoc?.addEventListener("keydown", handleKeyDown);

                            handlersCleanupRef.current = () => {
                                try { newDoc.body?.removeEventListener("mouseover", handleMouseOver) } catch {}
                                try { newDoc.body?.removeEventListener("mouseout", handleMouseOut) } catch {}
                                try { newDoc.body?.removeEventListener("click", handleClick) } catch {}
                                try { newDoc?.removeEventListener("keydown", handleKeyDown) } catch {}
                            }
                        }, 50);
                }
        }, [generatedCode]);

        useEffect(()=>{
            OnSaveData && onSaveCode()
        },[OnSaveData])

        const onSaveCode=async()=>{
         if(iframeRef.current){
                try {
                        const iframeDoc=iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document
                        if(iframeDoc){
                                const cloneDoc=iframeDoc.documentElement.cloneNode(true) as HTMLElement 
                                const AllEls=cloneDoc.querySelectorAll<HTMLElement>('*')
                                AllEls.forEach((el)=>{
                                        el.style.outline=''
                                        el.style.cursor=''
                                })
                                const html=cloneDoc.outerHTML
                                console.log("HTML to save",html)
                                const result=await axios.put('/api/frames',{
                                        designCode:html,
                                        frameId:frameId,
                                        projectId:projectId
                                    })
                                    console.log(result)
                                    toast.success('saved')
                        }
                } catch (error) {
                        console.log(error)
                }
         }
        }

        return (
                <div className='flex gap-2 w-full'>
            <div className='p-5 w-full flex items-center flex-col'>
                    <div className='relative w-full'>
                        {codeReady ? (
                            <div className='absolute top-2 left-2 z-50 bg-green-600 text-white text-sm px-3 py-1 rounded-lg shadow'>
                                Code ready
                            </div>
                        ) : null}
                     <iframe
                        ref={iframeRef}
                        className={`${selectedScreenSize=='web'?'w-full':'w-120'} h-[700px] border rounded-xl`}
                        sandbox="allow-scripts allow-same-origin"
                />
                    </div>
                <WebPageTools selectedScreenSize={selectedScreenSize}
                setSelectedScreenSize={(v:string)=>setSelectedScreenSize(v)}
                generatedCode={generatedCode}
                />
            </div>
{/*     
            <ElementSettingSection selectedEl={selectedElement} clearSelection={()=>setSelectedElement(null)}/> */}
     
            {selectedElement?.tagName=='IMG'?
             //@ts-ignore
            <ImageSettingSection selectedEl={selectedElement}/>:selectedElement?<ElementSettingSection selectedEl={selectedElement} clearSelection={()=>setSelectedElement(null)}/>:null}
            </div>
        );
}


export default WebsiteDesignSection
