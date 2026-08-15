import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';

export default async function HomePage() {
  const user = await getCurrentUser();

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-md space-y-6">
        <h1 className="text-4xl font-extrabold text-emerald-600">Nextdoor Mart</h1>
        <p className="text-gray-600">আপনার এলাকার ডিজিটাল গ্রোসারির দোকান</p>

        {user ? (
          <div className="space-y-4">
            <div className="p-4 bg-emerald-50 rounded-lg text-emerald-800">
              <p className="font-semibold">স্বাগতম, {user.name || 'ইউজার'}!</p>
              <p className="text-sm text-emerald-600">আপনি সফলভাবে লগইন করেছেন।</p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <Link
              href="/login"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-2.5 rounded-md transition"
            >
              লগইন করুন
            </Link>
            <Link
              href="/register"
              className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2.5 rounded-md transition"
            >
              নতুন অ্যাকাউন্ট তৈরি করুন
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
