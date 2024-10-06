import { dbConnect } from '../../../lib/mongoose';
import Sales from '../../../models/Sales';
import { getSession } from 'next-auth/react';

export default async function handler(req, res) {
  await dbConnect();

  const { id } = req.query;
  const session = await getSession({ req });
  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'PUT') {
    // Approve a sale
    try {
      const updatedSale = await Sales.findByIdAndUpdate(id, { status: 'Approved' }, { new: true });
      if (!updatedSale) {
        return res.status(404).json({ success: false, error: 'Sale not found' });
      }
      res.status(200).json({ success: true, sale: updatedSale });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else if (req.method === 'DELETE') {
    // Reject (delete) a sale
    try {
      const deletedSale = await Sales.findByIdAndDelete(id);
      if (!deletedSale) {
        return res.status(404).json({ success: false, error: 'Sale not found' });
      }
      res.status(200).json({ success: true, sale: deletedSale });
    } catch (error) {
      res.status(400).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
