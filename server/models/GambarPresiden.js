import mongoose from "mongoose";

const GambarPresidenSchema = new mongoose.Schema({
  no_urut: Number,
  filename: String,
  originalName: String,
});

const GambarPresidenModel = mongoose.model("imagepresidens", GambarPresidenSchema);

export default GambarPresidenModel;
