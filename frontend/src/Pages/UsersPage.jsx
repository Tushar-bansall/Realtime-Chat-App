import React, { useEffect } from 'react'
import { useChatStore } from '../store/useChatStore'
import { useAuthStore } from '../store/useAuthStore'
import FriendsProfile from '../components/friendsProfile.jsx'

const UsersPage = () => {
  const {authUser} = useAuthStore()
  const {addFriend,users,getUsers} = useChatStore()
  const [selected,setSelected] = React.useState(null)

  useEffect(() =>
  {getUsers()}
  ,[getUsers])

  return (
    <div className='grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 justify-items-center bg-gray-800 py-10 '>
      {users.map((user) => {
        if (user._id !== authUser._id) {
          return (
            <>
              <div key={user._id} onClick={()=>{setSelected(user);document.getElementById('my_modal_2').showModal()}} className="card bg-base-200/40 w-fit shadow-xl sm:px-5 pt-5 mb-5 cursor-pointer">
                <figure>
                  <img
                    src={user.profilePicture}
                    alt={user.fullName}
                    className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center">
                  <p className="font-semibold text-sm md:text-md">{user.fullName}</p>
                  
                </div>
              </div>
              {/* Open the modal using document.getElementById('ID').showModal() method */}
              {selected && 
              <dialog id="my_modal_2" className="modal modal-bottom md:modal-middle ">
                <div className="modal-box bg-base-200/50">
                  <div className='p-4 flex flex-col backdrop-blur-sm items-center justify-center w-full'>
                    <div className="p-6 w-fit max-w-2xl flex flex-col gap-3 justify-center items-center">
                          <img
                          src={selected.profilePicture || "user.png"}
                          alt="Profile"
                          className="w-24 h-24  md:w-32 md:h-32 rounded-full object-cover border-4 border-slate-300"
                          />
                          <h2 className="mt-4 text-lg md:text-xl font-bold text-slate-100">{selected.fullName}</h2>
                          <p className=" text-md md:text-lg font-bold text-slate-100">{selected.bio}</p>
                          <div className='flex items-center justify-center gap-6'>
                              <button className='btn btn-sm btn-circle btn-outline btn-success ' onClick={()=>addFriend(selected._id)}>
                                <svg className='w-5 h-5' fill="#FFFFFF" viewBox="0 0 256 256" id="Flat" xmlns="http://www.w3.org/2000/svg" stroke="#FFFFFF"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M252,136a4.0002,4.0002,0,0,1-4,4H228v20a4,4,0,0,1-8,0V140H200a4,4,0,0,1,0-8h20V112a4,4,0,0,1,8,0v20h20A4.0002,4.0002,0,0,1,252,136Zm-55.145,61.42578a3.99975,3.99975,0,1,1-6.125,5.14551,108.00719,108.00719,0,0,0-165.45947,0,3.9999,3.9999,0,0,1-6.125-5.146A115.828,115.828,0,0,1,82.7041,158.77777a63.99993,63.99993,0,1,1,50.5918.00006A115.832,115.832,0,0,1,196.855,197.42578ZM108,156a56,56,0,1,0-56-56A56.06353,56.06353,0,0,0,108,156Z"></path> </g></svg>
                              </button>
                          </div>
                      </div>
                    </div>
                 </div> 
                <form method="dialog" className="modal-backdrop">
                  <button>close</button>
                </form>
                
              </dialog>}
            </>
          );
        }
        return <></>; 
      })}

    </div>
  )
}

export default UsersPage