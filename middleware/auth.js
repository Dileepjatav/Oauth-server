import { OAuth2Client } from "google-auth-library";
import jwt from "jsonwebtoken";
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
import UserModel from "../models/Users.js";
// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Verify Google token and create/find user
export const verifyGoogleToken = async (token) => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  let user = await UserModel.findOne({
    googleId: payload.sub, // or email: payload.email
  });

  if (!user) {
    user = await UserModel.create({
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      avatar: payload.picture,
      signupMethod: "google",
      createdAt: new Date(),
    });
  }

  const payloaduser = {
    email: user.email,
    name: user.name,
    avatar: user.picture,
  };

  return payloaduser;
};

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
