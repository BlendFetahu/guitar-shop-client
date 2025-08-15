import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function PageFrame({ children }: { children: ReactNode }) {
  const loc = useLocation()
  return (
    <div className="app-shell">
      <header className="app-header">
        <Link to="/brands" className="brand">Online Guitar Shop</Link>
        <nav className="crumbs">{loc.pathname}</nav>
      </header>
      <main className="app-main">{children}</main>
    </div>
  )
}