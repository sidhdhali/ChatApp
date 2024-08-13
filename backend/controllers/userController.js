import User from "../models/userModel.js";

export const getUsersForSideBar = async (req, res) =>
{
  try
  {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId }  // not equals to logged in user , bcz we don't want to chat with ourself.
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error)
  {
    console.log("Error in getUsersForSideBar :", error.message)
    res.status(500).json({ error: "internal server error" });
  }
}