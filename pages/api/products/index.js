import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const data = await fetch("http://localhost:3001/products");
  const products = await data.json();

  res.send(products);
});

export default handler;
