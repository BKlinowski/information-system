import { Router } from "express";

import * as adminController from "../controllers/admin";

import adminLoggedIn from "../middleware/adminLoggedIn";

import { body } from "express-validator/check";

const router = Router();

router.get("/add-new-district", adminLoggedIn, adminController.getAddDistrict);

router.get(
  "/add-new-information",
  adminLoggedIn,
  adminController.getAddNewInformation
);

router.post(
  "/addDistrict",
  adminLoggedIn,
  [
    body("name")
      .isAlphanumeric("pl-PL")
      .withMessage("Name must consist of alphanumeric characters only!")
      .trim(),
    body("imageURL")
      .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
      })
      .withMessage("It must be URL!"),
  ],
  adminController.postAddDistrict
);

router.post(
  "/addInformation",
  [
    body("title")
      .notEmpty()
      .withMessage("Title can't be empty")
      .isAscii()
      .withMessage("Title must consist of ascii characters only!"),
    body("description")
      .notEmpty()
      .withMessage("Description can't be empty")
      .isAscii()
      .withMessage("Description must consist of ascii characters only!"),
    body("importance")
      .notEmpty()
      .withMessage("Importance can't be empty")
      .isInt({ min: 1, max: 3 })
      .withMessage("The range must be 1 to 3"),
    body("imageURL")
      .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
      })
      .withMessage("It must be URL!"),
    body("district")
      .notEmpty()
      .withMessage("District can't be empty")
      .isAlphanumeric("pl-PL")
      .withMessage("District must consist of ascii characters only!"),
  ],
  adminLoggedIn,
  adminController.postAddInformation
);

export default router;
