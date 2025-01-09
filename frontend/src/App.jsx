import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import SettingsPage from "./Pages/SettingsPage";
import ProfilePage from "./Pages/ProfilePage";
import HomePage from "./Pages/HomePage";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast"
import { useThemeStore } from "./store/useThemeStore";
import BottomNavbar from "./components/bottomNavbar";
import UsersPage from "./Pages/UsersPage";

const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()


  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  const {theme} = useThemeStore()

  if(isCheckingAuth && !authUser) 
    return (
    <div className=" flex items-center justify-center h-screen">
        <span className="loading loading-dots loading-md"> </span>
    </div>
    );

  
  return(
    <div data-theme={theme} >
      <Navbar />
      <Routes>
        <Route path="/" element={ authUser ? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/login" element={authUser ?  <Navigate to="/"/> : <LoginPage /> } />
        <Route path="/profile" element={ authUser ? <ProfilePage /> : <Navigate to="/login"/>} />
        <Route path="/users" element={ authUser ? <UsersPage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={ authUser ?  <Navigate to="/"/> : <SignupPage /> } />
        <Route path="/settings" element={ <SettingsPage />} />
      </Routes>
      <BottomNavbar />
      <Toaster />
    </div>
  )
}

export default App;