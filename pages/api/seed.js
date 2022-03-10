import nc from "next-connect";
import data from "../../utils/data";
import axios from "axios";

const handler = nc();

handler.get(async (req, res) => {
  const rqProd = await fetch("http://localhost:3001/products");
  const products = await rqProd.json();
  products.map((product) => axios.delete(`http://localhost:3001/products/${product.id}`));
  data.products.map((product) => {
    axios.post("http://localhost:3001/products", { ...product, createdAt: new Date(), updatedAt: new Date() });
  });

  const rqUser = await fetch("http://localhost:3001/users");
  const users = await rqUser.json();
  users.map((user) => axios.delete(`http://localhost:3001/users/${user.id}`));
  data.users.map((user) => {
    axios.post("http://localhost:3001/users", { ...user, createdAt: new Date(), updatedAt: new Date() });
  });

  res.send({ message: "seeded successfully" });
});

export default handler;
