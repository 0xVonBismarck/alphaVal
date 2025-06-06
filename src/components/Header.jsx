import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function Header() {
  const location = useLocation();
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="header-title">
          <h1>Alpha Token Supply Projection</h1>
        </Link>
        <nav className="header-nav">
          <Link to="/docs" className={`nav-link ${location.pathname === '/docs' ? 'active' : ''}`}>
            Docs
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  )
}

export default Header 