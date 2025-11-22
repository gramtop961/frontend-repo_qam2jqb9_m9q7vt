import Layout from '../components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../services/api'

export default function Home() {
  const [brands, setBrands] = useState([])
  const [categories, setCategories] = useState([])
  const [featured, setFeatured] = useState([])
  const [q, setQ] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    api.getBrands().then(setBrands).catch(()=>{})
    api.getCategories().then(setCategories).catch(()=>{})
    api.getProducts({ per_page: 8, sort: 'newest' }).then(res => setFeatured(res.items)).catch(()=>{})
  }, [])

  const onSearch = (e) => {
    e.preventDefault()
    navigate(`/products?q=${encodeURIComponent(q)}`)
  }

  return (
    <Layout>
      <section className="rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white p-10 overflow-hidden relative">
        <div className="relative z-10 max-w-3xl">
          <h1 className="text-3xl sm:text-4xl font-bold">Industrial Automation & Electrical Products</h1>
          <p className="mt-2 text-slate-300">AC Drives, PLCs, HMIs, Servo Systems, Sensors, Controllers and more.</p>
          <form onSubmit={onSearch} className="mt-6 flex bg-white/10 rounded-lg overflow-hidden">
            <input value={q} onChange={e=>setQ(e.target.value)} className="flex-1 px-4 py-3 bg-transparent outline-none placeholder:text-slate-300" placeholder="Search products (brand, model, keyword)" />
            <button className="bg-blue-500 px-4 py-3 font-medium">Search</button>
          </form>
        </div>
        <div className="absolute -right-24 -top-24 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Featured Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {categories.slice(0,6).map(c => (
            <Link key={c.id} to={`/products?category=${c.slug}`} className="rounded-lg border bg-white p-3 text-center hover:shadow-sm">
              <div className="font-medium">{c.name}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Brands</h2>
        <div className="flex flex-wrap gap-2">
          {brands.map(b => (
            <Link key={b.id} to={`/products?brand=${b.slug}`} className="px-3 py-2 rounded-full border bg-white hover:bg-slate-50 text-sm">{b.name}</Link>
          ))}
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featured.map(p => (
            <div key={p.id}>
              <Link to={`/product/${p.id}`} className="block">
                <div className="rounded-xl overflow-hidden border bg-white">
                  <div className="aspect-[4/3] bg-slate-100">
                    {p.image ? <img src={p.image} alt={p.name} className="w-full h-full object-cover"/> : null}
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-slate-500">{p.brand} • {p.category}</div>
                    <div className="font-semibold">{p.name}</div>
                    <div className="text-sm">Model: {p.model}</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  )
}
