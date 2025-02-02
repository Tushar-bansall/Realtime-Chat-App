import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from "../components/sidebar"
import ChatContainer from "../components/chatContainer"
import NoChatSelected from '../components/noChatSelected'
import CallPage from './CallPage'
import { useAuthStore } from '../store/useAuthStore'




const HomePage = () => {
  const {selectedUser} = useChatStore()
  const {calling,subscribeToCalls,unsubscribeFromCalls} = useAuthStore()
  
  useEffect(()=>{
    subscribeToCalls()
    return () => {unsubscribeFromCalls()}
  },[subscribeToCalls,unsubscribeFromCalls])


  return (
    <div className=' bg-base-200'>
    { calling ? <CallPage /> :
      <div className='flex items-center justify-center'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-10rem)] sm:h-[calc(100vh-5rem)] border-black border-t-2'>
          <div className='flex h-full w-full rounded-lg '>
            <Sidebar />
              {selectedUser ? <div className='flex h-full rounded-lg overflow-hidden w-full'>
                <ChatContainer/> 
              </div>
              :
              <div className='hidden md:flex h-full rounded-lg overflow-hidden w-full'>
                <NoChatSelected />
              </div>
              }
          </div>
         
        </div>

      </div>}

    </div>
  )
}

export default HomePage