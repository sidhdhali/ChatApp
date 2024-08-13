import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, res) =>
{
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d"
  })
  res.cookie("jwtToken", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // mili seconds format = 15 days
    httpOnly: true, // prevent XSS attacks cross-site scripting attacks
    sameSite: "strict",// CSRF attacks cross-site requests forgery attacks
    secure: process.env.NODE_ENV !== "development"
  })
}

export default generateTokenAndSetCookie;