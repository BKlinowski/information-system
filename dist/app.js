"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", (path_1.default.join(__dirname, "views")));
// express.json()
app.use('/', (req, res, next) => {
    res.render("main");
});
app.listen(3000);
