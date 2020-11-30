"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
express_1.default.json();
app.get('/', (req, res, next) => {
    res.write("<p>Working!</p>");
    res.end();
});
app.listen(3000);
