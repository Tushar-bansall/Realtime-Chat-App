import React,{useEffect} from 'react'
import { useAuthStore } from '../store/useAuthStore'

const ProfilePage = () => {

  const {authUser, updateProfile,isUpdatingProfile,isUpdatingBio,updateBio} = useAuthStore()

  const [bio,setBio] =React.useState(authUser.bio)

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

  const handleBioUpdate = (e) => {
    if (e.key === "Enter") {
    updateBio({bio : bio})}
  }

  return (
    <div className=" bg-slate-200 flex items-center justify-center h-[calc(100vh-10rem)] sm:h-[calc(100vh-5rem)]">
    <div className="text-center bg-slate-300 w-80 max-w-4xl mx-auto pt-4">
      <div>
        <h2 className=" text-lg md:text-2xl font-bold text-indigo-600">Profile</h2>
      </div>
      <div className="text-center mb-4 mt-4">
        <div className="relative inline-block">
          {!isUpdatingProfile ? (
            <div>
              <input
                type="file"
                id="file-input"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpdate}
              />
              <label
                htmlFor="file-input"
                className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-md cursor-pointer"
              >
                <svg
                  fill="#000000"
                  className="w-4 h-4 md:w-6 md:h-6"
                  version="1.1"
                  id="Capa_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlns:xlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 60 60"
                  xml:space="preserve"
                  stroke="#000000"
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                  <g id="SVGRepo_iconCarrier">
                    <g>
                      <path d="M55.201,15.5h-8.524l-4-10H17.323l-4,10H12v-5H6v5H4.799C2.152,15.5,0,17.652,0,20.299v29.368 C0,52.332,2.168,54.5,4.833,54.5h50.334c2.665,0,4.833-2.168,4.833-4.833V20.299C60,17.652,57.848,15.5,55.201,15.5z M8,12.5h2v3H8 V12.5z M58,49.667c0,1.563-1.271,2.833-2.833,2.833H4.833C3.271,52.5,2,51.229,2,49.667V20.299C2,18.756,3.256,17.5,4.799,17.5H6h6 h2.677l4-10h22.646l4,10h9.878c1.543,0,2.799,1.256,2.799,2.799V49.667z"></path>
                      <path d="M30,14.5c-9.925,0-18,8.075-18,18s8.075,18,18,18s18-8.075,18-18S39.925,14.5,30,14.5z M30,48.5c-8.822,0-16-7.178-16-16 s7.178-16,16-16s16,7.178,16,16S38.822,48.5,30,48.5z"></path>
                      <path d="M30,20.5c-6.617,0-12,5.383-12,12s5.383,12,12,12s12-5.383,12-12S36.617,20.5,30,20.5z M30,42.5c-5.514,0-10-4.486-10-10 s4.486-10,10-10s10,4.486,10,10S35.514,42.5,30,42.5z"></path>
                      <path d="M52,19.5c-2.206,0-4,1.794-4,4s1.794,4,4,4s4-1.794,4-4S54.206,19.5,52,19.5z M52,25.5c-1.103,0-2-0.897-2-2s0.897-2,2-2 s2,0.897,2,2S53.103,25.5,52,25.5z"></path>
                    </g>
                  </g>
                </svg>
              </label>
              <img
                src={authUser.profilePicture || "user.png"}
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-500"
              />
            </div>
          ) : (
            <div>
              <span className="loading loading-ring w-20 h-20 md:w-32 md:h-32 rounded-full object-cover border-4 border-indigo-500"></span>
            </div>
          )}
        </div>
        <form className="space-y-6 w-72 p-6 mx-auto">
          <label className="input input-bordered flex items-center gap-1">
            <span className="label-text font-medium text-nowrap text-yellow-300">Full Name</span>
  
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z"
              />
            </svg>
            <input
              disabled
              type="text"
              className="grow"
              value={authUser.fullName}
            />
          </label>
          <label className="input input-bordered flex items-center gap-1">
            <span className="label-text font-medium text-yellow-300">Email</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            <input
              disabled
              type="email"
              className="grow"
              value={authUser.email}
            />
          </label>
          <label className="input input-bordered flex items-center gap-1">
            <span className="label-text font-medium text-yellow-300">Bio</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z"
              />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z"
              />
            </svg>
            {isUpdatingBio ? (
              <input type="text" value="Loading..." />
            ) : (
              <input
                type="text"
                className="grow"
                placeholder="Enter your bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                onKeyDown={handleBioUpdate}
              />
            )}
          </label>
        </form>
      </div>
    </div>
  </div>
  
  )
}

export default ProfilePage