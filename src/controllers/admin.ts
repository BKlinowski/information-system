import {RequestHandler} from "express"

export const getAddDistrict: RequestHandler = (req, res, next) => {
    res.render("admin/addDistrict")
}

export const getAddNewInformation: RequestHandler = (req, res, next) => {
    res.render("admin/addInformation")
}