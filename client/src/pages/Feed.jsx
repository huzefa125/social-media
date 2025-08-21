import React, { useEffect, useState } from 'react'
import { dummyPostsData } from '../assets/assets'
import Loading from '../components/Loading'
import StoriesBar from '../components/StoriesBar'
const Feed = () => {
  const  [feeds,setFeeds] = useState([])
  const [loading,setLoading] = useState(true)
  const fetchFeeeds = async () => {
    setFeeds(dummyPostsData)
    setLoading(false)
  }

  useEffect(()=>{
    fetchFeeeds()
  },[])

  return !loading ?  (
    <div className='h-full overflow-y-scroll no-scrollbar py-10 xl:pr-5 flex items-start justify-center xl:gap-8'>
      {/* SToreies and post list */}
      <div>
        <StoriesBar />
        <div className='p-4 space-y-6'>List of post</div>
      </div>

      <div>
        <div>
          <h1>Sponsored</h1>
        </div>
        <h1>Recent messages</h1>
      </div>
    </div>
  ) : <Loading/>
}

export default Feed