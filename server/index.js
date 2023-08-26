import express from "express";
// import parseurl from "parseurl";
// import bodyParser from "body-parser";
// import path from "path";
import cors from "cors";
// import expressValidator from "express-validator";
import md5 from "md5";
import mongoose from "mongoose";
import dotenv from "dotenv";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import ElectionModel from "./models/Election.js";
import VoterModel from "./models/Voter.js";
import AdminModel from "./models/Admin.js";
import CommitteeModel from "./models/Committee.js";
import ProvinsiListModel from "./models/ProvinsiList.js";
import BallotModel from "./models/Ballot.js";
import PresidenModel from "./models/Presiden.js";
import DPDModel from "./models/DPD.js";
import DPRModel from "./models/DPR.js";

import GambarPresidenModel from "./models/GambarPresiden.js";
// import electionName from './models/electionName'
// import admin from './models/admin'

// COUNTERS
import CommitteeAIModel from "./models/counter/CommitteeAI.js";
import VoterAIModel from "./models/counter/VoterAI.js";
import BallotAIModel from "./models/counter/BallotAI.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
// app.use(express.urlencoded());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/kandidat/gambar", upload.single("image"), async (req, res) => {

  const saveImage = new GambarPresidenModel({
    no_urut: req.query.no_urut,
    filename: req.file.filename,
    originalName: req.file.originalname,
  });

  try {
    await saveImage.save();
    res.json({ message: "Image uploaded successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while uploading the image");
  }
});

app.use(express.static(path.join(__dirname, "uploads")));

app.get("/images/presiden", async (req, res) => {
  try {
    const images = await GambarPresidenModel.find();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred while fetching images");
  }
});

app.get("/", async (req, res) => {
  const allData = await imageModel.find();
  res.json(allData);
});

//routes routes

// app.get("/", (req, res) => {
//   res.json("Works!");
// });

app.get("/api/electionName", function (req, res) {
  let electionNames = [];
  let electionOrganizers = [];
  let electionIds = [];
  let final = [];
  ElectionModel.find({}).then((eachOne) => {
    for (i = 0; i < eachOne.length; i++) {
      electionNames[i] = eachOne[i].election_name;
      electionOrganizers[i] = eachOne[i].election_organizer;
      electionIds[i] = eachOne[i].election_id;
      final.push({
        election_id: eachOne[i].election_id,
        election_organizer: eachOne[i].election_organizer,
        election_name: eachOne[i].election_name,
      });
    }
    res.send(final);
  });
});

app.post("/api/electionName", async function (req, res) {
  ElectionModel.create({
    election_id: Math.floor(Math.random() * 100),
    election_name: req.body.election_name,
    election_organizer: req.body.election_organizer,
    election_password: md5(req.body.election_password),
  }).then((election) => {
    res.json(election);
  });
});

