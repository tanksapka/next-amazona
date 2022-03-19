import nc from "next-connect";
import onError from "../../../../utils/error";
import { isAuth } from "../../../../utils/auth";
import axios from "axios";

const handler = nc({
  onError,
});
handler.use(isAuth);

handler.put(async (req, res) => {
  const order = await axios.get(`http://localhost:3001/orders/${req.query.id}`);
  if (order) {
    order.isPaid = true;
    order.paidAt = new Date();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      email_address: req.body.email_address,
    };
    const paidOrder = await axios.put(`http://localhost:3001/orders/${req.query.id}`, order);

    res.send({ message: "order paid", order: paidOrder });
  } else {
    res.status(404).send({ message: "order not found" });
  }
});

export default handler;
