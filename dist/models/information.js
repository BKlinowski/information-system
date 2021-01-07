"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const informationSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    importance: {
        type: Number,
        required: true,
    },
    imageURL: {
        type: String,
        required: true,
    },
    districtId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
});
exports.default = mongoose_1.default.model("Information", informationSchema);
