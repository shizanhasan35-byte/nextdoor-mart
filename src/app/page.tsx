import Link from 'next/link';
import { getCurrentUser } from '@/lib/auth';
import ProductCard from '@/components/ProductCard';

async function getProducts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/products`, {
      cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
  } catch (error) {
    return [];
  }
}

export default async function HomePage() {
  const user = await getCurrentUser();
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-emerald-600">Nextdoor Mart</h1>
          <div>
            {user ? (
              <span className="text-gray-700 font-medium">হ্যালো, {user.name || 'ইউজার'}</span>
            ) : (
              <div className="space-x-2">
                <Link href="/login" className="text-emerald-600 font-medium px-3 py-1.5 hover:underline">
                  লগইন
                </Link>
                <Link href="/register" className="bg-emerald-600 text-white px-4 py-2 rounded-md font-medium hover:bg-emerald-700 transition">
                  রেজিস্ট্রেশন
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold text-gray-900">আমাদের প্রোডাক্টসমূহ</h2>
          <p className="text-gray-600">আপনার প্রয়োজনীয় নিত্যপ্রয়োজনীয় পণ্য বেছে নিন</p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center text-gray-500">
            বর্তমানে কোনো প্রোডাক্ট নেই। এডমিন প্যানেল থেকে প্রোডাক্ট যোগ করুন।
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
