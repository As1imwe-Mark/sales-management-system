import { dbConnect } from '../../../lib/mongoose';
import Sales from '../../../models/Sales';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    // Create a new sale entry
    const { product, quantity, price, customer } = req.body;
    try {
      const sale = await Sales.create({
        salesmanId: session.user.id,
        product,
        quantity,
        price,
        customer,
      });
      res.status(201).json({ success: true, sale });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'GET') {
    // Fetch sales (Admin can fetch all, Salesman can only fetch their own)
    try {
      let sales;
      if (session.user.role === 'admin') {
        sales = await Sales.find(); // Admin sees all sales
      } else {
        sales = await Sales.find({ salesmanId: session.user.id }); // Salesman sees their sales
      }
      res.status(200).json({ success: true, sales });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
