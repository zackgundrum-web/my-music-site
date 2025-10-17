'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity'

interface HeroVideoType {
  _id: string
  title: string
  videoUrl: string
  loopStart?: number
  loopEnd?: number
  volume?: number
  playbackSpeed?: number
  thumbnail?: any
  altText?: string
}

interface HeroVideoProps {
  video: HeroVideoType | null
}

export default function HeroVideo({ video }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement || !video) return

    const { loopStart = 0, loopEnd, volume = 0, playbackSpeed = 1 } = video

    // Set video properties
    videoElement.volume = volume
    videoElement.playbackRate = playbackSpeed
    
    // Handle looping
    const handleTimeUpdate = () => {
      if (loopEnd && videoElement.currentTime >= loopEnd) {
        videoElement.currentTime = loopStart
      }
    }

    // Handle when video is loaded and ready to play
    const handleCanPlay = () => {
      setIsVideoLoaded(true)
    }

    videoElement.addEventListener('timeupdate', handleTimeUpdate)
    videoElement.addEventListener('canplay', handleCanPlay)

    // Attempt to play video
    const playVideo = async () => {
      try {
        await videoElement.play()
      } catch (error) {
        console.log('Autoplay prevented:', error)
      }
    }

    playVideo()

    return () => {
      videoElement.removeEventListener('timeupdate', handleTimeUpdate)
      videoElement.removeEventListener('canplay', handleCanPlay)
    }
  }, [video])

  // Return null if no video is provided
  if (!video) {
    return null
  }

  return (
    <>
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover object-center opacity-75"
          muted
          playsInline
          preload="auto"
        >
          <source src={video.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      {/* Dark overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/50 z-[1]" />
      
      {/* Fallback thumbnail for loading or unsupported browsers */}
      {video.thumbnail && (
        <div 
          className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
          style={{ opacity: isVideoLoaded ? 0 : 0.75 }}
        >
          <Image
            src={urlFor(video.thumbnail).width(2000).url()}
            alt={video.altText || video.title}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}
    </>
  )
}