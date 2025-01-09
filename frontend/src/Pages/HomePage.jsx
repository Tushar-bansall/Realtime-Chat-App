import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from "../components/sidebar"
import ChatContainer from "../components/chatContainer"
import NoChatSelected from '../components/noChatSelected'

const HomePage = () => {
  const {selectedUser,showProfile} = useChatStore()
  return (
    <div className=' bg-base-200'>
      <div className='flex items-center justify-center'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-10rem)] sm:h-[calc(100vh-5rem)] border-black border-t-2'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />
              <div className='flex h-full rounded-lg overflow-hidden w-full'>
                {selectedUser ? <ChatContainer /> : <NoChatSelected />}
              </div>
            
          </div>
         
        </div>

      </div>

    </div>
  )
}

export default HomePage