// USED
app.get("/voters", async (req, res) => {
  try {
    const getVoters = await VoterModel.find();
    res.status(200).json(getVoters);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/committees", async (req, res) => {
  try {
    const getCommittees = await CommitteeModel.find();
    res.status(200).json(getCommittees);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/provinsiList", async (req, res) => {
  try {
    const getProvinsiList = await ProvinsiListModel.find();
    res.status(200).json(getProvinsiList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/ballots", async (req, res) => {
  try {
    const getBallots = await BallotModel.find();
    res.status(200).json(getBallots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/ballot", async (req, res) => {
  const id = req.query.id;

  try {
    const getBallot = await BallotModel.find({ id: id });
    res.status(200).json(getBallot);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// USED
app.post("/login/admin", async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await AdminModel.findOne({
      username: username,
      password: password,
    });
    if (!admin) return res.json({ msg: "username atau password salah" });

    // if (role === "admin") {
    //   const isMatch = await bcrypt.compare(password, admin.password);
    //   if (!isMatch)
    //     return res.status(400).json({ msg: "Invalid credentials. " });
    // }

    // const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET);
    delete admin.password;
    res.status(200).json({ admin, msg: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }

  // VoterModel.findOne({ email: email }).then((user) => {
  //   if (user) {
  //     if (password === user.password) {
  //       res.send({ message: "success", role: user.role });
  //     } else {
  //       res.send({ message: "wrong credentials" });
  //     }
  //   } else {
  //     res.send("not register");
  //   }
  // });
});

app.post("/login/committee", async (req, res) => {
  try {
    const { username, password } = req.body;
    const committee = await CommitteeModel.findOne({
      username: username,
      password: password,
    });
    if (!committee) return res.json({ msg: "username atau password salah" });

    delete committee.password;
    res.status(200).json({ committee, msg: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// USED
app.post("/ballots/add", async (req, res) => {
  const { pemilihan, provinsi, kabkota } = req.body;

  try {
    const checkBallot = await BallotModel.findOne({
      pemilihan: pemilihan,
      provinsi: provinsi,
      kabkota: kabkota,
    });
    if (checkBallot) return res.json({ msg: "pemilihan telah tersedia." });

    const result = await BallotAIModel.findOneAndUpdate(
      { id: "autoval" },
      { $inc: { seq: 1 } },
      { new: true }
    );

    let seqId;
    if (!result) {
      const newval = new BallotAIModel({ id: "autoval", seq: 1 });
      await newval.save();
      seqId = 1;
    } else {
      seqId = result.seq;
    }

    const ballot = new BallotModel({
      id: seqId,
      pemilihan,
      provinsi,
      kabkota,
    });

    await ballot.save();

    res.send({ ballot, msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
});

app.post("/kandidat/presiden", async (req, res) => {
  const {
    no_urut,
    nama_capres,
    nama_cawapres,
    nama_lengkap_capres,
    nama_lengkap_cawapres,
    visi,
    misi,
  } = req.body;

  try {
    const checkNoUrut = await PresidenModel.findOne({ no_urut: no_urut });
    if (checkNoUrut)
      return res.json({ msg: `Kandidat no urut ${no_urut} telah tersedia.` });

    const data = new PresidenModel({
      no_urut,
      nama_capres,
      nama_cawapres,
      nama_lengkap_capres,
      nama_lengkap_cawapres,
      visi,
      misi,
    });

    await data.save();

    res.send({ data, msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
});

app.get("/kandidat/presiden", async (req, res) => {
  try {
    const getKandidatPresiden = await PresidenModel.find();
    res.status(200).json(getKandidatPresiden);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// USED
app.post("/register/committee", async (req, res) => {
  const { username, provinsi, password } = req.body;

  try {
    const checkUser = await CommitteeModel.findOne({ username: username });
    if (checkUser) return res.json({ msg: "user telah tersedia." });

    const checkProvinsi = await CommitteeModel.findOne({ provinsi: provinsi });
    if (checkProvinsi) return res.json({ msg: "provinsi telah dipilih." });

    const result = await CommitteeAIModel.findOneAndUpdate(
      { id: "autoval" },
      { $inc: { seq: 1 } },
      { new: true }
    );

    let seqId;
    if (!result) {
      const newval = new CommitteeAIModel({ id: "autoval", seq: 1 });
      await newval.save();
      seqId = 1;
    } else {
      seqId = result.seq;
    }

    const data = new CommitteeModel({
      id: seqId,
      username,
      provinsi,
      password,
      role: 'committee'
    });

    await data.save();

    res.send({ data, msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }
});

// USED
app.post("/register/voter", async (req, res) => {
  const { nama, nik, tempatLahir, tanggalLahir, gender, alamat } = req.body;

  // const salt = await bcrypt.genSalt();
  // const passwordHash = await bcrypt.hash(password, salt);

  try {
    const checkNIK = await VoterModel.findOne({ nik: nik });
    if (checkNIK) return res.json({ msg: "nik telah tersedia." });

    const result = await VoterAIModel.findOneAndUpdate(
      { id: "autoval" },
      { $inc: { seq: 1 } },
      { new: true }
    );

    let seqId;
    if (!result) {
      const newval = new VoterAIModel({ id: "autoval", seq: 1 });
      await newval.save();
      seqId = 1;
    } else {
      seqId = result.seq;
    }

    const data = new VoterModel({
      id: seqId,
      nama,
      nik,
      tempatLahir,
      tanggalLahir,
      gender,
      alamat,
      fingerprintId: 0,
      faceId: 0,
      isVoting: false,
      role: 'voter'
    });

    await data.save();

    res.send({ data, msg: "success" });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred.");
  }

  // VoterModel.create({
  //   id: 1,
  //   nama,
  //   nik,
  //   tempatLahir,
  //   tanggalLahir,
  //   gender,
  //   alamat,
  //   fingerprintId: 0,
  //   faceId: 0,
  //   isVoting: false,
  // })
  //   .then((result) => {
  //     res.status(201).json(result);
  //   })
  //   .catch((err) => res.status(500).json({ error: err.message }));

  // const newUser = new VoterModel({
  //   name,
  //   email,
  //   password: passwordHash,
  //   role,
  // });

  // const savedUser = await newUser.save();
  // res.status(201).json(savedUser);

  // VoterModel.create(req.body)
  //   .then((result) => res.json(result))
  //   .catch((err) => res.json(err));

  // console.log(req.body);
  // const { name, email, password } = req.body;
  // User.findOne({ email: email }, (err, user) => {
  //   if (user) {
  //     res.send({ message: "user already exist" });
  //   } else {
  //     const user = new User({ name, email, password });
  //     user.save((err) => {
  //       if (err) {
  //         res.send(err);
  //       } else {
  //         res.send({ message: "sucessfull" });
  //       }
  //     });
  //   }
  // });
});

// const CONNECTION_URL = 'mongodb+srv://js_mastery:123123123@practice.jto9p.mongodb.net/test';
// const CONNECTION_URL = "mongodb://127.0.0.1:27017/elections";
const CONNECTION_URL = "mongodb://127.0.0.1:27017/e-voting";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server Running on Port: http://localhost:${PORT}`)
    )
  )
  .catch((error) => console.log(`${error} did not connect`));
