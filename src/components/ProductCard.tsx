interface ProductProps {
  product: {
    id: string;
    name: string;
    price: number;
    imageUrl?: string | null;
    category?: {
      name: string;
    };
  };
}

export default function ProductCard({ product }: ProductProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 flex flex-col justify-between p-4">
      <div>
        <div className="w-full h-40 bg-gray-100 rounded-md flex items-center justify-center mb-3 text-gray-400">
          {product.imageUrl ? (
            <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover rounded-md" />
          ) : (
            <span>ছবি নেই</span>
          )}
        </div>
        {product.category && (
          <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded">
            {product.category.name}
          </span>
        )}
        <h3 className="text-lg font-bold text-gray-800 mt-2">{product.name}</h3>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-extrabold text-gray-900">৳{product.price}</span>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium px-3 py-1.5 rounded-md transition">
          কার্টে যোগ করুন
        </button>
      </div>
    </div>
  );
}
