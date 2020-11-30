import express, {RequestHandler, Response, Request, NextFunction} from "express"

const app = express()

express.json()

app.get('/' ,(req: Request, res: Response, next: NextFunction) =>{
    res.write("<p>Working!</p>")
    res.end()
})

app.listen(3000)