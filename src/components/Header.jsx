import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'

function Header() {
  return (
    <header className="app-header">
      <div className="header-content">
        <Link to="/" className="header-title">
          <h1>Alpha Token Supply Projection</h1>
        </Link>
        <div className="header-nav">
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default Header 