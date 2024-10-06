"use client"

import { useState, useEffect } from 'react';

export default function SalesList() {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      const res = await fetch('/api/sales');
      const data = await res.json();
      setSales(data.sales);
    };

    fetchSales();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Your Sales</h2>
      <ul>
        {sales.map((sale) => (
          <li key={sale._id} className="border-b py-2">
            <p>Product: {sale.product}</p>
            <p>Quantity: {sale.quantity}</p>
            <p>Price: ${sale.price}</p>
            <p>Customer: {sale.customer}</p>
            <p>Status: {sale.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
