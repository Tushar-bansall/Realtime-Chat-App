import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import SidebarSkeleton from './Skeletons/SidebarSkeleton'
import { useAuthStore } from '../store/useAuthStore'

const Sidebar = () => {
    const {getUsers, users, selectedUser, setSelectedUser, isUsersLoading}= useChatStore()

    const {onlineUsers} = useAuthStore()
    const [showOnlineOnly, setShowOnlineOnly] = React.useState(false)

    useEffect(()=>{
        getUsers()
    },[getUsers])

    const filteredUsers = showOnlineOnly ? users.filter(user => onlineUsers.includes(user._id)) : users

    if(isUsersLoading) return <SidebarSkeleton />

  return (
    <aside className='h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200'>
        <div className='border-b border-base-300 w-full p-5'>
            <div className="flex items-center gap-2">
                <img width="25" height="25" src="https://img.icons8.com/parakeet-line/50/user-group-man-woman.png" alt="user-group-man-woman"/>
                 <span className="font-medium hidden lg:block">Contacts</span>
            </div>   
            <div className='mt-3 hidden lg:flex flex-col items-center gap-2' >
                <label className='cursor-pointer flex items-center gap-2'>
                    <input 
                    type="checkbox" 
                    checked={showOnlineOnly} 
                    onChange={(e)=> setShowOnlineOnly(e.target.checked)} 
                    className='checkbox checkbox-sm'
                    />
                    <span className='text-sm'>Show online users only</span>
                </label>
                <span className='text-xs text-zinc-500'>({onlineUsers.length-1} online)</span>
            </div>
        </div>
        <div className="overflow-y-auto w-full py-3">
            {filteredUsers.map((user) => (
                <button
                key={user._id}
                onClick={() =>setSelectedUser(user)} 
                className={`w-full p-3 flex items-center gap-3  hover:bg-base-300 transition-colors
                ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}
                `}
                >
                <div className="relative mx-auto lg:mx-0">
                    <img
                        src={user.profilePicture || "/user.png"} 
                        alt={user.name}
                        className="size-12 object-cover rounded-full"
                    />
                    {onlineUsers.includes(user._id) ? 
                        <span
                            className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-zinc-900"/>
                        : <span
                            className="absolute bottom-0 right-0 size-3 bg-red-500 rounded-full ring-2 ring-zinc-900"/>
                    }
                </div>
            {/* User info - only visible on larger screens */} 
                <div className="hidden lg:block text-left min-w-0"> 
                    <div className="font-medium truncate">{user.fullName}</div>
                    {onlineUsers.includes(user._id) ? 
                        <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span class="w-2 h-2 me-1 bg-green-500 rounded-full"></span>
                            Online
                        </span> : 
                        <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span class="w-2 h-2 me-1 bg-red-500 rounded-full"></span>
                            Offline
                        </span>
                    }
                </div>
            </button>
            ))}

            {filteredUsers.length===0 &&
                <div className='text-center text-zinc-500 py-4'>No online users 😭</div>
            }
        </div>
    </aside>
  )
}

export default Sidebar