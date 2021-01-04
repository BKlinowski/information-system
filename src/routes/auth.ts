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
        return User.exists({ email: value }).then((result) => {
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
      .withMessage("Password must be 8 characters length")
      .trim()
      .isAlphanumeric()
      .withMessage("Password must consist of alphanumeric characters"),
    body("passwordConf")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords have to match");
        }
        return true;
      }),
  ],
  authController.postSignup
);

router.post(
  "/login",
  [
    body("email")
      .isEmail()
      .withMessage("Email or password invalid")
      .normalizeEmail(),
    body("password")
      .isLength({
        min: 8,
      })
      .trim()
      .isAlphanumeric()
      .withMessage("Email or password invalid"),
  ],
  authController.postLogin
);

export default router;
