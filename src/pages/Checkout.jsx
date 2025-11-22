import Layout from '../components/Layout'

export default function Checkout(){
  return (
    <Layout>
      <h1 className="text-2xl font-bold mb-2">Checkout</h1>
      <p className="text-slate-600 mb-4">This demo uses cart in your browser. For production, connect to your payment and order system.</p>
      <form className="grid md:grid-cols-2 gap-4 bg-white p-4 rounded border">
        <input className="border rounded px-3 py-2" placeholder="Full name"/>
        <input className="border rounded px-3 py-2" placeholder="Email"/>
        <input className="border rounded px-3 py-2" placeholder="Phone"/>
        <input className="border rounded px-3 py-2" placeholder="Company"/>
        <input className="border rounded px-3 py-2 md:col-span-2" placeholder="Address"/>
        <button className="md:col-span-2 bg-blue-600 text-white rounded px-4 py-2">Place Order (Demo)</button>
      </form>
    </Layout>
  )
}
