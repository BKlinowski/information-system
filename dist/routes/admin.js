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
const adminController = __importStar(require("../controllers/admin"));
const adminLoggedIn_1 = __importDefault(require("../middleware/adminLoggedIn"));
const check_1 = require("express-validator/check");
const router = express_1.Router();
router.get("/add-new-district", adminLoggedIn_1.default, adminController.getAddDistrict);
router.get("/add-new-information", adminLoggedIn_1.default, adminController.getAddNewInformation);
router.post("/addDistrict", adminLoggedIn_1.default, [
    check_1.body("name")
        .notEmpty()
        .withMessage("Name can't be empty")
        .isAlphanumeric("pl-PL")
        .withMessage("Name must consist of alphanumeric characters only!")
        .trim(),
    check_1.body("imageURL")
        .notEmpty()
        .withMessage("Url can't be empty")
        .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
    })
        .withMessage("imageURL must be URL!"),
], adminController.postAddDistrict);
router.post("/addInformation", adminLoggedIn_1.default, [
    check_1.body("title")
        .notEmpty()
        .withMessage("Title can't be empty")
        .isAlphanumeric("pl-PL")
        .withMessage("Title must consist of ascii characters only!"),
    check_1.body("description")
        .notEmpty()
        .withMessage("Description can't be empty")
        // .isAlphanumeric("pl-PL")
        .withMessage("Description must consist of ascii characters only!"),
    check_1.body("importance")
        .notEmpty()
        .withMessage("Importance can't be empty")
        .isInt({ min: 1, max: 3 })
        .withMessage("The range of importance must be 1 to 3"),
    check_1.body("imageURL")
        .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
    })
        .withMessage("It must be URL!"),
    check_1.body("district")
        .notEmpty()
        .withMessage("District can't be empty")
        .isAlphanumeric("pl-PL")
        .withMessage("District must consist of ascii characters only!"),
], adminController.postAddInformation);
router.get("/edit-districts", adminController.getEditDistricts);
router.get("/edit-informations", adminController.getEditInformations);
router.post("/editDistrict", adminLoggedIn_1.default, [
    check_1.body("name")
        .isAlphanumeric("pl-PL")
        .withMessage("Name must consist of alphanumeric characters only!")
        .trim(),
    check_1.body("imageURL")
        .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
    })
        .withMessage("It must be URL!"),
], adminController.postEditDistrict);
router.post("/editInformation", adminLoggedIn_1.default, [
    check_1.body("title")
        .notEmpty()
        .withMessage("Title can't be empty")
        .isAlphanumeric("pl-PL")
        .withMessage("Title must consist of ascii characters only!"),
    check_1.body("description")
        .notEmpty()
        .withMessage("Description can't be empty")
        // .isAlphanumeric("pl-PL")
        .withMessage("Description must consist of ascii characters only!"),
    check_1.body("importance")
        .notEmpty()
        .withMessage("Importance can't be empty")
        .isInt({ min: 1, max: 3 })
        .withMessage("The range must be 1 to 3"),
    check_1.body("imageURL")
        .isURL({
        protocols: ["http", "https"],
        require_protocol: true,
    })
        .withMessage("It must be URL!"),
    check_1.body("district")
        .notEmpty()
        .withMessage("District can't be empty")
        .isAlphanumeric("pl-PL")
        .withMessage("District must consist of ascii characters only!"),
], adminController.postEditInformation);
router.post("/deleteDistrict", adminLoggedIn_1.default, adminController.postDeleteDistrict);
router.post("/deleteInformation", adminLoggedIn_1.default, adminController.postDeleteInformation);
exports.default = router;
