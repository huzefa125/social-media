import React, { useEffect, useState, useRef } from "react"
import { X } from "lucide-react"

const StoryViewer = ({ stories = [], initialIndex = 0, setViewStory }) => {
  // ✅ Guard against empty stories
  if (!stories || stories.length === 0) return null

  // Clamp initial index
  const safeIndex =
    initialIndex >= 0 && initialIndex < stories.length ? initialIndex : 0

  const [currentIndex, setCurrentIndex] = useState(safeIndex)
  const [progress, setProgress] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const intervalRef = useRef(null)
  const videoRef = useRef(null)

  const story = stories[currentIndex]
  const DURATION = 5000 // default duration for text/images

  // Handle auto progress for text & images
  useEffect(() => {
    if (!story) return
    if (story.media_type === "video") return // handled via video progress

    setProgress(0)
    const startTime = Date.now()

    intervalRef.current = setInterval(() => {
      if (isPaused) return
      const elapsed = Date.now() - startTime
      const percent = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(percent)

      if (percent >= 100) {
        clearInterval(intervalRef.current)
        goNext()
      }
    }, 50)

    return () => clearInterval(intervalRef.current)
  }, [currentIndex, story, isPaused])

  // Pause/resume video
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause()
      } else {
        videoRef.current.play().catch(() => {})
      }
    }
  }, [isPaused])

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext()
      if (e.key === "ArrowLeft") goPrev()
      if (e.key === "Escape") setViewStory(null)
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [currentIndex])

  const goNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      setViewStory(null)
    }
  }

  const goPrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
    }
  }

  const handleVideoProgress = () => {
    if (!videoRef.current) return
    const percent =
      (videoRef.current.currentTime / videoRef.current.duration) * 100
    setProgress(percent)
  }

  if (!story) return null

  const renderContent = () => {
    if (story.media_type === "text") {
      return (
        <p className="w-full h-full flex items-center justify-center p-8 text-white text-2xl text-center">
          {story.text || story.content}
        </p>
      )
    }

    if (story.media_type === "image") {
      return (
        <img
          src={story.media || story.media_url}
          alt="story"
          className="max-h-[80vh] rounded-lg object-contain"
        />
      )
    }

    if (story.media_type === "video") {
      return (
        <video
          ref={videoRef}
          src={story.media || story.media_url}
          className="max-h-[80vh] rounded-lg"
          autoPlay
          onTimeUpdate={handleVideoProgress}
          onEnded={goNext}
          controls={false}
        />
      )
    }

    return null
  }

  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-black bg-opacity-95 z-[120] flex items-center justify-center"
      style={{
        backgroundColor:
          story.media_type === "text" ? story.backgroundColor || "#000" : "#000",
      }}
    >
      {/* Progress Bars */}
      <div className="absolute top-0 left-0 w-full flex gap-1 p-2">
        {stories.map((_, i) => (
          <div key={i} className="flex-1 h-1 bg-gray-700 rounded">
            <div
              className="h-full bg-white transition-all ease-linear"
              style={{
                width:
                  i < currentIndex
                    ? "100%"
                    : i === currentIndex
                    ? `${progress}%`
                    : "0%",
              }}
            ></div>
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button
        onClick={() => setViewStory(null)}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 transition"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Click zones */}
      <div
        className="absolute inset-0 flex"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div className="flex-1 cursor-pointer" onClick={goPrev}></div>
        <div className="flex-1 cursor-pointer" onClick={goNext}></div>
      </div>

      {/* Story Content */}
      <div className="max-w-md w-full flex items-center justify-center p-4">
        {renderContent()}
      </div>
    </div>
  )
}

export default StoryViewer
