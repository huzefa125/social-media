import React, { useEffect, useState } from 'react'
import { dummyMessagesData } from '../assets/assets'
import { Link } from 'react-router-dom'
import moment from 'moment'

const RecentMessage = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    setMessages(dummyMessagesData)
  }, [])

  return (
    <div className="bg-white max-w-xs mt-4 p-4 min-h-20 rounded-md shadow text-xs text-slate-800">
      <h3 className="font-semibold text-slate-800 mb-4">Recent Messages</h3>
      <div className="flex flex-col gap-2 max-h-56 overflow-y-scroll no-scrollbar">
        {messages.map((message, index) => (
          <Link
            key={index}
            to={`/messages/${message.from_user_id._id}`} // ✅ only keep this one
            className="flex items-center gap-2 py-2 px-2 rounded-md hover:bg-slate-100"
          >
            {/* Profile Picture */}
            <img
              src={message.from_user_id.profile_picture}
              className="size-8 rounded-full object-cover"
              alt={message.from_user_id.full_name}
              onError={(e) => (e.target.src = '/default-avatar.png')} // fallback if missing
            />

            {/* User Info */}
            <div className="flex flex-col justify-center">
              <span className="font-medium text-sm">{message.from_user_id.full_name}</span>
              <span className="text-[10px] text-slate-400">
                {moment(message.createdAt).fromNow()}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default RecentMessage
