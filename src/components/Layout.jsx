import { Link, NavLink } from 'react-router-dom'

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <Link to="/" className="font-bold text-xl text-slate-900">Automation Store</Link>
          <nav className="flex items-center gap-4 text-sm">
            <NavLink to="/products" className={({isActive}) => `hover:text-blue-600 ${isActive?'text-blue-600':''}`}>Products</NavLink>
            <NavLink to="/categories" className={({isActive}) => `hover:text-blue-600 ${isActive?'text-blue-600':''}`}>Categories</NavLink>
            <NavLink to="/about" className={({isActive}) => `hover:text-blue-600 ${isActive?'text-blue-600':''}`}>About</NavLink>
            <NavLink to="/contact" className={({isActive}) => `hover:text-blue-600 ${isActive?'text-blue-600':''}`}>Contact</NavLink>
            <NavLink to="/cart" className={({isActive}) => `hover:text-blue-600 ${isActive?'text-blue-600':''}`}>Cart</NavLink>
            <NavLink to="/admin" className={({isActive}) => `hover:text-blue-600 ${isActive?'text-blue-600':''}`}>Admin</NavLink>
          </nav>
        </div>
      </header>
      <main className="max-w-7xl mx-auto px-4 py-6">{children}</main>
      <footer className="border-t border-slate-200 py-8 text-center text-sm text-slate-500">© {new Date().getFullYear()} Automation Store</footer>
    </div>
  )
}
