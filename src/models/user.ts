import mongoose, { mongo } from "mongoose"

const Schema = mongoose.Schema

const userSchema = new Schema({
    user: {
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    }
})

export default mongoose.model("User", userSchema)