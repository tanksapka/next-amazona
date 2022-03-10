import nc from "next-connect";

const handler = nc();

handler.get(async (req, res) => {
  const data = await fetch(`http://localhost:3001/products/${req.query.id}`);
  const product = await data.json();

  res.send(product);
});

export default handler;
