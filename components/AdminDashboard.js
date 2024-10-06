"use client"

import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function fetchSales() {
      const res = await fetch('/api/sales');
      const data = await res.json();
      setSales(data.sales);
    }
    fetchSales();
  }, []);

  const approveSale = async (id) => {
    await fetch(`/api/sales/${id}`, { method: 'PUT', body: JSON.stringify({ status: 'Approved' }) });
    setSales(sales.map(s => s._id === id ? { ...s, status: 'Approved' } : s));
  };

  const rejectSale = async (id) => {
    await fetch(`/api/sales/${id}`, { method: 'DELETE' });
    setSales(sales.filter(s => s._id !== id));
  };

  return (
    <div>
      <h2>Sales Approval</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Customer</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sales.map((sale) => (
            <tr key={sale._id}>
              <td>{sale.product}</td>
              <td>{sale.quantity}</td>
              <td>{sale.price}</td>
              <td>{sale.customer}</td>
              <td>{sale.status}</td>
              <td>
                {sale.status === 'Pending' && (
                  <>
                    <button onClick={() => approveSale(sale._id)}>Approve</button>
                    <button onClick={() => rejectSale(sale._id)}>Reject</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
