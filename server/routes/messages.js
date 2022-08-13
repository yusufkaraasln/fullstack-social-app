const router = require("express").Router();
const Message = require("../models/Message");

//add message to conversation
router.post("/", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get all messages from conversation
router.get("/:conversationId", async (req, res) => {
  const allMessages = await Message.find({
    conversationId: req.params.conversationId,
  });
  try {
    res.status(200).json(allMessages);
  } catch (e) {
    res.status(500).json(e);
  }
});

module.exports = router;
