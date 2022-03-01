import nc from "next-connect";
import data from "../../utils/data";

const handler = nc();

handler.get(async (req, res) => {
  const rq = await fetch("http://localhost:3001/products");
  const products = await rq.json();
  products.map(async (product) => {
    await fetch(`http://localhost:3001/products/${product.id}`, {
      method: "DELETE",
    });
  });

  data.products.map(async (product) => {
    await fetch("http://localhost:3001/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...product, createdAt: new Date(), updatedAt: new Date() }),
    });
  });

  res.send({ message: "seeded successfully" });
});

export default handler;
