import mongoose from "mongoose";

const VoterSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  nama: {
    type: String,
    required: true,
  },
  nik: {
    type: String,
    required: true,
    unique: true,
  },
  tempatLahir: {
    type: String,
    required: true,
  },
  tanggalLahir: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  fingerprintId: {
    type: Number,
    required: true,
    unique: true,
  },
  faceId: {
    type: Number,
    required: true,
    unique: true,
  },
  isVoting: {
    type: Boolean,
    required: true,
  },
  role: {
    type: String,
    required: true,
  }
});

const VoterModel = mongoose.model("voters", VoterSchema);

export default VoterModel;
