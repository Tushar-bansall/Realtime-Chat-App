import React from 'react'
import { useChatStore } from '../store/useChatStore'

const FriendsProfile = (props) => {
    const {removeFriend} = useChatStore()
  return (
    <dialog id='my_modal_1' className='modal modal-bottom md:modal-middle p-4 flex flex-col items-center justify-center bg-gray-800/40 '>
        <div className='p-6 bg-base-200/50 w-80 max-w-2xl modal-box backdrop-blur-sm'>
            <div className="flex flex-col gap-3 justify-center items-center ">
                 <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <img
                src={props.profilePicture || "user.png"}
                alt="Profile"
                className="w-24 h-24  md:w-32 md:h-32 rounded-full object-cover border-4 border-yellow-500"
                />
                <h2 className="mt-4 text-lg md:text-xl font-bold text-yellow-500">{props.fullName}</h2>
                <p className=" text-md md:text-lg font-bold text-yellow-500">{props.bio}</p>
                <div className='flex items-center justify-center gap-6'>
                    <button className='btn btn-sm btn-circle btn-outline btn-error ' onClick={()=>removeFriend(props._id)}>
                        <svg fill="#FFFFFF" className='w-5 h-5' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="924 796 200 200" enable-background="new 924 796 200 200" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M1057.812,859.418c0,30.918-21.222,55.985-47.402,55.985c-26.175,0-47.397-25.067-47.397-55.985 c0-30.921,21.222-55.979,47.397-55.979C1036.59,803.438,1057.812,828.497,1057.812,859.418z"></path> <g> <path d="M1056.514,969.78l11.602-11.604c1.321-1.32,1.321-3.463,0-4.783l-11.601-11.6c-2.848-2.846-4.415-6.634-4.415-10.662 c0-4.027,1.567-7.813,4.415-10.661c1.429-1.429,3.096-2.535,4.909-3.283c-1.569-1.139-3.163-2.246-4.807-3.283 c-3.575-2.252-8.213-1.886-11.384,0.908c-9.724,8.563-21.759,13.662-34.822,13.662c-13.318,0-25.567-5.3-35.394-14.168 c-3.136-2.831-7.75-3.257-11.355-1.055c-18.651,11.389-32.769,29.471-38.924,50.942c-1.654,5.761-0.491,11.971,3.114,16.764 c3.616,4.785,9.261,7.604,15.256,7.604h111.373C1050.749,982.728,1051.421,974.872,1056.514,969.78z"></path> </g> <path d="M1121.797,975.127l-19.339-19.338l19.341-19.342c2.935-2.935,2.935-7.692-0.002-10.63 c-2.935-2.935-7.693-2.935-10.628-0.002l-19.343,19.343l-19.336-19.341c-2.937-2.934-7.693-2.934-10.63,0 c-2.934,2.937-2.934,7.695,0,10.63l19.341,19.339l-19.342,19.339c-2.934,2.936-2.934,7.693,0.001,10.63 c2.938,2.936,7.695,2.936,10.63,0.002l19.341-19.341l19.338,19.339c2.935,2.935,7.693,2.935,10.628,0 C1124.732,982.819,1124.732,978.061,1121.797,975.127z"></path> </g> </g></svg>
                    </button>
                </div>
            </div>
        </div>
    </dialog>
  )
}

export default FriendsProfile



    