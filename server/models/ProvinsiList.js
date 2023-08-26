import mongoose from "mongoose";

const ProvinsiListSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: String,
    required: true,
    unique: true,
  },
  kabkota: [
    {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: String,
        required: true,
        unique: true,
      },
    },
  ],
});

const ProvinsiListModel = mongoose.model("provinsilists", ProvinsiListSchema);

export default ProvinsiListModel;
