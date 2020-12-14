import mongoose, { mongo } from "mongoose"

const Schema = mongoose.Schema

const informationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    importance: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    districts: [
        {
        userId: {
            type: String,
            required: true,
            ref: "User"
        }
        }
    ]
})

export default mongoose.model("Information", informationSchema)