import express, { Response, Request, NextFunction, } from "express"
import path from "path"
import mongoose from "mongoose"

const app = express()

const dist = require("./data/disctricts.json")

app.use(express.urlencoded(
    {
        extended: true, 
        type: "application/x-www-form-urlencoded"
    })) 
app.use(express.static(path.join(__dirname, "public")))

app.set("view engine", "ejs")
app.set("views", (path.join(__dirname, "views")))

// express.json()
import authRoutes from "./routes/auth"
app.use("/auth", authRoutes)

import userRoutes from "./routes/user"
app.use(userRoutes)

import adminRoutes from "./routes/admin"
app.use("/admin", adminRoutes)

app.get('/' ,(req: Request, res: Response, next: NextFunction) =>{
    res.render("main", {
        disctricts: dist.disctricts
    })
    res.end()
})

import {get404} from "./controllers/error"

app.use(get404)
mongoose
.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.qbmdu.mongodb.net/${process.env.MONGO_DEFAULT_DATABASE}?retryWrites=true&w=majority`, {useNewUrlParser: true, useUnifiedTopology: true})
.then(result => {
    console.log("Database connected")
    app.listen(process.env.PORT || 3000,() => {
        console.log(`Server listening on port ${process.env.PORT || 3000}`)
    })
})
.catch(err => {
    console.log(err)
})