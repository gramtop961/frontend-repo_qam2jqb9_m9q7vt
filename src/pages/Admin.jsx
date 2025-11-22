import { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { api } from '../services/api'

export default function Admin(){
  const [token, setToken] = useState(localStorage.getItem('token')||'')
  const [login, setLogin] = useState({username:'', password:''})
  const [form, setForm] = useState({ name:'', brand:'', category:'', model:'', price:'', short_description:'', long_description:'', specs:{}, availability:'in_stock', image:'' })
  const [items, setItems] = useState([])

  const fetchProducts = async () => {
    const res = await api.getProducts({ per_page: 50 })
    setItems(res.items)
  }

  useEffect(()=>{ fetchProducts().catch(()=>{}) },[])

  const doLogin = async (e) => {
    e.preventDefault()
    const res = await api.login(login)
    localStorage.setItem('token', res.token)
    setToken(res.token)
  }

  const save = async (e) => {
    e.preventDefault()
    if(form.id){
      await api.updateProduct(form, token)
    } else {
      await api.addProduct(form, token)
    }
    setForm({ name:'', brand:'', category:'', model:'', price:'', short_description:'', long_description:'', specs:{}, availability:'in_stock', image:'' })
    fetchProducts()
  }

  const del = async (id) => { await api.deleteProduct(id, token); fetchProducts() }

  const upload = async (e) => {
    const f = e.target.files?.[0]
    if(!f) return
    const res = await api.uploadImage(f, token)
    setForm(prev => ({...prev, image: res.path}))
  }

  if(!token){
    return (
      <Layout>
        <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
        <form onSubmit={doLogin} className="grid gap-3 max-w-sm bg-white p-4 rounded border">
          <input value={login.username} onChange={e=>setLogin({...login,username:e.target.value})} className="border rounded px-3 py-2" placeholder="Username"/>
          <input type="password" value={login.password} onChange={e=>setLogin({...login,password:e.target.value})} className="border rounded px-3 py-2" placeholder="Password"/>
          <button className="bg-blue-600 text-white rounded px-4 py-2">Login</button>
        </form>
      </Layout>
    )
  }

  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <form onSubmit={save} className="grid gap-3 bg-white p-4 rounded border">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border rounded px-3 py-2" placeholder="Product Name"/>
        <div className="grid grid-cols-2 gap-3">
          <input value={form.brand} onChange={e=>setForm({...form,brand:e.target.value})} className="border rounded px-3 py-2" placeholder="Brand (e.g., Yaskawa)"/>
          <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} className="border rounded px-3 py-2" placeholder="Category (e.g., PLCs)"/>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input value={form.model} onChange={e=>setForm({...form,model:e.target.value})} className="border rounded px-3 py-2" placeholder="Model Number"/>
          <input value={form.price} onChange={e=>setForm({...form,price:e.target.value})} className="border rounded px-3 py-2" placeholder="Price (blank = Contact)"/>
        </div>
        <input value={form.image} onChange={e=>setForm({...form,image:e.target.value})} className="border rounded px-3 py-2" placeholder="Image URL or upload below"/>
        <input type="file" onChange={upload} />
        <textarea value={form.short_description} onChange={e=>setForm({...form,short_description:e.target.value})} className="border rounded px-3 py-2" placeholder="Short Description"/>
        <textarea value={form.long_description} onChange={e=>setForm({...form,long_description:e.target.value})} className="border rounded px-3 py-2" placeholder="Full Description" rows={5}/>
        <div className="grid grid-cols-2 gap-3">
          <input placeholder="Spec Key" className="border rounded px-3 py-2" onKeyDown={e=>{
            if(e.key==='Enter'){
              e.preventDefault();
              const key = e.currentTarget.value.trim(); if(!key) return;
              setForm({...form, specs:{...form.specs, [key]:''}}); e.currentTarget.value=''
            }
          }} />
          <div className="text-sm text-slate-600">Press Enter to add spec key; then fill values in table below.</div>
        </div>
        {Object.keys(form.specs).length>0 && (
          <table className="w-full text-sm border">
            <tbody>
              {Object.entries(form.specs).map(([k,v]) => (
                <tr key={k} className="border-b">
                  <td className="p-2 w-1/3 bg-slate-50">{k}</td>
                  <td className="p-2"><input value={v} onChange={e=>setForm({...form, specs:{...form.specs, [k]: e.target.value}})} className="w-full border rounded px-2 py-1"/></td>
                  <td className="p-2 text-right"><button type="button" onClick={()=>{ const s={...form.specs}; delete s[k]; setForm({...form, specs:s}) }} className="text-red-600">Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div>
          <label className="mr-2">Availability:</label>
          <select value={form.availability} onChange={e=>setForm({...form,availability:e.target.value})} className="border rounded px-3 py-2">
            <option value="in_stock">In Stock</option>
            <option value="out_of_stock">Out of Stock</option>
          </select>
        </div>
        <div className="flex gap-2">
          <button className="bg-blue-600 text-white rounded px-4 py-2">{form.id? 'Update' : 'Add'} Product</button>
          {form.id && <button type="button" onClick={()=>setForm({ name:'', brand:'', category:'', model:'', price:'', short_description:'', long_description:'', specs:{}, availability:'in_stock', image:'' })} className="px-4 py-2 rounded border">Cancel Edit</button>}
        </div>
      </form>

      <h2 className="text-xl font-semibold mt-8 mb-3">Products</h2>
      <div className="grid gap-3">
        {items.map(p => (
          <div key={p.id} className="flex items-center justify-between border rounded p-3 bg-white">
            <div className="flex items-center gap-3">
              {p.image && <img src={p.image} className="w-16 h-16 object-cover rounded"/>}
              <div>
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-slate-600">{p.brand} • {p.model}</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={()=>setForm({ id:p.id, name:p.name, brand:p.brand, category:p.category, model:p.model, price:p.price, short_description:p.short_description, long_description:p.long_description, specs: (typeof p.specs==='string'? JSON.parse(p.specs||'{}'): (p.specs||{})), availability:p.availability, image:p.image })} className="px-3 py-1 rounded border">Edit</button>
              <button onClick={()=>del(p.id)} className="px-3 py-1 rounded bg-red-100 text-red-700">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </Layout>
  )
}
