'use client'

import { useEffect, useRef } from 'react'
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
  video: HeroVideoType
}

export default function HeroVideo({ video }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

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

    videoElement.addEventListener('timeupdate', handleTimeUpdate)

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
    }
  }, [video])

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
      
      {/* Fallback thumbnail for loading or unsupported browsers */}
      {video.thumbnail && (
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Image
            src={urlFor(video.thumbnail).width(2000).url()}
            alt={video.altText || video.title}
            fill
            className="object-cover object-center opacity-0"
            style={{ transition: 'opacity 0.3s' }}
            onLoad={(e) => {
              // Only show thumbnail if video hasn't loaded
              const videoElement = videoRef.current
              if (!videoElement || videoElement.readyState < 2) {
                const target = e.target as HTMLImageElement
                target.style.opacity = '0.75'
              }
            }}
            priority
          />
        </div>
      )}
    </>
  )
}