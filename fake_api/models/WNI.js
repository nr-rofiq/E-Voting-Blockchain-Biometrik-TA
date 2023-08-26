import mongoose from "mongoose";

// _id, nama, nik, tempatLahir, tanggalLahir, gender
const WNISchema = new mongoose.Schema({
    nama: {
        type: String,
        required: true
    },
    nik: {
        type: String,
        required: true,
        unique: true
    },
    tempatLahir: {
        type: String,
        required: true
    },
    tanggalLahir: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    alamat: {
        type: String,
        required: true
    }
})

const WNIModel = mongoose.model("wnis", WNISchema);

export default WNIModel