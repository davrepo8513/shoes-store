import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useToast } from '../Toast/Toast';
import './ProductListItem.css';

const ProductListItem = ({ shoe }) => {
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
    success(`Added ${shoe.name} to cart!`);
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

  const discountPercentage = shoe.originalPrice > shoe.price 
    ? Math.round(((shoe.originalPrice - shoe.price) / shoe.price) * 100)
    : 0;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  return (
    <motion.div
      className="product-list-item"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Link to={`/product/${shoe.id}`} className="product-link">
        {/* Product Image */}
        <div className="product-image">
          <img 
            src={shoe.images[0]} 
            alt={shoe.name}
            loading="lazy"
          />
          {discountPercentage > 0 && (
            <div className="discount-badge">
              -{discountPercentage}%
            </div>
          )}
          {shoe.isNew && (
            <div className="new-badge">
              New
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="product-info">
          <div className="product-main-info">
            <div className="product-brand">{shoe.brand}</div>
            <h3 className="product-name">{shoe.name}</h3>
            <div className="product-category">{shoe.category}</div>
            
            {/* Rating */}
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    fill={i < Math.floor(shoe.rating) ? '#fbbf24' : 'none'}
                    color={i < Math.floor(shoe.rating) ? '#fbbf24' : '#d1d5db'}
                  />
                ))}
              </div>
              <span className="rating-text">
                {shoe.rating} ({shoe.reviews.toLocaleString()} reviews)
              </span>
            </div>

            {/* Features */}
            <div className="product-features">
              {shoe.features.slice(0, 3).map((feature, index) => (
                <span key={index} className="feature-tag">
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Price and Actions */}
          <div className="product-actions">
            <div className="price-section">
              <div className="current-price">{formatPrice(shoe.price)}</div>
              {shoe.originalPrice > shoe.price && (
                <div className="original-price">{formatPrice(shoe.originalPrice)}</div>
              )}
            </div>

            <div className="action-buttons">
              <button
                className={`action-btn wishlist-btn ${isLiked ? 'liked' : ''}`}
                onClick={handleLike}
                title="Add to Wishlist"
              >
                <Heart size={18} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
              
              <Link
                to={`/product/${shoe.id}`}
                className="action-btn view-btn"
                title="View Details"
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
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductListItem;