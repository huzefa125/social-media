import React, { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const StoryViewer = ({ viewStory, setViewStory }) => {
  const [progress, setProgress] = useState(0)

  // Auto progress (like Instagram stories)
  useEffect(() => {
    if (!viewStory) return
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setViewStory(null) // auto close when finished
          return 100
        }
        return prev + 1
      })
    }, 50) // 5 seconds total
    return () => clearInterval(interval)
  }, [viewStory, setViewStory])

  if (!viewStory) return null

  return (
    <div
      className="fixed inset-0 h-screen w-screen bg-black bg-opacity-95 z-[120] flex items-center justify-center"
      style={{
        backgroundColor:
          viewStory.media_type === 'text' ? viewStory.backgroundColor : '#000000',
      }}
    >
      {/* Progress Bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-700">
        <div
          className="h-full bg-white transition-all duration-75 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setViewStory(null)}
        className="absolute top-4 right-4 p-2 rounded-full bg-black/40 hover:bg-black/70 transition"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Story Content */}
      <div className="max-w-md w-full flex items-center justify-center p-4">
        {viewStory.media_type === 'text' ? (
          <p className="text-white text-2xl font-semibold text-center whitespace-pre-line">
            {viewStory.text}
          </p>
        ) : viewStory.media?.type?.startsWith('image') ? (
          <img
            src={viewStory.media}
            alt="story"
            className="max-h-[80vh] rounded-lg object-contain"
          />
        ) : (
          <video
            src={viewStory.media}
            controls
            autoPlay
            className="max-h-[80vh] rounded-lg"
          />
        )}
      </div>
    </div>
  )
}

export default StoryViewer
