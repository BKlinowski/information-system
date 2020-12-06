import {RequestHandler} from "express"
const info = require("../data/information.json")

export const getInformations: RequestHandler = (req, res, next) => {
    res.render("user/information", {
        info: info.information
    })
}