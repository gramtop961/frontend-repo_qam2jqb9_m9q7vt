import { useEffect, useMemo, useState } from 'react'
import Layout from '../components/Layout'
import ProductCard from '../components/ProductCard'
import { api } from '../services/api'

export default function Products() {
  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [filters, setFilters] = useState({ q:'', brand:'', category:'', availability:'', sort:'newest', min_price:'', max_price:'', per_page:12 })
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])

  const fetchData = async () => {
    const res = await api.getProducts({ ...filters, page })
    setItems(res.items)
    setTotal(res.total)
  }

  useEffect(() => { api.getBrands().then(setBrands); api.getCategories().then(setCategories); }, [])
  useEffect(() => { fetchData().catch(()=>{}) }, [page])

  const onSubmit = (e) => { e.preventDefault(); setPage(1); fetchData().catch(()=>{}) }

  const pages = Math.ceil(total / filters.per_page)

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <aside className="md:col-span-1 space-y-4">
          <form onSubmit={onSubmit} className="space-y-3 bg-white p-4 rounded-lg border">
            <input value={filters.q} onChange={e=>setFilters({...filters,q:e.target.value})} placeholder="Search keywords" className="w-full px-3 py-2 rounded border" />
            <select value={filters.brand} onChange={e=>setFilters({...filters,brand:e.target.value})} className="w-full px-3 py-2 rounded border">
              <option value="">All Brands</option>
              {brands.map(b=> <option key={b.id} value={b.slug}>{b.name}</option>)}
            </select>
            <select value={filters.category} onChange={e=>setFilters({...filters,category:e.target.value})} className="w-full px-3 py-2 rounded border">
              <option value="">All Categories</option>
              {categories.map(c=> <option key={c.id} value={c.slug}>{c.name}</option>)}
            </select>
            <div className="grid grid-cols-2 gap-2">
              <input value={filters.min_price} onChange={e=>setFilters({...filters,min_price:e.target.value})} placeholder="Min" className="w-full px-3 py-2 rounded border" />
              <input value={filters.max_price} onChange={e=>setFilters({...filters,max_price:e.target.value})} placeholder="Max" className="w-full px-3 py-2 rounded border" />
            </div>
            <select value={filters.availability} onChange={e=>setFilters({...filters,availability:e.target.value})} className="w-full px-3 py-2 rounded border">
              <option value="">Any Availability</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
            <select value={filters.sort} onChange={e=>setFilters({...filters,sort:e.target.value})} className="w-full px-3 py-2 rounded border">
              <option value="newest">Newest</option>
              <option value="price_asc">Price ↑</option>
              <option value="price_desc">Price ↓</option>
            </select>
            <button className="w-full bg-blue-600 text-white rounded px-3 py-2">Apply</button>
          </form>
        </aside>
        <section className="md:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map(item => <ProductCard key={item.id} product={item} />)}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-slate-600">Total: {total}</div>
            <div className="flex gap-2">
              {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
                <button key={p} onClick={()=>setPage(p)} className={`px-3 py-1 rounded border ${p===page?'bg-blue-600 text-white':'bg-white'}`}>{p}</button>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  )
}
