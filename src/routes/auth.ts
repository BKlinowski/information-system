import {Router} from "express"

import * as authController from "../controllers/auth"

const router = Router()

router.get("/login", authController.getLogin)

router.get("/signup", authController.getSignup)

export default router