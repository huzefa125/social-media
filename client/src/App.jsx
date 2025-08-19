import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Login from './pages/Login'
import Feed from './pages/Feed'
import Messages from './pages/Messages'
import Discover from './pages/Discover'
import Profile from './pages/Profile'
import CretatePost from './pages/CreatePost'
function App() {

  return (
    <>
     <Routes>
        <Route path='/' element={<Login/>}>
        <Route index element = {<Feed/>} />
        <Route path='messages' element = {<Messages/>} />
        <Route path='messages/userID' element = {<ChatBox/>} />
        <Route path='discover' element = {<Discover/>} />
        <Route path='profile' element = {<Profile/>} />
        <Route path='profile/:profileId' element = {<Profile/>} />
        <Route path='create-post' element = {<CreatePost/>} />
        </Route>
     </Routes>
    </>
  )
}

export default App
