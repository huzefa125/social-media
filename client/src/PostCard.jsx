import { BadgeCheck, Heart, MessageCircle, Share2 } from "lucide-react"
import moment from "moment"
import React, { useState } from "react"
import { dummyUserData } from "./assets/assets"

const PostCard = ({ post }) => {
  // Highlight hashtags
  const renderContentWithHashtags = (text) => {
    if (!text) return null
    const words = text.split(/(\s+)/) // keep spaces
    return words.map((word, index) => {
      if (word.startsWith("#")) {
        return (
          <span
            key={index}
            className="text-blue-500 font-medium cursor-pointer hover:underline"
          >
            {word}
          </span>
        )
      }
      return word
    })
  }

  const currentUser = dummyUserData
  const [likes, setLikes] = useState(post.likes || []) // likes as array of user ids

  const handleLikes = () => {
    if (likes.includes(currentUser._id)) {
      setLikes(likes.filter((id) => id !== currentUser._id))
    } else {
      setLikes([...likes, currentUser._id])
    }
  }

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${post._id}`

    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.user.full_name}'s post`,
          text: post.content || "Check out this post!",
          url: postUrl,
        })
      } catch (err) {
        console.error("Share canceled or failed", err)
      }
    } else {
      try {
        await navigator.clipboard.writeText(postUrl)
        alert("Post link copied to clipboard!")
      } catch (err) {
        console.error("Clipboard copy failed", err)
      }
    }
  }

  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-4 w-full max-w-2xl">
      {/* User Info */}
      <div className="inline-flex items-center gap-3 cursor-pointer">
        <img
          src={post.user.profile_picture}
          alt={`${post.user.full_name}'s profile`}
          className="size-10 rounded-full shadow"
        />
        <div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold">{post.user.full_name}</span>
            {post.user.verified && (
              <BadgeCheck className="size-4 text-blue-500" />
            )}
          </div>
          <div className="text-gray-500 text-sm">
            @{post.user.username} • {moment(post.createdAt).fromNow()}
          </div>
        </div>
      </div>

      {/* Post Content */}
      {post.content && (
        <div className="text-gray-800 text-sm whitespace-pre-line">
          {renderContentWithHashtags(post.content)}
        </div>
      )}

      {/* Post Images */}
      {post.image_urls?.length > 0 && (
        <div
          className={`grid gap-2 ${
            post.image_urls.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {post.image_urls.map((img, index) => (
            <img
              src={img}
              key={index}
              alt={`Post image ${index + 1}`}
              className={`w-full rounded-lg object-cover ${
                post.image_urls.length === 1
                  ? "h-auto max-h-[600px] object-contain"
                  : "h-60"
              }`}
            />
          ))}
        </div>
      )}

      {/* Post Actions */}
      <div className="flex items-center gap-6 text-gray-600 text-sm pt-2 border-t border-gray-200">
        {/* Likes */}
        <div className="flex items-center gap-1">
          <Heart
            onClick={handleLikes}
            className={`size-5 cursor-pointer transition ${
              likes.includes(currentUser._id)
                ? "text-red-500 fill-red-500"
                : "hover:text-red-400"
            }`}
          />
          <span>{likes.length}</span>
        </div>

        {/* Comments */}
        <div className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition">
          <MessageCircle className="size-5" />
          <span>{post.comments_count || 0}</span>
        </div>

        {/* Share */}
        <div
          className="flex items-center gap-1 cursor-pointer hover:text-green-500 transition"
          onClick={handleShare}
        >
          <Share2 className="size-5" />
          <span>Share</span>
        </div>
      </div>
    </div>
  )
}

export default PostCard
