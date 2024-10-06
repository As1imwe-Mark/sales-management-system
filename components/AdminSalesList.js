"use client"

import { useState, useEffect } from 'react';

export default function AdminSalesList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await fetch('/api/sales');
      const data = await res.json();
      setSales(data.sales);
    };

    fetchSales();
  }, []);

  const handleApprove = async (id) => {
    await fetch(`/api/sales/${id}`, {
      method: 'PUT',
    });
    setSales(sales.filter((sale) => sale._id !== id)); // Remove approved sale from the list
  };

  const handleReject = async (id) => {
    await fetch(`/api/sales/${id}`, {
      method: 'DELETE',
    });
    setSales(sales.filter((sale) => sale._id !== id)); // Remove rejected sale from the list
  };

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Sales Approval</h2>
      <ul>
        {sales.map((sale) => (
          <li key={sale._id} className="border-b py-2">
            <p>Product: {sale.product}</p>
            <p>Quantity: {sale.quantity}</p>
            <p>Price: ${sale.price}</p>
            <p>Customer: {sale.customer}</p>
            <button
              onClick={() => handleApprove(sale._id)}
              className="bg-green-500 text-white p-2 rounded mr-2"
            >
              Approve
            </button>
            <button
              onClick={() => handleReject(sale._id)}
              className="bg-red-500 text-white p-2 rounded"
            >
              Reject
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
