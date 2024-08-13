import Conversation from "../models/conversationModel.js"
import Message from "../models/messageModel.js"


export const sendMessage = async (req, res) =>
{
  try
  {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    })

    if (!conversation)
    {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
        // messages: []
      })
    }

    const newMessage = new Message({
      senderId, receiverId, message
    })

    if (newMessage)
    {
      conversation.messages.push(newMessage._id);
    }

    res.status(201).json({ message: "Message sent successfully" })
  } catch (error)
  {
    console.log("Error in sendMessage controller:", error.message);
    res.status(500).json({ error: "Internal server error" })
  }
}