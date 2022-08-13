const express = require("express");
const app = express();
require("dotenv").config();
const port = 8080;
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messagesRoute = require("./routes/messages");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Mongo is running");
});

app.get("/", (req, res) => {
  res.send("hello from simple server :)");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },

  filename: function (req, file, cb) {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File has been uploaded...");
  } catch (error) {
    res.status(500).json(error);
  }
});

app.use(cors());
app.use(morgan("common"));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messagesRoute);


app.listen(port, () =>
  console.log("> Server is up and running on port : " + port)
);
