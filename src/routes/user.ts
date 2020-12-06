import {Router} from "express"

import * as userController from "../controllers/user"

const router = Router()

router.get("/informations", userController.getInformations)

export default router