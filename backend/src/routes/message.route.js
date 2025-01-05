import express from "express"
import {protectRoute} from "../middleware/protectRoute.middleware.js"
import { getUsers, getMessages, sendMessage, messageReact, getFriends } from "../controllers/message.controller.js"

const router = express.Router()

router.get("/users",protectRoute, getUsers)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)
router.put("/messageReact",protectRoute,messageReact)
router.get("/:id/friends",getFriends)

export default router