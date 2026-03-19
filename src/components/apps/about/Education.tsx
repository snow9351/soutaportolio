/* eslint-disable @next/next/no-img-element */
import { useEffect, useState } from "react"
import nanzan from "@/config/location"
import { certificates } from "@/config/certificates"
import Image from "next/image"

const Education = () => {
  const [isMapOpen, setIsMapOpen] = useState(false)

  const [lon, lat] = nanzan.features[0].geometry.coordinates as [number, number]
  const delta = 0.01
  const bbox = `${lon - delta}%2C${lat - delta}%2C${lon + delta}%2C${lat + delta}`
  const marker = `${lat}%2C${lon}`
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${marker}`
  const mapLink = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=15/${lat}/${lon}`

  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") setIsMapOpen(false)
    }
    if (isMapOpen) {
      window.addEventListener("keydown", onKeyDown)
    }
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [isMapOpen])

  return (
    <div className="flex-1 flex flex-col items-center text-white p-6 ">
      <div className="w-full max-w-4xl">
        <div className="font-medium relative text-2xl mt-2 md:mt-4 mb-4 py-3">
          Education
          <div className="absolute pt-px bg-white mt-px top-full w-full">
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
          </div>
        </div>
        <div className="w-full mt-4">
          <div className="w-full p-5 rounded-2xl border border-gray-50 border-opacity-10 bg-gradient-to-br from-gray-900/30 to-gray-800/20 hover:from-gray-900/40 hover:to-gray-800/30 transition-colors shadow-sm">
            <div className="flex items-start md:items-center gap-4">
              <button
                type="button"
                onClick={() => setIsMapOpen(true)}
                aria-label="Open Nanzan University map"
                className="rounded-lg focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <Image
                  src="/images/education/nanzan.jpg"
                  alt="Nanzan University"
                  width={380}
                  height={443}
                  className="h-full w-auto max-w-36 rounded-lg object-contain  shadow-sm cursor-pointer"
                />
              </button>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                  <div className="text-left">
                    <div className="text-lg md:text-xl font-bold leading-tight">
                      Nanzan University<br />
                      Faculty of Information Science
                    </div>
                    <div className="text-sm text-gray-400 mt-0.5">Nagoya, Japan</div>
                  </div>
                  <div className="flex flex-col items-end items-center gap-2">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-200">
                      Bachelor of Computer Science
                    </span>
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
                      2010 – 2014
                    </span>
                  </div>
                </div>
                <div className="mt-3 text-sm text-gray-300 leading-relaxed">
                  Focused on software engineering, algorithms, and distributed systems with
                  hands-on projects in web development and data structures.
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Full-screen Map Modal */}
        {isMapOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Nanzan University map"
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
            onClick={() => setIsMapOpen(false)}
          >
            <div
              className="relative w-full h-full p-4 md:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsMapOpen(false)}
                aria-label="Close map"
                className="absolute top-4 right-4 z-10 rounded-full bg-white/10 hover:bg-white/20 text-white px-3 py-1 text-sm border border-white/20"
              >
                Close
              </button>
              <div className="w-full h-full overflow-hidden rounded-2xl border border-gray-50 border-opacity-10 ring-1 ring-white/5 shadow-lg bg-black/20">
                <iframe
                  title="Nanzan University Map"
                  className="w-full h-full"
                  src={mapSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  aria-label="Map showing Nanzan University location"
                />
              </div>
              <div className="mt-3 text-xs text-gray-300 text-center">
                <a href={mapLink} target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-gray-100 transition-colors">Open in OpenStreetMap</a>
              </div>
            </div>
          </div>
        )}
        <div className="font-medium relative text-2xl mt-6 md:mt-6 mb-4 py-3">
          Certificate
          <div className="absolute pt-px bg-white mt-px top-full w-full ">
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 left-full"></div>
            <div className="bg-white absolute rounded-full p-0.5 md:p-1 top-0 transform -translate-y-1/2 right-full"></div>
          </div>
        </div>
        <div className="w-full mt-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {certificates.map((cert, index) => (
              <a
                key={index}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-50 border-opacity-10 bg-gradient-to-br from-gray-900/30 to-gray-800/20 hover:from-gray-900/40 hover:to-gray-800/30 transition-colors shadow-sm"
                target="_blank"
                href={cert.link}
                rel="noreferrer"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={cert.image}
                    className="w-full h-full object-cover"
                    alt={cert.title}
                    loading="lazy"
                  />
                </div>
                <div className="p-3 flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{cert.title}</div>
                    <div className="text-xs text-gray-400">{cert.description}</div>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/10">View</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Education