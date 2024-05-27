import fs from 'node:fs/promises';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

app.post("/orders", async (req, res) => {
  const orderData = req.body.order;

  if (Object.keys(orderData).length === 0) {
    return res.status(400).json({ message: "Missing data." });
  }

  if (
    !orderData.customer ||
    !orderData.customer.email ||
    !orderData.customer.email.includes("@") ||
    !orderData.customer.name ||
    !orderData.customer.name.trim() ||
    !orderData.customer.street ||
    !orderData.customer.street.trim() ||
    !orderData.customer.phone ||
    !orderData.customer.phone.trim() ||
    !orderData.customer.city ||
    !orderData.customer.city.trim()
  ) {
    return res.status(400).json({
      message:
        "Missing data: Email, name, street, phone, or city is missing.",
    });
  }

  const newOrder = {
    ...orderData,
    id: (Math.random() * 1000).toString(),
  };

  try {
    let allOrders = [];
    const orders = await fs.readFile("./data/orders.json", "utf8");
    if (orders) {
      allOrders = JSON.parse(orders);
    }
    allOrders.push(newOrder);
    await fs.writeFile("./data/orders.json", JSON.stringify(allOrders));
    res.status(201).json({ message: "Order created!" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error." });
  }
});




app.use((req, res) => {
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  res.status(404).json({ message: 'Not found' });
});

app.listen(3000);
