import bcrypt from "bcryptjs";
import nc from "next-connect";
import { signToken } from "../../../utils/auth";

const handler = nc();

handler.post(async (req, res) => {
  const data = await fetch(`http://localhost:3001/users?email=${req.body.email}`);
  const users = await data.json();

  if (users && users[0] && bcrypt.compareSync(req.body.password, users[0].password)) {
    const user = users[0];
    const token = signToken(user);

    res.send({
      token,
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401).send({ message: "Invalid user or password" });
  }
});

export default handler;
