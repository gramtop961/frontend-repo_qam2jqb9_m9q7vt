import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { api } from '../services/api'

export default function ProductSingle() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)

  useEffect(() => { api.getProduct(id).then(setProduct).catch(()=>{}) }, [id])

  if (!product) return <Layout>Loading...</Layout>
  const priceLabel = product.price == null || product.price === 0 ? 'Contact for price' : `$${Number(product.price).toLocaleString()}`

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="rounded-xl overflow-hidden border bg-white">
            <div className="aspect-[4/3] bg-slate-100">
              {product.image ? <img src={product.image} alt={product.name} className="w-full h-full object-cover"/> : null}
            </div>
          </div>
          <a href={`https://wa.me/?text=${encodeURIComponent('Quick Order: '+product.name+' ('+product.model+')')}`} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center px-4 py-2 bg-green-600 text-white rounded">WhatsApp Quick Order</a>
        </div>
        <div>
          <div className="text-sm text-slate-500">{product.brand} • {product.category}</div>
          <h1 className="text-2xl font-bold">{product.name}</h1>
          <div className="text-slate-700">Model: {product.model}</div>
          <div className="mt-2 text-xl text-blue-600 font-semibold">{priceLabel}</div>
          <p className="mt-4 text-slate-700">{product.short_description}</p>
          <div className="prose max-w-none mt-4" dangerouslySetInnerHTML={{__html: (product.long_description||'').replace(/\n/g,'<br/>')}} />
          {product.specs && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Specifications</h3>
              <table className="w-full text-sm border">
                <tbody>
                  {Object.entries(typeof product.specs === 'string' ? JSON.parse(product.specs) : product.specs).map(([k,v]) => (
                    <tr key={k} className="border-b">
                      <td className="p-2 font-medium bg-slate-50 w-1/3">{k}</td>
                      <td className="p-2">{String(v)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className="mt-6 flex gap-2">
            <button onClick={()=>{
              const cart = JSON.parse(localStorage.getItem('cart')||'[]')
              const exists = cart.find(i=>i.id===product.id)
              if(!exists){cart.push({id:product.id, qty:1, name:product.name, price:product.price, image:product.image})}
              localStorage.setItem('cart', JSON.stringify(cart))
              alert('Added to cart')
            }} className="px-4 py-2 bg-blue-600 text-white rounded">Add to Cart</button>
            <button onClick={()=>window.print()} className="px-4 py-2 bg-slate-200 rounded">Print / PDF</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}
