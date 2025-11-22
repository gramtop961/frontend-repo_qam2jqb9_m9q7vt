import { useEffect, useState } from 'react'
import Layout from '../components/Layout'

export default function Cart(){
  const [cart, setCart] = useState([])

  useEffect(()=>{
    setCart(JSON.parse(localStorage.getItem('cart')||'[]'))
  },[])

  const total = cart.reduce((sum, i)=> sum + (Number(i.price||0) * i.qty), 0)

  const updateQty = (id, qty) => {
    const next = cart.map(i=> i.id===id ? {...i, qty: Number(qty)} : i)
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  const removeItem = (id) => {
    const next = cart.filter(i=>i.id!==id)
    setCart(next)
    localStorage.setItem('cart', JSON.stringify(next))
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      {cart.length===0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="grid gap-3">
          {cart.map(item => (
            <div key={item.id} className="flex items-center justify-between gap-3 border rounded p-3 bg-white">
              <div className="flex items-center gap-3">
                {item.image && <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>}
                <div>
                  <div className="font-medium">{item.name}</div>
                  <div className="text-sm text-slate-600">${Number(item.price||0).toLocaleString()}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" min="1" value={item.qty} onChange={e=>updateQty(item.id, e.target.value)} className="w-20 border rounded px-2 py-1" />
                <button onClick={()=>removeItem(item.id)} className="px-3 py-1 rounded bg-red-100 text-red-700">Remove</button>
              </div>
            </div>
          ))}
          <div className="text-right font-semibold">Total: ${total.toLocaleString()}</div>
          <a href="/checkout" className="inline-block ml-auto bg-blue-600 text-white px-4 py-2 rounded">Proceed to Checkout</a>
        </div>
      )}
    </Layout>
  )
}
