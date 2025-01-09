import React, { useEffect, useRef } from 'react'
import { useChatStore } from '../store/useChatStore'
import ChatHeader from './ChatHeader'
import ChatInput from './ChatInput'
import ChatSkeleton from './Skeletons/ChatSkeleton'
import { useAuthStore } from '../store/useAuthStore'
import { formatMessageTime } from '../lib/utils'
import FriendsProfile from './friendsProfile'

const ChatContainer = () => {
    
    const [clickedmsgid,setclickedmsgid] = React.useState(null)
    const {selectedUser, isMessagesLoading, messages, getMessages,subscribeToMessages,unsubscribeFromMessages,sendReaction,subscribeToReactions,unsubscribeFromReactions} = useChatStore()
    const {authUser} = useAuthStore()
    const messageEndRef = useRef(null)

    useEffect(()=>{
        getMessages(selectedUser._id);
        subscribeToMessages()
        subscribeToReactions()

        return () => {unsubscribeFromReactions();unsubscribeFromMessages()}
    },[selectedUser._id,getMessages,subscribeToMessages,unsubscribeFromMessages,subscribeToReactions,unsubscribeFromReactions])

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
    <div  className='flex flex-1 flex-col overflow-auto bg-[url(https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png)] bg-cover'>
        <ChatHeader />

        <div className='flex-1 flex flex-col overflow-x-hidden sm:overflow-auto p-2'
            onClick={() => clickedmsgid!==null && setclickedmsgid(null)}
        >
            {
                messages.map((message) =>(
                    <div key={message._id} className={`chat ${message.senderid === authUser._id ? "chat-end" : "chat-start"}`}
                        ref={messageEndRef}>                        
                        <div className="chat-image avatar">
                            <div className="size-7 md:size-10 rounded-full border border-black">
                                <img
                                alt="Profile Picture"
                                src=
                                { message.senderid === authUser._id 
                                ? authUser.profilePicture || "https://img.icons8.com/ios/50/user-male-circle--v1.png"
                                : selectedUser.profilePicture || "https://img.icons8.com/ios/50/user-male-circle--v1.png"
                                } />
                            </div>
                        </div>                    
                            <div 
                                class={` chat-bubble flex flex-col rounded-2xl shadow-md text-zinc-800 cursor-pointer`}
                                style={message.senderid === authUser._id ?  {backgroundColor:"#00a96e"} : {backgroundColor:"#ffffff"} }
                                    
                                
                                onClick={() => setclickedmsgid(message._id)}
                            >
                                {message.image && 
                                    <img src={message.image} className="max-w-[100px] sm:max-w-[200px] rounded-md mb-2" />
                                }
                                {message.text && <p className='text-sm md:text-base max-w-[calc(30vw)] break-words'>{message.text}</p>}
                                <span class="text-xs opacity-50 flex justify-end">{formatMessageTime(message.createdAt)}</span>                   
                            </div>
                            {clickedmsgid === message._id && <div className="chat-header ">
                                <div className="w-fit bg-base-100/20 rounded-2xl">
                                
                                    <button className="btn btn-sm btn-circle btn-ghost" value='❤️️' onClick={(e) => {setclickedmsgid(null);sendReaction({message_id : message._id,reaction: e.target.value})}}>❤️️</button>
                                    <button className="btn btn-sm btn-circle btn-ghost" value='👍' onClick={(e) => {setclickedmsgid(null);sendReaction({message_id : message._id,reaction: e.target.value})}}>👍</button>
                                    <button className="btn btn-sm btn-circle btn-ghost" value='🤣' onClick={(e) => {setclickedmsgid(null);sendReaction({message_id : message._id,reaction: e.target.value})}}>🤣</button>
                                    <button className="btn btn-sm btn-circle btn-ghost" value='😢' onClick={(e) => {setclickedmsgid(null);sendReaction({message_id : message._id,reaction: e.target.value})}}>😢</button>                              
                                </div>
                            </div> }
                        {message.reactions &&
                            <div>
                                <div className={` dropdown dropdown-end 
                                ${message.senderid === authUser._id ? "dropdown-left" : "dropdown-right"}`}>
                                    <div tabIndex={0} role="button" className="btn p-1 btn-xs bg-base-100/20 rounded-xl text-md btn-primary">
                                        {Object.entries(message.reactions).slice(0, 2) // Get the first 2 entries
                                            .map(([key, value]) => (
                                                <p> {value}</p>
                                        ))}
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-base-100/20 rounded-2xl z-[1] shadow text-white backdrop-blur-sm">
                                        {Object.entries(message.reactions).map(([key, value]) => (
                                            <li key={key} className="text-sm font-semibold sm:font-bold ">
                                                {key}:{value}
                                            </li>



                                        ))}
                                    </ul>
                                </div>
                                
                            </div>
                        }
                    </div>
            ))}
        </div>
        <ChatInput />
        <FriendsProfile {...selectedUser}/>
    </div>
  )
}

export default ChatContainer
