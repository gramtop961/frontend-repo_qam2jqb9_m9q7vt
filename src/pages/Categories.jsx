import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { api } from '../services/api'
import { Link } from 'react-router-dom'

export default function Categories(){
  const [categories, setCategories] = useState([])
  useEffect(()=>{ api.getCategories().then(setCategories) },[])
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map(c => (
          <Link key={c.id} to={`/products?category=${c.slug}`} className="rounded-lg border bg-white p-4 hover:shadow-sm">
            <div className="font-medium">{c.name}</div>
          </Link>
        ))}
      </div>
    </Layout>
  )
}
