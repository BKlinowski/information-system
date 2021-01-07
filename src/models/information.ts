import mongoose from "mongoose";

const Schema = mongoose.Schema;

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

export interface InformationDoc extends mongoose.Document {
  title: string;
  description: string;
  importance: number;
  imageURL: string;
  districtId: mongoose.Types.ObjectId;
}

export default mongoose.model<InformationDoc>("Information", informationSchema);
