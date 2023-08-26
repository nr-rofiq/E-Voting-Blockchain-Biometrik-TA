import mongoose from "mongoose";

const DPDSchema = new mongoose.Schema({
  id_ballot: {
    type: Number,
    required: true,
  },
  no_urut: {
    type: Number,
    required: true,
  },
  nama_kandidat: {
    type: String,
    required: true,
  },
  nama_lengkap_kandidat: {
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

const DPDModel = mongoose.model("dpds", DPDSchema);

export default DPDModel;
