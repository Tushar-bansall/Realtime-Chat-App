import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatSkeleton from './Skeletons/ChatSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'

const ChatContainer = () => {
    const {selectedUser, isMessagesLoading, messages, getMessages,subscribeToMessages,unsubscribeFromMessages} = useChatStore()
    const {authUser} = useAuthStore()
    const messageEndRef = useRef(null)

    useEffect(()=>{
        getMessages(selectedUser._id);
        subscribeToMessages()

        return () => unsubscribeFromMessages()
    },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages])

    useEffect(()=>{
        if(messageEndRef.current && messages)
            messageEndRef.current.scrollIntoView({behavior:"smooth"})
    },[messages])

    if(isMessagesLoading) {
        return (
    <div className='flex flex-1 flex-col overflow-auto'>
        <ChatHeader />
        <ChatSkeleton />
        <ChatInput />
    </div>
    )}

  return (
    <div className='flex flex-1 flex-col overflow-auto'>
        <ChatHeader />

        <div className='flex-1 flex flex-col overflow-auto' >
            {
                messages.map((message) =>(
                    <div key={message._id} className={`chat ${message.senderid === authUser._id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}>                        
                        <div className="chat-image avatar">
                            <div className="size-10 rounded-full border">
                                <img
                                alt="Profile Picture"
                                src=
                                { message.senderid === authUser._id 
                                ? authUser.profilePicture || "user.png"
                                : selectedUser.profilePicture || "user.png"
                                } />
                            </div>
                        </div>                        
                        <div class=" chat-bubble flex flex-col ">
                            {message.image && 
                                <img src={message.image} className="sm:max-w-[200px] rounded-md mb-2" />
                            }
                            {message.text && <p>{message.text}</p>}
                            <span class="text-xs opacity-50 flex justify-end">{formatMessageTime(message.createdAt)}</span>                   
                        </div>                       
                    </div>
            ))}
        </div>
        <ChatInput />
    </div>
  )
}

export default ChatContainer