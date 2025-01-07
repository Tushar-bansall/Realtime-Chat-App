import express from "express"
import {protectRoute} from "../middleware/protectRoute.middleware.js"
import { getUsers, getMessages, sendMessage, messageReact, getFriends ,addFriend,removeFriend} from "../controllers/message.controller.js"

const router = express.Router()

router.get("/users",protectRoute, getUsers)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)
router.put("/messageReact",protectRoute,messageReact)
router.get("/friends",protectRoute,getFriends)

router.put('/:id/addFriend',protectRoute,addFriend)
router.put('/:id/removeFriend',protectRoute,removeFriend)

export default router