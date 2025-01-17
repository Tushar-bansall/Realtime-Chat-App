import express from 'express'
import {signup,login,logout,updateProfile,checkAuth,updateBio} from '../controllers/auth.controller.js'
import {protectRoute} from '../middleware/protectRoute.middleware.js'

const router = express.Router()

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.put("/updateProfile",protectRoute , updateProfile)
router.put("/updateBio",protectRoute , updateBio)

router.get("/check",protectRoute,checkAuth)



export default router