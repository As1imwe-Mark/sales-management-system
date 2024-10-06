"use client"

import { useState } from 'react';
import { useSession } from 'next-auth/react';

export default function SalesForm() {
  const { data: session } = useSession();
  const [formData, setFormData] = useState({
    product: '',
    quantity: '',
    price: '',
    customer: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      setMessage('You need to be logged in to submit a sale.');
      return;
    }

    try {
      const res = await fetch('/api/sales', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage('Sale submitted successfully!');
        setFormData({ product: '', quantity: '', price: '', customer: '' });
      } else {
        setMessage('Failed to submit sale.');
      }
    } catch (error) {
      setMessage('An error occurred.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block">Product</label>
          <input
            type="text"
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block">Quantity</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block">Customer</label>
          <input
            type="text"
            name="customer"
            value={formData.customer}
            onChange={handleChange}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <button type="submit" className="bg-blue-500 text-white p-2 rounded">Submit Sale</button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
