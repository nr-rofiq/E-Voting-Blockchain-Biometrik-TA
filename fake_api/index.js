import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

import WNIModel from "./models/WNI.js";

dotenv.config();
const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

// FAKE API
app.get("/", (req, res) => {
  res.json("Works!");
});

app.post("/api/nik", async (req, res) => {

  try {
    const { nik } = req.body;
    console.log(nik)
    const penduduk = await WNIModel.findOne({nik: nik})
    if (!penduduk) return res.json({ msg: "NIK does not exist." });

    res.status(200).json(penduduk);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

})

// app.get("/api/nik", async (req, res) => {
//   try {
//     // const { nik } = req.query.nik
//     const {nik} = req.body
//     console.log(nik)
//     const penduduk = await WNIModel.findOne({ nik: nik });
//     if (!penduduk) return res.json({ msg: "NIK does not exist." });

//     res.status(200).json(penduduk);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// const CONNECTION_URL = 'mongodb+srv://js_mastery:123123123@practice.jto9p.mongodb.net/test';
// const CONNECTION_URL = "mongodb://127.0.0.1:27017/elections";
const CONNECTION_URL = "mongodb://127.0.0.1:27017/fakeapi";
const PORT = process.env.PORT || 5005;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
