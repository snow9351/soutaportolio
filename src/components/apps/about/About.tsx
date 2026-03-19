'use client'

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image"
import { useEffect, useState } from "react"

const TypewriterText = ({ text, delay = 50, className = "" }: { text: string; delay?: number; className?: string }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, delay)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, delay])

  // Split text by \n and render each line separately
  const lines = displayText.split('. ')

  return (
    <span className={className}>
      {lines.map((line, index) => (
        <span key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </span>
      ))}
      <span className="animate-pulse">|</span>
    </span>
  )
}

const About = () => {
  const [animationPhase, setAnimationPhase] = useState(0)

  useEffect(() => {
    const phases = [
      { delay: 0, duration: 1000 },      // Avatar move
      { delay: 1000, duration: 2000 },   // Name typing
      { delay: 3000, duration: 2000 },   // Title typing
      { delay: 5000, duration: 1500 },   // Contact icons
      { delay: 6500, duration: 3000 },   // Summary typing
    ]

    phases.forEach((phase, index) => {
      setTimeout(() => {
        setAnimationPhase(index + 1)
      }, phase.delay)
    })
  }, [])

  const contactIcons = [
    {
      icon: "/images/contact/mail.svg",
      alt: "Email",
      url: "m.valladares.aidev@gmail.com",
      onClick: () => {
        const email = "m.valladares.aidev@gmail.com"
        const subject = "Hello, Souta!"
        const body = "I enjoy building products from idea to production and working closely with founders to solve real problems. I'm particularly interested in long-term, impactful projects."
        const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
        window.open(mailtoUrl, "_blank")
      }
    },
    {
      icon: "/images/contact/calendar.svg",
      alt: "Calendar",
      url: "https://calendar.app.google/mMC7HKxSwJtHXDtx6",
      onClick: () => window.open("https://calendar.app.google/mMC7HKxSwJtHXDtx6", "_blank")
    },
    {
      icon: "/images/contact/whatsapp.svg",
      alt: "WhatsApp",
      url: "+817044678860",
      onClick: () => {
        const phone = "+13435127592"
        const message = "Hello, Souta!"
        const whatsappUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        window.open(whatsappUrl, "_blank")
      }
    },
    {
      icon: "/images/contact/discord.svg",
      alt: "Discord",
      url: "@ti851214",
      onClick: () => window.open("https://discord.com/users/snow9351", "_blank")
    },
    {
      icon: "/images/contact/telegram.svg",
      alt: "Telegram",
      url: "@snow_9351",
      onClick: () => window.open("https://t.me/snow9351", "_blank")
    },
    {
      icon: "/images/contact/linkedin.svg",
      alt: "LinkedIn",
      url: "https://www.linkedin.com/in/souta-hoshino-51144a3b8/",
      onClick: () => window.open("https://www.linkedin.com/in/souta-hoshino-51144a3b8/", "_blank")
    },
    {
      icon: "/images/contact/github.svg",
      alt: "GitHub",
      url: "https://github.com/snow9351",
      onClick: () => window.open("https://github.com/snow9351", "_blank")
    }
  ]

  const contactDetails = [
    {
      label: "Portfolio",
      value: "soutamizuno.vercel.app",
      href: "https://soutamizuno.vercel.app"
    },
    {
      label: "Email",
      value: "m.valladares.aidev@gmail.com",
      href: "mailto:m.valladares.aidev@gmail.com"
    },
    {
      label: "WhatsApp",
      value: "+817044678860",
      href: "https://wa.me/+817044678860"
    },
    {
      label: "Calendar",
      value: "Book a call",
      href: "https://calendar.app.google/mMC7HKxSwJtHXDtx6"
    },
    {
      label: "LinkedIn",
      value: "souta-hoshino-51144a3b8",
      href: "https://www.linkedin.com/in/souta-hoshino-51144a3b8"
    },
    {
      label: "Telegram",
      value: "@snow9351",
      href: "https://t.me/snow_9351"
    },
    {
      label: "Discord",
      value: "@snow_9351",
      href: "https://discord.com/users/snow_9351"
    }
  ]

  return (
    <div className="flex-1 flex justify-center text-white p-6">
      <div className="w-full max-w-6xl">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
          {/* Avatar Section */}
          <div className={`transition-all duration-1000 ease-out ${animationPhase >= 1
            ? "translate-x-0"
            : "translate-x-[100px]"
            }`}>
            <div className="relative group">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden ring-4 ring-purple-500/30 shadow-2xl transition-all duration-500 group-hover:ring-purple-400/60 group-hover:shadow-purple-500/25">
                <Image
                  src="/images/logos/souta.png"
                  alt="Souta Hoshino"
                  width={160}
                  height={160}
                  className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="flex-1 text-center md:text-left">
            {/* Name and Title */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-5xl font-bold mb-4">
                {animationPhase >= 2 ? (
                  <TypewriterText
                    text="Souta Hoshino"
                    delay={100}
                    className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 bg-clip-text text-transparent"
                  />
                ) : (
                  <span className="text-transparent">Souta Hoshino</span>
                )}
              </h1>

              <div className="text-lg md:text-2xl text-gray-300">
                {animationPhase >= 3 ? (
                  <TypewriterText
                    text="Mobile AI Full-Stack Developer"
                    delay={80}
                    className="text-white font-semibold"
                  />
                ) : (
                  <span className="text-transparent">AI Full Stack Mobile Engineer</span>
                )}
              </div>
            </div>

            {/* Contact Icons */}
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-8">
              {contactIcons.map((social, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${animationPhase >= 4
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-4 scale-75"
                    }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={social.onClick}
                        className="group relative p-3 rounded-full cursor-pointer bg-slate-800/50 hover:bg-slate-700/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
                      >
                        <Image
                          src={social.icon}
                          alt={social.alt}
                          width={24}
                          height={24}
                          className="transition-transform duration-300 group-hover:scale-110"
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>{social.url}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="max-w-4xl">
              {animationPhase >= 5 ? (
                <div className="text-gray-300 leading-relaxed">
                  <TypewriterText
                    text="I’m Souta Hoshino, an AI Full-Stack Engineer specializing in Mobile App and trading system development. Over the past 9+ years, I’ve built scalable backend architectures with Node.js, AWS, and Firebase, while delivering high-performance iOS and Android apps using Swift, Kotlin, and Flutter.I also design automated trading platforms that integrate live market data, AI-driven analytics, and automation APIs, enabling smarter and faster decision-making. My passion lies in combining AI, mobile innovation, and intelligent system design to create applications that are fast, reliable, and insight-driven."
                    delay={30}
                    className="text-base md:text-lg"
                  />
                </div>
              ) : (
                <div className="text-transparent text-base md:text-lg">
                  Hi, I’m Souta Hoshino — a mobile and AI full-stack engineer with 9+ years of experience building scalable products.

  I started by developing backend systems and infrastructure using Node.js, AWS, and Firebase, and later moved into mobile development, where I build high-performance iOS and Android apps using Swift, Kotlin, and Flutter.

  I’ve also built automated trading systems that process real-time market data and execute decisions using custom logic and AI-driven analytics.

  I enjoy working on products end-to-end — from system design to deployment — and I’m particularly interested in building scalable, data-driven applications with strong real-world impact.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About







