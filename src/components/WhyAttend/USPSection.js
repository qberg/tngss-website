"use client"

import { useRef, useEffect } from "react"
import { useDoomScroll } from "../../hooks/useDoomScroll"
import ParallelScroll from "./ParallelScroll"
import backgroundImage from '../../assets/img/usp-background.png'

export default function USPSection({ data }) {
  const mainRef = useRef(null)
  const circleRef = useRef(null)

  useEffect(() => {
    if (mainRef.current && circleRef.current) {
      useDoomScroll(mainRef, circleRef)
    }
  }, [])

  if (!data) return null

  return (
    <div className="relative overflow-x-hidden md:min-h-screen"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      <div
        className="relative overflow-x-hidden "
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Heading inside container */}
        <div className="container mx-auto px-4">
          <div ref={mainRef} className="pt-20 pb-8 md:pb-12">
            <h1 className="text-white text-4xl md:text-7xl font-bold">
              {data?.Heading || "TNGSS USP"}
            </h1>
          </div>
        </div>

        {/* Full-width ParallelScroll */}
        <div ref={circleRef} className="pb-16 w-full">
          <ParallelScroll cont={data?.cards || []} />
        </div>
      </div>

    </div>
  )
}