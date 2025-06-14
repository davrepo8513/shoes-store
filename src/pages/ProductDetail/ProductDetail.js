import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw, 
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Minus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getShoeById } from '../../utils/database';
import { useCart } from '../../context/CartContext';
import ProductCard from '../../components/ProductCard/ProductCard';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  
  const [shoe, setShoe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [is360View, setIs360View] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  useEffect(() => {
    const loadShoe = async () => {
      try {
        const shoeData = await getShoeById(id);
        if (shoeData) {
          setShoe(shoeData);
          setSelectedSize(shoeData.sizes[0]);
          setSelectedColor(shoeData.colors[0]);
        }
      } catch (error) {
        console.error('Error loading shoe:', error);
      } finally {
        setLoading(false);
      }
    };

    loadShoe();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      alert('Please select size and color');
      return;
    }
    
    addToCart(shoe, selectedSize, selectedColor, quantity);
    // Show success message (implement toast notification)
    console.log(`Added ${quantity} ${shoe.name} to cart`);
  };

  const handle360View = () => {
    setIs360View(!is360View);
    setRotation(0);
  };

  const handleMouseMove = (e) => {
    if (is360View) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const rotation = (x / rect.width) * 360;
      setRotation(rotation);
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % shoe.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + shoe.images.length) % shoe.images.length);
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!shoe) {
    return (
      <div className="error-container">
        <h2>Product not found</h2>
        <Link to="/" className="back-home-btn">Back to Home</Link>
      </div>
    );
  }

  const discountPercentage = shoe.originalPrice > shoe.price 
    ? Math.round(((shoe.originalPrice - shoe.price) / shoe.originalPrice) * 100)
    : 0;

  return (
    <div className="product-detail">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to={`/category/${shoe.category.toLowerCase()}`}>{shoe.category}</Link>
          <span>/</span>
          <span>{shoe.name}</span>
        </nav>

        <div className="product-detail-content">
          {/* Image Gallery */}
          <div className="product-gallery">
            <div className="main-image-container">
              <div 
                className={`main-image ${is360View ? 'view-360' : ''}`}
                onMouseMove={handleMouseMove}
                style={is360View ? { transform: `rotateY(${rotation}deg)` } : {}}
              >
                <img
                  src={shoe.images[currentImageIndex]}
                  alt={shoe.name}
                  className={isZoomed ? 'zoomed' : ''}
                />
                
                {/* Image Navigation */}
                <button className="image-nav prev" onClick={prevImage}>
                  <ChevronLeft size={24} />
                </button>
                <button className="image-nav next" onClick={nextImage}>
                  <ChevronRight size={24} />
                </button>

                {/* Image Controls */}
                <div className="image-controls">
                  <button 
                    className={`control-btn ${is360View ? 'active' : ''}`}
                    onClick={handle360View}
                    title="360° View"
                  >
                    <RotateCcw size={20} />
                  </button>
                  <button 
                    className={`control-btn ${isZoomed ? 'active' : ''}`}
                    onClick={() => setIsZoomed(!isZoomed)}
                    title="Zoom"
                  >
                    <ZoomIn size={20} />
                  </button>
                </div>

                {is360View && (
                  <div className="view-360-indicator">
                    <span>360° View - Move mouse to rotate</span>
                  </div>
                )}
              </div>

              {/* Thumbnail Gallery */}
              <div className="thumbnail-gallery">
                {shoe.images.map((image, index) => (
                  <button
                    key={index}
                    className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                    onClick={() => setCurrentImageIndex(index)}
                  >
                    <img src={image} alt={`${shoe.name} view ${index + 1}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info">
            <div className="product-header">
              <div className="brand-category">
                <span className="brand">{shoe.brand}</span>
                <span className="category">{shoe.category}</span>
              </div>
              <button 
                className={`like-btn ${isLiked ? 'liked' : ''}`}
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart size={24} fill={isLiked ? 'currentColor' : 'none'} />
              </button>
            </div>

            <h1 className="product-title">{shoe.name}</h1>

            {/* Rating */}
            <div className="product-rating">
              <div className="stars">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill={index < Math.floor(shoe.rating) ? '#fbbf24' : 'none'}
                    color="#fbbf24"
                  />
                ))}
              </div>
              <span className="rating-text">
                {shoe.rating} ({shoe.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="product-price">
              <span className="current-price">${shoe.price}</span>
              {shoe.originalPrice > shoe.price && (
                <>
                  <span className="original-price">${shoe.originalPrice}</span>
                  <span className="discount">Save {discountPercentage}%</span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="stock-status">
              {shoe.stock > 10 ? (
                <span className="in-stock">
                  <Check size={16} />
                  In Stock
                </span>
              ) : shoe.stock > 0 ? (
                <span className="low-stock">
                  Only {shoe.stock} left in stock
                </span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>

            {/* Size Selection */}
            <div className="size-selection">
              <h3>Size</h3>
              <div className="size-options">
                {shoe.sizes.map((size) => (
                  <button
                    key={size}
                    className={`size-option ${selectedSize === size ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div className="color-selection">
              <h3>Color: <span className="selected-color">{selectedColor}</span></h3>
              <div className="color-options">
                {shoe.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-option ${selectedColor === color ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(color)}
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
              </div>
            </div>

            {/* Quantity */}
            <div className="quantity-selection">
              <h3>Quantity</h3>
              <div className="quantity-controls">
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus size={16} />
                </button>
                <span className="quantity-value">{quantity}</span>
                <button 
                  className="quantity-btn"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="add-to-cart-section">
              <button 
                className="add-to-cart-btn"
                onClick={handleAddToCart}
                disabled={shoe.stock === 0}
              >
                <ShoppingCart size={20} />
                Add to Cart - ${(shoe.price * quantity).toFixed(2)}
              </button>
              <button className="buy-now-btn">
                Buy Now
              </button>
            </div>

            {/* Features */}
            <div className="product-features">
              <div className="feature">
                <Truck size={20} />
                <span>Free shipping on orders over $75</span>
              </div>
              <div className="feature">
                <Shield size={20} />
                <span>100% authentic guarantee</span>
              </div>
              <div className="feature">
                <RotateCcw size={20} />
                <span>30-day return policy</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="product-tabs">
          <div className="tab-headers">
            <button 
              className={`tab-header ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </button>
            <button 
              className={`tab-header ${activeTab === 'features' ? 'active' : ''}`}
              onClick={() => setActiveTab('features')}
            >
              Features
            </button>
            <button 
              className={`tab-header ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews ({shoe.reviews})
            </button>
          </div>

          <div className="tab-content">
            <AnimatePresence mode="wait">
              {activeTab === 'description' && (
                <motion.div
                  key="description"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="tab-panel"
                >
                  <p>{shoe.description}</p>
                </motion.div>
              )}

              {activeTab === 'features' && (
                <motion.div
                  key="features"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="tab-panel"
                >
                  <ul className="features-list">
                    {shoe.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div
                  key="reviews"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="tab-panel"
                >
                  <div className="reviews-summary">
                    <div className="rating-breakdown">
                      <div className="overall-rating">
                        <span className="rating-number">{shoe.rating}</span>
                        <div className="stars">
                          {[...Array(5)].map((_, index) => (
                            <Star
                              key={index}
                              size={20}
                              fill={index < Math.floor(shoe.rating) ? '#fbbf24' : 'none'}
                              color="#fbbf24"
                            />
                          ))}
                        </div>
                        <span className="total-reviews">Based on {shoe.reviews} reviews</span>
                      </div>
                    </div>
                  </div>
                  <p>Reviews feature coming soon...</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;