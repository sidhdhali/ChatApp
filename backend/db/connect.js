import mongoose from "mongoose";

const connection = async () =>
{
  try
  {
    await mongoose.connect(process.env.MONGO_URI)
    console.log("Connected to MONGODB");
  } catch (error)
  {
    console.log("Error connecting to MOngoDB", error.message);
  }
}
export default connection;