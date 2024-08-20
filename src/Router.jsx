import React, { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import Explore from './Pages/Explore'
import Message from './Pages/Message'
import Inbox from './Pages/Inbox_Msg'
import Reels from './Pages/Reels'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Upload_img from './Pages/Upload_img'
import Edit_Profile from './Pages/Edit_Profile'
import See_all from './Pages/See_all'
import Other_Profile from './Pages/Other_Profile'
import Ai_int from './Pages/AI_int'
// import TextToSpeech from './Components/TextToSpeech'

function Router() {
  const [user , setUser] = useState(null);
  useEffect(() =>{
    // const userData = JSON.parse(localStorage.getItem('user'));
    // const encoded = atob(userData);
    // setUser(encoded);
    const encodedUserData = localStorage.getItem('user');

    if (encodedUserData) {
      const decodedData = atob(encodedUserData);
      const userData = JSON.parse(decodedData);
      setUser(userData);
    }
  },[])
  return (
    <div>
        <BrowserRouter>
         <Routes>
            <Route path='/home' element={<Home/>}></Route>
            <Route path={`/profile/${user?.username}`} element={<Profile/>}></Route>
            <Route path={`/profile/edit/${user?.username}`} element={<Edit_Profile/>}></Route>
            <Route path={'/user/:username'} element={<Other_Profile/>}></Route>
            <Route path='/explore' element={<Explore/>}></Route>
            <Route path='/direct/inbox' element={<Inbox/>}></Route>
            <Route path='/direct/message' element={<Message/>}></Route>
            <Route path='/reels' element={<Reels/>}></Route>
            <Route path='/' element={<Login/>}></Route>
            <Route path='/register' element={<Register/>}></Route>
            <Route path='/create/post' element={<Upload_img/>}></Route>
            <Route path='/explore/people' element={<See_all/>}></Route>
            <Route path='/chatbot/ai' element={<Ai_int/>}></Route>
            {/* <Route path='/text' element={<TextToSpeech/>}></Route> */}
         </Routes>
        </BrowserRouter>
    </div>
  )
}

export default Router