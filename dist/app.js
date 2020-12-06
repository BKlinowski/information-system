"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const app = express_1.default();
const dist = require("./data/disctricts.json");
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.set("view engine", "ejs");
app.set("views", (path_1.default.join(__dirname, "views")));
// express.json()
const auth_1 = __importDefault(require("./routes/auth"));
app.use("/auth", auth_1.default);
const user_1 = __importDefault(require("./routes/user"));
app.use(user_1.default);
const admin_1 = __importDefault(require("./routes/admin"));
app.use("/admin", admin_1.default);
app.get('/', (req, res, next) => {
    res.render("main", {
        disctricts: dist.disctricts
    });
});
const error_1 = require("./controllers/error");
app.use(error_1.get404);
app.listen(3000);
