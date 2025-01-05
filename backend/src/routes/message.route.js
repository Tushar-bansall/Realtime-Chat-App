import express from "express"
import {protectRoute} from "../middleware/protectRoute.middleware.js"
import { getUsers, getMessages, sendMessage, messageReact } from "../controllers/message.controller.js"

const router = express.Router()

router.get("/users",protectRoute, getUsers)
router.get("/:id",protectRoute,getMessages)
router.post("/send/:id",protectRoute,sendMessage)
router.put("/messageReact",protectRoute,messageReact)

export default router