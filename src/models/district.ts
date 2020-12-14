import mongoose from "mongoose"

const Schema = mongoose.Schema

const districtSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    subscriptions: [
        {
            userId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: false
        }}
    ]
})

export default mongoose.model("District", districtSchema)