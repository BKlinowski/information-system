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
      .notEmpty()
      .withMessage("Name can't be empty")
      .isAlphanumeric("pl-PL")
      .withMessage("Name must consist of alphanumeric characters only!")
      .trim(),
    body("imageURL")
      .notEmpty()
      .withMessage("Url can't be empty")
      .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
      })
      .withMessage("imageURL must be URL!"),
  ],
  adminController.postAddDistrict
);

router.post(
  "/addInformation",
  adminLoggedIn,
  [
    body("title")
      .notEmpty()
      .withMessage("Title can't be empty")
      .isAlphanumeric("pl-PL")
      .withMessage("Title must consist of ascii characters only!"),
    body("description")
      .notEmpty()
      .withMessage("Description can't be empty")
      // .isAlphanumeric("pl-PL")
      .withMessage("Description must consist of ascii characters only!"),
    body("importance")
      .notEmpty()
      .withMessage("Importance can't be empty")
      .isInt({ min: 1, max: 3 })
      .withMessage("The range of importance must be 1 to 3"),
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

  adminController.postAddInformation
);

router.get("/edit-districts", adminController.getEditDistricts);

router.get("/edit-informations", adminController.getEditInformations);

router.post(
  "/editDistrict",
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
  adminController.postEditDistrict
);

router.post(
  "/editInformation",
  adminLoggedIn,
  [
    body("title")
      .notEmpty()
      .withMessage("Title can't be empty")
      .isAlphanumeric("pl-PL")
      .withMessage("Title must consist of ascii characters only!"),
    body("description")
      .notEmpty()
      .withMessage("Description can't be empty")
      // .isAlphanumeric("pl-PL")
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
  adminController.postEditInformation
);

router.post(
  "/deleteDistrict",
  adminLoggedIn,
  adminController.postDeleteDistrict
);

router.post(
  "/deleteInformation",
  adminLoggedIn,
  adminController.postDeleteInformation
);

export default router;
