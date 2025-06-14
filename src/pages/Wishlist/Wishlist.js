import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/Toast/Toast';
import './Wishlist.css';

const Wishlist = () => {
  const { items: wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { success } = useToast();

  const handleAddToCartFromWishlist = (item) => {
    try {
      addToCart(item, item.sizes[0], item.colors[0], 1);
      success(`Added ${item.name} to cart!`);
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleRemoveFromWishlist = (itemId, itemName) => {
    removeFromWishlist(itemId);
    success(`Removed ${itemName} from wishlist`);
  };

  return (
    <div className="wishlist-page">
      <div className="container">
        {/* Header */}
        <div className="wishlist-page-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <div className="wishlist-title-section">
            <h1>My Wishlist</h1>
            <p>{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved</p>
          </div>
        </div>

        {/* Content */}
        {wishlistItems.length === 0 ? (
          <div className="empty-wishlist">
            <div className="empty-wishlist-content">
              <Heart size={80} className="empty-icon" />
              <h2>Your wishlist is empty</h2>
              <p>Start adding items to your wishlist by clicking the heart icon on products you love.</p>
              <Link to="/" className="browse-products-btn">
                Browse Products
              </Link>
            </div>
          </div>
        ) : (
          <div className="wishlist-grid">
            {wishlistItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="wishlist-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={`/product/${item.id}`} className="wishlist-card-link">
                  <div className="wishlist-card-image">
                    <img src={item.images[0]} alt={item.name} />
                    {item.isNew && <span className="new-badge">New</span>}
                    {item.originalPrice > item.price && (
                      <span className="discount-badge">
                        -{Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                      </span>
                    )}
                  </div>
                  <div className="wishlist-card-info">
                    <div className="brand">{item.brand}</div>
                    <div className="name">{item.name}</div>
                    <div className="price">
                      <span className="current-price">${item.price}</span>
                      {item.originalPrice > item.price && (
                        <span className="original-price">${item.originalPrice}</span>
                      )}
                    </div>
                    <div className="rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`star ${i < Math.floor(item.rating) ? 'filled' : ''}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      <span className="rating-text">({item.reviews})</span>
                    </div>
                  </div>
                </Link>
                <div className="wishlist-card-actions">
                  <button
                    className="action-btn add-to-cart-btn"
                    onClick={() => handleAddToCartFromWishlist(item)}
                    title="Add to Cart"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                  <button
                    className="action-btn remove-btn"
                    onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                    title="Remove from Wishlist"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;