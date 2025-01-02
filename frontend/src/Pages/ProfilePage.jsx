import React from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ProfilePage = () => {

  const {authUser,updateProfile,isUpdatingProfile} = useAuthStore()

  const handleImageUpdate = async (e) => {
    const file = e.target.files[0]
    if(!file) return

    const reader = new FileReader()

    reader.onload = async () => {
      const base64Image = reader.result
      await updateProfile({profilePicture: base64Image})
    }

    
    reader.readAsDataURL(file)
  }

  return (
    <div className=' text-center bg-slate-600 w-80 max-w-2xl mx-auto '>
      <div>
        <h2 className="pt-4 text-2xl font-semibold text-white">Profile</h2>
        <p className="text-white-300 mt-2">Your Profile Information</p>
      </div>
      <div className="text-center mb-8 mt-4">
        <div className="relative inline-block">
         { 
            !isUpdatingProfile ?
              <div>
                <input
                type="file"
                id="file-input"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpdate}
                />
                <label htmlFor="file-input" className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer">
                  <svg fill="#000000" height="22px" width="22px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 60 60" xml:space="preserve" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M55.201,15.5h-8.524l-4-10H17.323l-4,10H12v-5H6v5H4.799C2.152,15.5,0,17.652,0,20.299v29.368 C0,52.332,2.168,54.5,4.833,54.5h50.334c2.665,0,4.833-2.168,4.833-4.833V20.299C60,17.652,57.848,15.5,55.201,15.5z M8,12.5h2v3H8 V12.5z M58,49.667c0,1.563-1.271,2.833-2.833,2.833H4.833C3.271,52.5,2,51.229,2,49.667V20.299C2,18.756,3.256,17.5,4.799,17.5H6h6 h2.677l4-10h22.646l4,10h9.878c1.543,0,2.799,1.256,2.799,2.799V49.667z"></path> <path d="M30,14.5c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S39.925,14.5,30,14.5z M30,48.5c-8.822,0-16-7.178-16-16 s7.178-16,16-16s16,7.178,16,16S38.822,48.5,30,48.5z"></path> <path d="M30,20.5c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S36.617,20.5,30,20.5z M30,42.5c-5.514,0-10-4.486-10-10 s4.486-10,10-10s10,4.486,10,10S35.514,42.5,30,42.5z"></path> <path d="M52,19.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S54.206,19.5,52,19.5z M52,25.5c-1.103,0-2-0.897-2-2s0.897-2,2-2 s2,0.897,2,2S53.103,25.5,52,25.5z"></path> </g> </g></svg>
                </label>
                <img
                  src={authUser.profilePicture || "user.png"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-500"
                />
              </div>
            :
              <div>               
                <span className="loading loading-ring w-32 h-32 rounded-full object-cover border-4 border-indigo-500"></span> 
              </div>
            
          }
        </div>
        <h2 className="mt-4 text-xl font-semibold text-white">{authUser.fullName}</h2>
        <p className="text-white-300">{authUser.email}</p>
      </div>
      <div className="bg-gray-700 p-4 w-80 rounded-lg">
        <h3 className="text-lg font-semibold text-white">Account Information</h3>
        <div className="flex justify-between mt-3">
          <span className="text-white-500">Member Since:</span>
          <span className="text-white-200">{authUser.createdAt?.split("T")[0]}</span>
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-white-500">Account Status:</span>
          <span className="text-green-400 font-bold">Active</span>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage