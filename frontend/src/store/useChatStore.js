import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set,get) => ({
    messages: [],
    users: [],
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
    setSelectedUser : (selectedUser) => set({selectedUser})
}))