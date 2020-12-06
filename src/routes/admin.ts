import {Router} from "express"

import * as adminController from "../controllers/admin"

const router = Router()

router.get("/add-new-district", adminController.getAddDistrict)

router.get("/add-new-information", adminController.getAddNewInformation)

export default router