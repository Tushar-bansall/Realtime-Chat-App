import React from 'react'
import {useAuthStore} from "../store/useAuthStore"
import {Link} from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const [formData,setformData] = React.useState({
    fullName: "",
    email: "",
    password: ""
  });

  const {signup, isSigningUp} = useAuthStore()

  const ValidateForm = () => {
    if(!formData.fullName.trim()) return toast.error("Full name is required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!formData.password) return toast.error("Password is required");
    if(formData.password.length <6) return toast.error("Password must be atleast 6 characters");

    return true;
  } 

  const handleSubmit = (e) => {
    e.preventDefault()

    const isValid = ValidateForm()

    if(isValid===true) signup(formData)
  }

  return (
    <div className=' grid lg:grid-cols-2 '>
    {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md text-center mb-5 flex flex-col items-center group'>
          <img src="logo.png" height="140px" width="140px"/>
          <h1 className='text-2xl font-bold mt-2'> Create Account</h1>
        </div>
      <form onSubmit={handleSubmit} className='space-y-6 '> 

        <label className="input input-bordered flex items-center gap-2">
          <span className='label-text font-medium text-yellow-300'>Full Name</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" placeholder="Username" value={formData.fullName} onChange = {(e) => 
            setformData({...formData,fullName:e.target.value})}         
          />
        </label>
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
        { !isSigningUp ? <button type='submit' className="btn btn-md btn-outline btn-success w-full" >SignUp</button>
            : <button className="btn w-full"><span className="loading loading-spinner"></span>loading</button>}
      </form>

      <div className='text-center ' style={{margin: 15}}>
        <p className='text-base-content/60 text-blue-500'>
            Already Have an Account?{" "}
            <Link to="/login" className="link link-primary text-blue-500"> Sign In</Link>
        </p>

      </div>
      </div>
    {/* right side */}
    <AuthImagePattern 
      title="Join our Community"
      subtitle="Connect with friends, share moments, and stay in touch with your loved ones"
    />
    </div>
  )
}

export default SignupPage