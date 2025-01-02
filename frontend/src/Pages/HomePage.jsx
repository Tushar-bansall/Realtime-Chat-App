import React from 'react'
import { useChatStore } from '../store/useChatStore'
import Sidebar from "../components/sidebar"
import ChatContainer from "../components/chatContainer"
import NoChatSelected from '../components/noChatSelected'

const HomePage = () => {
  const {selectedUser} = useChatStore()
  return (
    <div className='h-screen bg-base-200'>
      <div className='flex items-center justify-center pt-20 px-4'>
        <div className='bg-base-100 rounded-lg shadow-cl w-full max-w-6xl h-[calc(100vh-8rem)]'>
          <div className='flex h-full rounded-lg overflow-hidden'>
            <Sidebar />

            {selectedUser ? <ChatContainer /> : <NoChatSelected />} 
            
          </div>

        </div>

      </div>

    </div>
  )
}

export default HomePage