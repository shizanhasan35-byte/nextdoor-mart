'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: '',
    categoryId: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('প্রোডাক্ট সফলভাবে যোগ করা হয়েছে!');
        setFormData({ name: '', description: '', price: '', stock: '', imageUrl: '', categoryId: '' });
        router.push('/');
      } else {
        setMessage(data.message || 'কোথাও সমস্যা হয়েছে');
      }
    } catch (err) {
      setMessage('সার্ভারে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">নতুন প্রোডাক্ট যোগ করুন</h1>
        
        {message && (
          <p className="mb-4 text-sm font-medium p-3 rounded bg-emerald-50 text-emerald-700">
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">প্রোডাক্টের নাম *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">বিবরণ</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">দাম (৳) *</label>
              <input
                type="number"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="mt-1 w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">স্টক পরিমাণ</label>
              <input
                type="number"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="mt-1 w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ছবি লিংক (URL)</label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              className="mt-1 w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ক্যাটাগরি ID *</label>
            <input
              type="text"
              required
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="mt-1 w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-2 rounded-md hover:bg-emerald-700 transition font-medium"
          >
            {loading ? 'যোগ করা হচ্ছে...' : 'প্রোডাক্ট সেভ করুন'}
          </button>
        </form>
      </div>
    </div>
  );
}
