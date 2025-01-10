import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
    friends: [],
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,

    getUsers: async() => {
        set({isUsersLoading:true})
        try {
            const res= await axiosInstance.get("api/messages/users")
            set({users:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUsersLoading:false})
        }
    },

    getMessages: async(userId) => {
        set({isMessagesLoading:true})
        try {
            const res= await axiosInstance.get(`api/messages/${userId}`)
            set({messages:res.data})
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isMessagesLoading:false})
        }
    },

    sendMessage: async (data) => {
        const {selectedUser,messages} = get()
        try {
            const res = await axiosInstance.post(`api/messages/send/${selectedUser._id}`,data)
            set({messages:[...messages,res.data]})
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },

    subscribeToMessages: () => {
        const {selectedUser} = get()
        const socket = useAuthStore.getState().socket

        socket.on("newMessage",(newMessage) => {
            toast(`New Notification \n ${newMessage.text ? newMessage.text : "Image" }\n few seconds ago`,
                {
                  icon: '🥳',
                  style: {
                    borderRadius: '10px',
                    background: '#01569e',
                    color: '#fff'
                  },
                    duration: 1200,
                }
              );
            if(newMessage.senderid !== selectedUser._id) return
            set({messages: [...get().messages,newMessage]})
        });
    },
    unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket
        socket.off("newMessage")
    },
    subscribeToReactions: () => {
        const socket = useAuthStore.getState().socket

        socket.on("newReaction",(newMessage) => {
              const {messages}= get()
              const newmessages = messages.map((message)=>{
                  return message._id === newMessage._id ? newMessage : message
                  }) 
              set({messages : newmessages})
        });
    },
    unsubscribeFromReactions: () => {
        const socket = useAuthStore.getState().socket
        socket.off("newReaction")
    },
    sendReaction : async (data) => {
        try {
            const res = await axiosInstance.put('api/messages/messageReact',data)
            const {messages}= get()
            const newmessages = messages.map((message)=>{
                return message._id === res.data.message_id ? res.data : message
                }) 
            set({messages : newmessages})
        } catch (error) {
            console.log("Error in sendReaction",error)
        }
        
    },
    getFriends : async () => {
        const authUser= useAuthStore.getState().authUser
        set({isUsersLoading:true})
        try {
            const res= await axiosInstance.get(`api/messages/friends/${authUser._id}`)
            set({ friends: res.data });
        } catch (error) {
            console.log(error)
        } finally {
            set({isUsersLoading:false})
        }
    },
    addFriend : async (data) => {
        try {
            document.getElementById('my_modal_2').close()
            
            const res= await axiosInstance.put(`api/messages/addFriend/${data}`)
            toast.success("Friend added successfully")
            set({ friends: res.data });
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    removeFriend : async (data) => {
        try {
            document.getElementById('my_modal_1').close()
            get().setSelectedUser(null)
            const res= await axiosInstance.put(`api/messages/removeFriend/${data}`)
            toast.success("Friend removed successfully")
            set({ friends: res.data });
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    setSelectedUser : (selectedUser) => set({selectedUser}),
}))