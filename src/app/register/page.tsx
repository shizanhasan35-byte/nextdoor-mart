'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'রেজিস্ট্রেশন ব্যর্থ হয়েছে');
      }

      router.push('/');
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-bold text-gray-900">নতুন অ্যাকাউন্ট তৈরি করুন</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            ইতোমধ্যে অ্যাকাউন্ট আছে?{' '}
            <Link href="/login" className="text-emerald-600 hover:underline font-medium">
              লগইন করুন
            </Link>
          </p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">{error}</div>}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">আপনার নাম</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="রহিম আহমেদ"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ইমেইল (ঐচ্ছিক)</label>
            <input
              type="email"
              className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">ফোন নম্বর</label>
            <input
              type="tel"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="017XXXXXXXX"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">পাসওয়ার্ড</label>
            <input
              type="password"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-emerald-600 hover:bg-emerald-700 font-medium rounded-md py-2.5 text-center transition-colors disabled:opacity-50"
          >
            {loading ? 'অপেক্ষা করুন...' : 'সাইন আপ'}
          </button>
        </form>
      </div>
    </div>
  );
}
