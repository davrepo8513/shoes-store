import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartItemsCount } = useCart();
  const { getWishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const categories = [
    { name: 'Running', path: '/category/running' },
    { name: 'Basketball', path: '/category/basketball' },
    { name: 'Casual', path: '/category/casual' },
    { name: 'Skateboarding', path: '/category/skateboarding' },
    { name: 'Lifestyle', path: '/category/lifestyle' }
  ];

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo" style={{padding: 'inherit'}}>
          <span className="logo-text">SoleStore</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav">
          <Link to="/" className="nav-link">Home</Link>
          <div className="dropdown">
            <span className="nav-link dropdown-trigger">Categories</span>
            <div className="dropdown-content">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="dropdown-link"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <Link to="/featured" className="nav-link">Featured</Link>
          <Link to="/brands" className="nav-link">Brands</Link>
        </nav>

        {/* Search Bar */}
        <form className="search-form" onSubmit={handleSearch}>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search shoes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <button type="submit" className="search-button">
              <Search size={20} />
            </button>
          </div>
        </form>

        {/* Header Actions */}
        <div className="header-actions">
          <Link to="/profile" className="action-button" title="Profile">
            <User size={24} />
          </Link>
          <Link to="/wishlist" className="action-button wishlist-button" title="Wishlist">
            <Heart size={24} />
            {getWishlistCount() > 0 && (
              <span className="wishlist-badge">{getWishlistCount()}</span>
            )}
          </Link>
          <Link to="/cart" className="action-button cart-button" title="Shopping Cart">
            <ShoppingCart size={24} />
            {getCartItemsCount() > 0 && (
              <span className="cart-badge">{getCartItemsCount()}</span>
            )}
          </Link>
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-menu-content">
            <Link to="/" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Home
            </Link>
            <div className="mobile-category-section">
              <span className="mobile-category-title">Categories</span>
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="mobile-nav-link mobile-category-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
            <Link to="/featured" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Featured
            </Link>
            <Link to="/brands" className="mobile-nav-link" onClick={() => setIsMenuOpen(false)}>
              Brands
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;