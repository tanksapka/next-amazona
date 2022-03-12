import axios from "axios";
import bcrypt from "bcryptjs";
import nc from "next-connect";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  const newUser = {
    name: req.body.name,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password),
    isAdmin: false,
  };
  const userData = await axios.post("http://localhost:3001/users", newUser);
  const user = userData.data;
  const token = signToken(user);

  res.send({
    token,
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
  });
});

export default handler;
