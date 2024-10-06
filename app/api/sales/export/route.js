import { dbConnect } from '../../../lib/mongoose';
import Sales from '../../../models/Sales';
import { getSession } from 'next-auth/react';
import * as XLSX from 'xlsx';

export default async function handler(req, res) {
  await dbConnect();

  const session = await getSession({ req });
  if (!session || session.user.role !== 'admin') {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const sales = await Sales.find({ status: 'Approved' });
      const salesData = sales.map((sale) => ({
        product: sale.product,
        quantity: sale.quantity,
        price: sale.price,
        customer: sale.customer,
        createdAt: sale.createdAt.toISOString(),
      }));

      const ws = XLSX.utils.json_to_sheet(salesData);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Approved Sales');
      const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'buffer' });

      res.setHeader('Content-Disposition', 'attachment; filename="approved_sales.xlsx"');
      res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
      res.send(excelBuffer);
    } catch (error) {
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ success: false, error: 'Method not allowed' });
  }
}
