import { 
  ArrowLeft, 
  FileText, 
  Image as ImageIcon, 
  Upload, 
  CheckCircle2, 
  Loader2 
} from 'lucide-react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

const StoryModel = ({ setShowModel, fetchStories }) => {
  const bgColors = ["#4f46e5", "#7c3aed", "#db2777", "#e11d48", "#ca8a04", "#0d9488"]
  const [bg, setBg] = useState(bgColors[0])
  const [text, setText] = useState("")
  const [media, setMedia] = useState(null)
  const [preview, setPreview] = useState(null)
  const [mode, setMode] = useState("text")

  // Handle media upload
  const handleMediaUpload = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setMedia(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  // Handle story creation
  const handleCreateStory = async () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (text || media) {
          console.log("New Story:", { text, media, bg, mode })
          fetchStories()
          setShowModel(false)
          resolve()
        } else {
          reject(new Error("Story cannot be empty"))
        }
      }, 1500)
    })
  }

  return (
    <div className='fixed inset-0 z-[110] min-h-screen bg-black/80 backdrop-blur text-white flex items-center justify-center p-4'>
      <div className='w-full max-w-md bg-gray-900 rounded-2xl p-6 shadow-2xl border border-gray-700'>
        
        {/* Header */}
        <div className='mb-6 flex items-center justify-between'>
          <button onClick={() => setShowModel(false)} className='p-2 rounded-full hover:bg-gray-800 transition'>
            <ArrowLeft className='w-5 h-5 text-gray-300' />
          </button>
          <h2 className='text-xl font-semibold text-gray-100'>Create Story</h2>
          <span className='w-8'></span>
        </div>

        {/* Story Input */}
        <div className='flex flex-col gap-4'>
          
          {/* Text Mode */}
          {mode === "text" && (
            <div
              className='w-full h-48 flex items-center justify-center rounded-xl p-4 shadow-inner'
              style={{ backgroundColor: bg }}
            >
              <textarea
                className='bg-transparent text-white w-full h-full text-lg resize-none focus:outline-none placeholder-gray-200'
                placeholder="Write something..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
            </div>
          )}

          {/* Media Mode */}
          {mode === "media" && (
            <div className='w-full h-48 flex items-center justify-center bg-gray-800 rounded-xl overflow-hidden border border-gray-700'>
              {preview ? (
                media?.type.startsWith('image') ? (
                  <img src={preview} alt="" className='object-contain max-h-full' />
                ) : (
                  <video src={preview} controls className='object-contain max-h-full' />
                )
              ) : (
                <label className='cursor-pointer flex flex-col items-center gap-2 text-gray-400 hover:text-white transition'>
                  <Upload className='w-8 h-8' />
                  <span>Click to upload image or video</span>
                  <input type="file" accept="image/*,video/*" onChange={handleMediaUpload} hidden />
                </label>
              )}
            </div>
          )}

          {/* Background Colors (only for text mode) */}
          {mode === "text" && (
            <div className='flex gap-2 justify-center'>
              {bgColors.map((color, i) => (
                <button
                  key={i}
                  onClick={() => setBg(color)}
                  className={`w-7 h-7 rounded-full border-2 transition ${bg === color ? "scale-110 border-white" : "border-gray-400"}`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}

          {/* Mode Toggle */}
          <div className='flex gap-2'>
            <button
              onClick={() => {
                setMode("text")
                setMedia(null)
                setPreview(null)
              }}
              className='flex-1 flex items-center justify-center gap-2 p-2 rounded-lg cursor-pointer text-white transition'
              style={{
                backgroundColor: mode === "text" ? bg : "#374151"
              }}
            >
              <FileText className="w-4 h-4" /> Text
            </button>

            <button
              onClick={() => {
                setMode("media")
                setText("")
              }}
              className='flex-1 flex items-center justify-center gap-2 p-2 rounded-lg cursor-pointer text-white transition'
              style={{
                backgroundColor: mode === "media" ? "#4f46e5" : "#374151"
              }}
            >
              <ImageIcon className="w-4 h-4" /> Media
            </button>
          </div>

          {/* Create Button */}
          <button
            onClick={() =>
              toast.promise(handleCreateStory(), {
                loading: <span className="flex items-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Saving...</span>,
                success: <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Story Added</span>,
                error: (e) => <span className="text-red-400">⚠ {e.message}</span>,
              })
            }
            className='w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg mt-4 font-medium shadow-md transition flex items-center justify-center gap-2'
          >
            <Upload className="w-5 h-5" /> Post Story
          </button>
        </div>
      </div>
    </div>
  )
}

export default StoryModel
