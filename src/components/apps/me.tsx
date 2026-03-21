'use client'

import { useEffect, useState } from "react"
import { 
  Sidebar, 
  SidebarContent, 
  SidebarGroup, 
  SidebarGroupContent, 
  SidebarGroupLabel, 
  SidebarMenu, 
  SidebarMenuButton, 
  SidebarMenuItem, 
  SidebarProvider, 
  SidebarTrigger 
} from "../ui/sidebar"
import { about } from "@/config/aboutme"
import Image from "next/image"
import About from "./about/About"
import Education from "./about/Education"
import History from "./about/History"
import Projects from "./about/Project"
import Skill from "./about/Skill"
import Resume from "./about/Resume"

const AboutMe = () => {
  const [screens, setScreens] = useState<Record<string, React.ReactElement>>({})
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeScreen, setActiveScreen] = useState("overview")
  const [currentScreen, setCurrentScreen] = useState<React.ReactElement | null>(null)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [navbar, setNavbar] = useState<boolean>(false)

  useEffect(() => {
    const map: Record<string, React.ReactElement> = {
      overview: <About />,
      education: <Education />,
      history: <History />,
      projects: <Projects />,
      skills: <Skill />,
      resume: <Resume />,
    }
    setScreens(map)

    const lastVisitedScreen = localStorage.getItem("about-section") ?? "overview"
    setActiveScreen(lastVisitedScreen)
    setCurrentScreen(map[lastVisitedScreen] ?? map.overview)
  }, [])

  const changeScreen = (screenId: string) => {
    const nextScreenId = screenId || "overview"
    localStorage.setItem("about-section", nextScreenId)
    setActiveScreen(nextScreenId)
    setCurrentScreen(screens[nextScreenId] ?? screens["overview"])
  }

  return (
    <SidebarProvider
      className="flex h-full min-h-0 w-full min-w-0 flex-row bg-ub-cool-grey text-white select-none relative"
      style={{ "--sidebar-width": "15.5rem" } as React.CSSProperties}
    >
      {/* collapsible="none" keeps the nav inside the window (no viewport-fixed sidebar) */}
      <Sidebar
        className="h-full min-h-0 shrink-0 border-r border-black bg-ub-cool-grey text-base windowMainScreen overflow-y-auto"
        collapsible="none"
      >
        <SidebarContent className="bg-ub-cool-grey">
          <SidebarGroup className="text-white">
            <SidebarGroupLabel className="!h-auto py-2 text-gray-300 !text-base font-semibold tracking-tight">
              Souta Hoshino
            </SidebarGroupLabel>
            <SidebarGroupContent className="text-base">
              <SidebarMenu className="gap-4">
                {about.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <SidebarMenuButton
                      size="lg"
                      className="!h-auto min-h-11 py-2.5 !text-base gap-4 [&_img]:size-6 [&_img]:min-h-6 [&_img]:min-w-6 [&_img]:shrink-0"
                      onClick={() => changeScreen(item.id)}
                    >
                      <Image
                        src={item.icon}
                        alt={item.title}
                        width={24}
                        height={24}
                        className="size-6 object-contain"
                      />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <div className="min-h-0 min-w-0 flex-1 overflow-y-auto custom-scrollbar">
        {currentScreen}
      </div>
      
      <style jsx global>{`
        /* Elegant Custom Scrollbar */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #4B5563 #1F2937;
        }
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
          border-radius: 3px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #6B7280, #4B5563);
          border-radius: 3px;
          border: 1px solid #374151;
          transition: all 0.3s ease;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #9CA3AF, #6B7280);
          border-color: #4B5563;
          transform: scaleX(1.1);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:active {
          background: linear-gradient(180deg, #3B82F6, #1D4ED8);
        }
        
        .custom-scrollbar::-webkit-scrollbar-corner {
          background: transparent;
        }
        
        /* Smooth scrolling */
        .custom-scrollbar {
          scroll-behavior: smooth;
        }
      `}</style>
    </SidebarProvider >
  )
}

export default AboutMe