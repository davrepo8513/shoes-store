import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../Toast/Toast';
import './ProductCard.css';

const ProductCard = ({ shoe }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { success } = useToast();
  
  const isLiked = isInWishlist(shoe.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add with default size and color for quick add
    const defaultSize = shoe.sizes[0];
    const defaultColor = shoe.colors[0];
    
    addToCart(shoe, defaultSize, defaultColor, 1);
    
    // Show success feedback (you can implement a toast notification here)
    console.log(`Added ${shoe.name} to cart`);
  };

  const handleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isLiked) {
      removeFromWishlist(shoe.id);
      success(`Removed ${shoe.name} from wishlist`);
    } else {
      addToWishlist(shoe);
      success(`Added ${shoe.name} to wishlist`);
    }
  };

  const handleImageHover = (index) => {
    setCurrentImageIndex(index);
  };

  const discountPercentage = shoe.originalPrice > shoe.price 
    ? Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100)
    : 0;

  return (
    <motion.div
      className="product-card"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${shoe.id}`} className="product-link">
        <div className="product-image-container">
          <img
            src={shoe.images[currentImageIndex]}
            alt={shoe.name}
            className="product-image"
          />
          
          {/* Image dots for hover effect */}
          <div className="image-dots">
            {shoe.images.slice(0, 4).map((_, index) => (
              <button
                key={index}
                className={`image-dot ${index === currentImageIndex ? 'active' : ''}`}
                onMouseEnter={() => handleImageHover(index)}
              />
            ))}
          </div>

          {/* Badges */}
          <div className="product-badges">
            {shoe.isNew && (
              <span className="badge badge-new">
                <Zap size={12} />
                New
              </span>
            )}
            {discountPercentage > 0 && (
              <span className="badge badge-sale">
                -{discountPercentage}%
              </span>
            )}
            {shoe.stock < 10 && (
              <span className="badge badge-low-stock">
                Low Stock
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="product-actions">
            <button
              className={`action-btn like-btn ${isLiked ? 'liked' : ''}`}
              onClick={handleLike}
              title="Add to Wishlist"
            >
              <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
            </button>
            <Link
              to={`/product/${shoe.id}`}
              className="action-btn view-btn"
              title="Quick View"
            >
              <Eye size={18} />
            </Link>
            <button
              className="action-btn cart-btn"
              onClick={handleAddToCart}
              title="Add to Cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>

          {/* Overlay for hover effect */}
          <div className="product-overlay">
            <button className="quick-add-btn" onClick={handleAddToCart}>
              Quick Add to Cart
            </button>
          </div>
        </div>

        <div className="product-info">
          <div className="product-brand">{shoe.brand}</div>
          <h3 className="product-name">{shoe.name}</h3>
          
          <div className="product-rating">
            <div className="stars">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={14}
                  fill={index < Math.floor(shoe.rating) ? '#fbbf24' : 'none'}
                  color="#fbbf24"
                />
              ))}
            </div>
            <span className="rating-text">
              {shoe.rating} ({shoe.reviews})
            </span>
          </div>

          <div className="product-price">
            <span className="current-price">${shoe.price}</span>
            {shoe.originalPrice > shoe.price && (
              <span className="original-price">${shoe.originalPrice}</span>
            )}
          </div>

          <div className="product-colors">
            {shoe.colors.slice(0, 4).map((color, index) => (
              <div
                key={index}
                className="color-swatch"
                style={{
                  backgroundColor: color.toLowerCase() === 'white' ? '#f3f4f6' :
                                 color.toLowerCase() === 'black' ? '#1f2937' :
                                 color.toLowerCase() === 'red' ? '#ef4444' :
                                 color.toLowerCase() === 'blue' ? '#3b82f6' :
                                 color.toLowerCase() === 'navy' ? '#1e3a8a' :
                                 color.toLowerCase() === 'grey' || color.toLowerCase() === 'gray' ? '#6b7280' :
                                 color.toLowerCase() === 'green' ? '#10b981' :
                                 color.toLowerCase() === 'yellow' ? '#f59e0b' :
                                 color.toLowerCase() === 'pink' ? '#ec4899' :
                                 color.toLowerCase() === 'purple' ? '#8b5cf6' :
                                 '#9ca3af'
                }}
                title={color}
              />
            ))}
            {shoe.colors.length > 4 && (
              <span className="more-colors">+{shoe.colors.length - 4}</span>
            )}
          </div>

          <div className="product-sizes">
            <span className="sizes-label">Sizes:</span>
            <span className="sizes-range">
              {Math.min(...shoe.sizes)} - {Math.max(...shoe.sizes)}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;