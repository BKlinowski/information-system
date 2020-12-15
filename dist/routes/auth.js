"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController = __importStar(require("../controllers/auth"));
const check_1 = require("express-validator/check");
const user_1 = __importDefault(require("../models/user"));
const router = express_1.Router();
router.get("/login", authController.getLogin);
router.get("/signup", authController.getSignup);
router.post("/signup", [
    check_1.body("email")
        .isEmail()
        .withMessage("Please enter a valid email address")
        .custom((value) => {
        user_1.default.exists({ email: value }).then((result) => {
            if (result)
                return Promise.reject("Email already exists. Pick a different one.");
        });
    })
        .normalizeEmail(),
    check_1.body("password")
        .isLength({
        min: 8,
    })
        .trim()
        .isAlphanumeric()
        .withMessage("Password has to be valid"),
    check_1.body("passwordConf")
        .isLength({
        min: 8,
    })
        .trim()
        .isAlphanumeric()
        .custom((value, { req }) => {
        console.log(value, req.body.password);
    })
        .withMessage("PasswordConf has to be valid"),
], authController.postSignup);
exports.default = router;
