import { Link } from 'react-router-dom'

export default function ProductCard({ product }) {
  const priceLabel = product.price == null || product.price === 0 ? 'Contact for price' : `$${Number(product.price).toLocaleString()}`
  return (
    <Link to={`/product/${product.id}`} className="group block rounded-lg border border-slate-200 bg-white overflow-hidden hover:shadow-md transition">
      <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-400">No Image</div>
        )}
      </div>
      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-slate-500">{product.brand} • {product.category}</div>
        <div className="font-semibold text-slate-900 line-clamp-2">{product.name}</div>
        <div className="text-sm text-slate-600">Model: {product.model}</div>
        <div className="mt-2 font-medium text-blue-600">{priceLabel}</div>
      </div>
    </Link>
  )
}
