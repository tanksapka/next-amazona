import axios from "axios";
import nc from "next-connect";
import { isAuth } from "../../../utils/auth";
import { onError } from "../../../utils/error";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.post(async (req, res) => {
  const order = await axios.post("http://localhost:3001/orders", {
    ...req.body,
    user_id: req.user.id,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  res.status(201).send({ ...order.data });
});

export default handler;
