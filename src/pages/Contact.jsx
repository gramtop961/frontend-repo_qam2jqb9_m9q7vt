import { useState } from 'react'
import Layout from '../components/Layout'
import { api } from '../services/api'

export default function Contact(){
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:''})
  const [status, setStatus] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    try{
      await api.sendContact(form)
      setStatus('Message sent!')
      setForm({name:'',email:'',phone:'',message:''})
    }catch(e){ setStatus(e.message) }
  }
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-4">Contact</h1>
      <form onSubmit={submit} className="grid gap-3 max-w-xl bg-white p-4 rounded border">
        <input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className="border rounded px-3 py-2" placeholder="Name"/>
        <input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} className="border rounded px-3 py-2" placeholder="Email"/>
        <input value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className="border rounded px-3 py-2" placeholder="Phone (optional)"/>
        <textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} className="border rounded px-3 py-2" placeholder="Message" rows={5}/>
        <button className="bg-blue-600 text-white rounded px-4 py-2">Send</button>
        {status && <div className="text-sm text-slate-700">{status}</div>}
      </form>
    </Layout>
  )
}
