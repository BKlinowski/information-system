import { Router, Request } from "express";

import * as authController from "../controllers/auth";

import { body } from "express-validator/check";

import User from "../models/user";

const router = Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email address")
      .custom((value) => {
        User.exists({ email: value }).then((result) => {
          if (result)
            return Promise.reject(
              "Email already exists. Pick a different one."
            );
        });
      })
      .normalizeEmail(),
    body("password")
      .isLength({
        min: 8,
      })
      .trim()
      .isAlphanumeric()
      .withMessage("Password has to be valid"),
    body("passwordConf")
      .isLength({
        min: 8,
      })
      .trim()
      .isAlphanumeric()
      .custom((value, { req }) => {
        console.log(value, req.body.password);
      })
      .withMessage("PasswordConf has to be valid"),
  ],
  authController.postSignup
);

export default router;
