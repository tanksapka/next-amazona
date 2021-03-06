import nc from "next-connect";
import { isAuth } from "../../../../utils/auth";

const handler = nc();
handler.use(isAuth);

handler.get(async (req, res) => {
  const response = await fetch(`http://localhost:3001/orders/${req.query.id}`);
  const order = await response.json();

  res.send(order);
});

export default handler;
