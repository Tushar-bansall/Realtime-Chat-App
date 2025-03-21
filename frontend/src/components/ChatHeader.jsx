import React from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'

const ChatHeader = () => {
    const {selectedUser, setSelectedUser} = useChatStore()
    const {setToken,setChannel,fetchToken,onlineUsers,setCalling} = useAuthStore()

    const handleCall = async () => {
        const channelName = ("channel_" + (Math.random()*30000).toFixed(0));
        const res = await fetchToken(channelName,0)
        setCalling(true)
        setChannel(channelName)
        setToken(res)
    }

  return (
    <div className='p-1.5 md:p-2.5 border-b border-base-300 bg-transparent'>
        <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3 md:gap-6 md:ml-5'>
                <div className='avatar'>
                    <div className='size-7 md:size-10 rounded-full relative'>
                        <img src={selectedUser.profilePicture || "https://img.icons8.com/ios/50/user-male-circle--v1.png"}
                            alt ={selectedUser.fullName} />
                    </div>
                </div>
                <div>
                    <h3 className='font-light md:font-medium text-zinc-800'>{selectedUser.fullName}</h3>
                    {onlineUsers.includes(selectedUser._id)
                        ?  
                        <span class="inline-flex items-center bg-green-100 text-green-800 text-xs font-light md:font-medium p-1 md:px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">
                            <span class="w-1 h-1 sm:w-2 sm:h-2 me-0.5 sm:me-1 bg-green-500 rounded-full"></span>
                            Online
                        </span> 
                        : 
                        <span class="inline-flex items-center bg-red-100 text-red-800 text-xs font-light md:font-medium p-1 md:px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">
                            <span class="w-1 h-1 sm:w-2 sm:h-2 me-0.5 sm:me-1 bg-red-500 rounded-full"></span>
                            Offline
                        </span>
                    }
                </div>
                <button onClick={()=> document.getElementById('my_modal_1').showModal()} class="text-info">
                <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
            </div>
            <button onClick={handleCall} className="btn btn-circle p-0.5 bg-white btn-ghost">
                <img src="video.png" className="w-10 h-10" />
            </button>
            <button  onClick={()=> setSelectedUser(null)} className='m-3'>
            <svg width="25px" height="25px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>cross-circle</title> <desc>Created with Sketch Beta.</desc> <defs> </defs> <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage"> <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-568.000000, -1087.000000)" fill="#000000"> <path d="M584,1117 C576.268,1117 570,1110.73 570,1103 C570,1095.27 576.268,1089 584,1089 C591.732,1089 598,1095.27 598,1103 C598,1110.73 591.732,1117 584,1117 L584,1117 Z M584,1087 C575.163,1087 568,1094.16 568,1103 C568,1111.84 575.163,1119 584,1119 C592.837,1119 600,1111.84 600,1103 C600,1094.16 592.837,1087 584,1087 L584,1087 Z M589.717,1097.28 C589.323,1096.89 588.686,1096.89 588.292,1097.28 L583.994,1101.58 L579.758,1097.34 C579.367,1096.95 578.733,1096.95 578.344,1097.34 C577.953,1097.73 577.953,1098.37 578.344,1098.76 L582.58,1102.99 L578.314,1107.26 C577.921,1107.65 577.921,1108.29 578.314,1108.69 C578.708,1109.08 579.346,1109.08 579.74,1108.69 L584.006,1104.42 L588.242,1108.66 C588.633,1109.05 589.267,1109.05 589.657,1108.66 C590.048,1108.27 590.048,1107.63 589.657,1107.24 L585.42,1103.01 L589.717,1098.71 C590.11,1098.31 590.11,1097.68 589.717,1097.28 L589.717,1097.28 Z" id="cross-circle" sketch:type="MSShapeGroup"> </path> </g> </g> </g></svg>            </button>
        </div>
    </div>
  )
}

export default ChatHeader