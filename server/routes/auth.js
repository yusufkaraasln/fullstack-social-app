const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);

    const user = await new User({
      username: req.body.username,
      email: req.body.email,
      password: hash,
    });
    await user.save();
    res.status(200).json(user);
  } catch (e) {
    res.json({
      message: e,
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const valid = await bcrypt.compare(req.body.password, user.password);


    return res.status(200).json(user);
  } catch (e) {
    res.json({
      message: e,
    });
  }
});

module.exports = router;
