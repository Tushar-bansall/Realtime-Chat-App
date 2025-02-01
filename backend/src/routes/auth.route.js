import express from 'express'
import {signup,login,logout,updateProfile,checkAuth,updateBio,googleLogin, tokengenerate} from '../controllers/auth.controller.js'
import {protectRoute} from '../middleware/protectRoute.middleware.js'

const router = express.Router()

router.post('/signup',signup)

router.post('/login',login)

router.post('/logout',logout)

router.put("/updateProfile",protectRoute , updateProfile)
router.put("/updateBio",protectRoute , updateBio)

router.post("/google",googleLogin)
router.get("/check",protectRoute,checkAuth)
router.post("/generate-token",tokengenerate)



export default router