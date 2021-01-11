import { Router } from "express";

import * as userController from "../controllers/user";

import userLoggedIn from "../middleware/userLoggedIn";

const router = Router();

router.get("/informations", userLoggedIn, userController.getInformations);

router.post("/subscribe", userLoggedIn, userController.postSubscribe);

router.post("/webPush", userController.postWebPush);

export default router;
