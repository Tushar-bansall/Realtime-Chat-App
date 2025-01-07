import React from 'react'
import { useAuthStore } from '../store/useAuthStore'
import {Link} from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'

const LoginPage = () => {
  const [formData,setformData] = React.useState({
    email:"",
    password:""
  })
  
  const {login, isLoggingIn} = useAuthStore()

  const handleSubmit = (e) => {
    e.preventDefault()
    login(formData)
  }

  return (
    <div className=' grid md:grid-cols-2  h-[calc(100vh-10rem)] sm:h-[calc(100vh-5rem)] bg-[url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqMdddS5WoPOqsJvn26oVcmzAbH4v92XO87w&s)]'>
    {/* left side */}
      <div className='flex flex-col gap-4 bg-[url("https://png.pngtree.com/thumb_back/fh260/background/20220206/pngtree-emoji-of-social-media-or-chat-application-network-emoticon-background-image_985694.jpg")] bg-cover md:bg-none justify-center items-center'>
        <div className='w-full max-w-md text-center mb-5 flex flex-col items-center group gap-4'>
          <img src="logo.png" className='w-15 h-11 sm:w-22 sm:h-16'/>
          <h1 className='text-lg sm:text-2xl font-bold mt-2 text-orange-700'> Login</h1>
        </div>
        <form onSubmit={handleSubmit} className='space-y-6 w-[calc(100vw-5rem)] md:w-80 '> 
          <label className="input input-bordered flex items-center gap-2 ">
            <span className='label-text font-medium text-yellow-300'>Email</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input type="email" className="grow" placeholder="Email" value={formData.email} onChange = {(e) => 
              setformData({...formData,email:e.target.value})}         
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <span className='label-text font-medium text-yellow-300'>Password</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd" />
            </svg>
            <input type="password" className="grow" placeholder="Password" value={formData.password} onChange = {(e) => 
              setformData({...formData,password:e.target.value})}         
            />
          </label>
          { !isLoggingIn ? <button type='submit' className="btn btn-sm sm:btn-md btn-outline btn-success text-base w-full">Login</button>
              : <button className="btn w-full"><span className="loading loading-spinner"></span>loading</button>}
        </form>

        <div className='text-center ' style={{margin: 15}}>
          <p className='text-base-content/60 text-blue-800 md:text-blue-500 text-sm sm:text-base'>
              Create New Account?{" "}
              <Link to="/signup" className="link link-primary text-blue-800 md:text-blue-500"> Sign Up</Link>
          </p>

        </div>
      </div>
      
      {/* right side */}
        <AuthImagePattern 
        title="Welcome Back"
        subtitle="Sign in to continue your conversations and catch up with your messages and updates"
        />
    </div>

  )
}

export default LoginPage