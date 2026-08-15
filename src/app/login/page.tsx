'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ emailOrPhone: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'লগইন ব্যর্থ হয়েছে');
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
          <h2 className="text-center text-3xl font-bold text-gray-900">লগইন করুন</h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            নতুন অ্যাকাউন্ট খুলতে চান?{' '}
            <Link href="/register" className="text-emerald-600 hover:underline font-medium">
              রেজিস্ট্রেশন করুন
            </Link>
          </p>
        </div>

        {error && <div className="bg-red-50 text-red-500 p-3 rounded-md text-sm text-center">{error}</div>}

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">ইমেইল অথবা ফোন নম্বর</label>
            <input
              type="text"
              required
              className="mt-1 block w-full border border-gray-300 rounded-md p-2.5 focus:ring-emerald-500 focus:border-emerald-500"
              placeholder="example@mail.com বা 017XXXXXXXX"
              value={formData.emailOrPhone}
              onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
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
            {loading ? 'অপেক্ষা করুন...' : 'লগইন'}
          </button>
        </form>
      </div>
    </div>
  );
}
