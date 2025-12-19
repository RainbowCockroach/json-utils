import { Link, useLocation } from 'react-router-dom'

function Layout({ children }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <div className="container">
      <header>
        <h1>JSON Utils</h1>
        {!isHome && (
          <nav className="nav">
            <Link to="/">← Back to Home</Link>
          </nav>
        )}
      </header>
      <main>
        {children}
      </main>
    </div>
  )
}

export default Layout