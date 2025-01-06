import { create } from "zustand";
import {axiosInstance } from "../lib/axios.js"
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const BASE_URL = import.meta.env.MODE ==='development' ? "http://localhost:8000" : "/"

export const useAuthStore = create( (set,get) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isUpdatingBio : false,
    isCheckingAuth : true,
    onlineUsers: [],
    socket: null,
    
    checkAuth : async() => {
        try {
            const res = await axiosInstance.get("/api/auth/check");
            set({authUser: res.data})
            get().connectSocket()
        } catch (error) {
            console.log("Error in checkAuth", error.message);
            set({authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    },
    signup : async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/api/auth/signup",data);
            set({authUser:res.data})
            toast.success("Account Created successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isSigningUp : false})
        }
    },
    logout : async () => {
        try {
            await axiosInstance.post("api/auth/logout")
            set({authUser:null})
            toast.success("Logged out successfully")
            get().disconnectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        }
    },
    login : async (data) =>{
        set({isLoggingIn: true})
        try {          
            const res = await axiosInstance.post("/api/auth/login",data)
            set({authUser:res.data})            
            toast.success("Logged In Successfully")
            get().connectSocket()
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isLoggingIn : false})
        }
    },
    updateProfile : async (data) => {
        set({isUpdatingProfile: true})
        try {
            const res= await axiosInstance.put("api/auth/updateProfile",data)
            set({authUser : res.data})
            toast.success("Profile picture successfully updated")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUpdatingProfile: false})
        }
    },
    updateBio : async (data) => {
        set({isUpdatingBio: true})
        try {
            const res= await axiosInstance.put("api/auth/updateBio",data)
            set({authUser : res.data})
            toast.success("Bio successfully updated")
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            set({isUpdatingBio: false})
        }
    },
    connectSocket: () => {
        const {authUser} = get()
        if(!authUser || get().socket?.connected)
            return

        const socket = io(BASE_URL,{
            query: {
                userId : authUser._id
            }
        })
        socket.connect()
        set({socket : socket})

        socket.on("getOnlineUsers", (userIds) =>{
            set({onlineUsers : userIds})
        })
    },
    disconnectSocket: () => {
        if(get().socket?.connected)
        {
            get().socket.disconnect()
        }
    }
}))