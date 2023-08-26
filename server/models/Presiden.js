import mongoose from "mongoose";

const PresidenSchema = new mongoose.Schema({
  no_urut: {
    type: Number,
    required: true,
  },
  nama_capres: {
    type: String,
    required: true,
  },
  nama_cawapres: {
    type: String,
    required: true,
  },
  nama_lengkap_capres: {
    type: String,
    required: true,
  },
  nama_lengkap_cawapres: {
    type: String,
    required: true,
  },
  visi: {
    type: String,
    required: true,
  },
  misi: {
    type: String,
    required: true,
  },
});

const PresidenModel = mongoose.model("presidens", PresidenSchema);

export default PresidenModel;
