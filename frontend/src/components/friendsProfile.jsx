import React from 'react'
import { useChatStore } from '../store/useChatStore'

const FriendsProfile = (props) => {
    const {friends} = useChatStore()
  return (
    <div className='p-4 flex flex-col items-center justify-center bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuJAmi3fHHjog92eHrAEgbL6Y_qe7J_bJdxg&s)] bg-cover w-full'>
        <div className='p-6 bg-slate-300 w-80 max-w-2xl'>
            <div className="flex flex-col gap-3 justify-center items-center">
                <img
                src={props.profilePicture || "user.png"}
                alt="Profile"
                className="w-24 h-24  md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-500"
                />
                <h2 className="mt-4 text-lg md:text-xl font-bold text-white">{props.fullName}</h2>
                <p className=" text-md md:text-lg font-bold text-white">{props.bio}</p>
                <div>
                    <button className='btn btn-ghost btn-circle btn-sm btn-outline btn-primary'>
                    {
                        friends.includes(props._id)
                        ?
                            <svg className='w-5 h-5' viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/ className='w-6 h-6'"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z" stroke="#292" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M3.41003 22C3.41003 18.13 7.26003 15 12 15C12.96 15 13.89 15.13 14.76 15.37" stroke="#292" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M22 18C22 18.75 21.79 19.46 21.42 20.06C21.21 20.42 20.94 20.74 20.63 21C19.93 21.63 19.01 22 18 22C16.54 22 15.27 21.22 14.58 20.06C14.21 19.46 14 18.75 14 18C14 16.74 14.58 15.61 15.5 14.88C16.19 14.33 17.06 14 18 14C20.21 14 22 15.79 22 18Z" stroke="#292" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path> <path d="M16.4399 18L17.4299 18.99L19.5599 17.02" stroke="#292" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path> </g></svg>
                        :
                            <svg className='w-5 h-5' fill="#000000" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="924 796 200 200" enable-background="new 924 796 200 200" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M1050.379,857.065c0,29.431-20.199,53.292-45.119,53.292c-24.917,0-45.116-23.862-45.116-53.292 c0-29.433,20.198-53.285,45.116-53.285C1030.18,803.78,1050.379,827.632,1050.379,857.065z"></path> <path d="M1065.693,988.22c1.768,0,3.201-1.433,3.201-3.2v-18.697c0-1.767-1.434-3.2-3.201-3.2h-14.774 c-8.276,0-15.012-6.733-15.012-15.012c0-8.277,6.735-15.011,15.012-15.011h17.905c-5.382-6.167-11.636-11.557-18.591-15.94 c-3.404-2.146-7.82-1.797-10.839,0.862c-9.255,8.15-20.709,13.004-33.143,13.004c-12.679,0-24.337-5.043-33.688-13.485 c-2.985-2.694-7.378-3.1-10.81-1.005c-17.754,10.842-31.191,28.053-37.051,48.491c-1.574,5.483-0.468,11.396,2.963,15.956 c3.442,4.557,8.816,7.237,14.521,7.237H1065.693L1065.693,988.22z"></path> <path d="M1116.891,941.001h-25.875v-25.876c0-3.927-3.184-7.11-7.111-7.11c-3.929,0-7.111,3.184-7.111,7.11v25.876h-25.875 c-3.927,0-7.11,3.184-7.11,7.109c0,3.927,3.184,7.11,7.11,7.11h25.875v25.876c0,3.927,3.183,7.11,7.111,7.11 c3.928,0,7.111-3.184,7.111-7.11v-25.876h25.875c3.926,0,7.109-3.184,7.109-7.11C1124,944.185,1120.816,941.001,1116.891,941.001z"></path> </g> </g></svg>
                    }
                    </button>
                    {friends.includes(props._id) && <button className='btn btn-ghost btn-circle btn-sm'>
                        <svg fill="#000000" className='w-5 h-5' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="924 796 200 200" enable-background="new 924 796 200 200" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M1057.812,859.418c0,30.918-21.222,55.985-47.402,55.985c-26.175,0-47.397-25.067-47.397-55.985 c0-30.921,21.222-55.979,47.397-55.979C1036.59,803.438,1057.812,828.497,1057.812,859.418z"></path> <g> <path d="M1056.514,969.78l11.602-11.604c1.321-1.32,1.321-3.463,0-4.783l-11.601-11.6c-2.848-2.846-4.415-6.634-4.415-10.662 c0-4.027,1.567-7.813,4.415-10.661c1.429-1.429,3.096-2.535,4.909-3.283c-1.569-1.139-3.163-2.246-4.807-3.283 c-3.575-2.252-8.213-1.886-11.384,0.908c-9.724,8.563-21.759,13.662-34.822,13.662c-13.318,0-25.567-5.3-35.394-14.168 c-3.136-2.831-7.75-3.257-11.355-1.055c-18.651,11.389-32.769,29.471-38.924,50.942c-1.654,5.761-0.491,11.971,3.114,16.764 c3.616,4.785,9.261,7.604,15.256,7.604h111.373C1050.749,982.728,1051.421,974.872,1056.514,969.78z"></path> </g> <path d="M1121.797,975.127l-19.339-19.338l19.341-19.342c2.935-2.935,2.935-7.692-0.002-10.63 c-2.935-2.935-7.693-2.935-10.628-0.002l-19.343,19.343l-19.336-19.341c-2.937-2.934-7.693-2.934-10.63,0 c-2.934,2.937-2.934,7.695,0,10.63l19.341,19.339l-19.342,19.339c-2.934,2.936-2.934,7.693,0.001,10.63 c2.938,2.936,7.695,2.936,10.63,0.002l19.341-19.341l19.338,19.339c2.935,2.935,7.693,2.935,10.628,0 C1124.732,982.819,1124.732,978.061,1121.797,975.127z"></path> </g> </g></svg>
                    </button>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default FriendsProfile



    