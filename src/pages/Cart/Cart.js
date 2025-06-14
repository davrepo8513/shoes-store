import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

  const handleQuantityChange = (cartId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartId);
    } else {
      updateQuantity(cartId, newQuantity);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="empty-cart">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="empty-cart-content"
            >
              <ShoppingBag size={80} className="empty-cart-icon" />
              <h2>Your cart is empty</h2>
              <p>Looks like you haven't added any items to your cart yet.</p>
              <Link to="/" className="continue-shopping-btn">
                <ArrowLeft size={20} />
                Continue Shopping
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <span className="cart-count">{items.length} item{items.length !== 1 ? 's' : ''}</span>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.cartId}
                  className="cart-item"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  layout
                >
                  <div className="item-image">
                    <Link to={`/product/${item.id}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                  </div>

                  <div className="item-details">
                    <div className="item-info">
                      <Link to={`/product/${item.id}`} className="item-name">
                        {item.name}
                      </Link>
                      <div className="item-brand">{item.brand}</div>
                      <div className="item-variants">
                        <span className="variant">Size: {item.size}</span>
                        <span className="variant">Color: {item.color}</span>
                      </div>
                    </div>

                    <div className="item-actions">
                      <div className="quantity-controls">
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.cartId, item.quantity - 1)}
                        >
                          <Minus size={16} />
                        </button>
                        <span className="quantity">{item.quantity}</span>
                        <button
                          className="quantity-btn"
                          onClick={() => handleQuantityChange(item.cartId, item.quantity + 1)}
                        >
                          <Plus size={16} />
                        </button>
                      </div>

                      <div className="item-price">
                        {formatPrice(item.price * item.quantity)}
                      </div>

                      <div className="item-controls">
                        <button
                          className="control-btn wishlist-btn"
                          title="Move to Wishlist"
                        >
                          <Heart size={18} />
                        </button>
                        <button
                          className="control-btn remove-btn"
                          onClick={() => removeFromCart(item.cartId)}
                          title="Remove from Cart"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <div className="cart-actions">
              <Link to="/" className="continue-shopping">
                <ArrowLeft size={20} />
                Continue Shopping
              </Link>
              <button className="clear-cart-btn" onClick={clearCart}>
                Clear Cart
              </button>
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-card">
              <h3>Order Summary</h3>
              
              <div className="summary-row">
                <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>

              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-shipping">
                  {getCartTotal() >= 75 ? 'Free' : formatPrice(9.99)}
                </span>
              </div>

              <div className="summary-row">
                <span>Tax</span>
                <span>{formatPrice(getCartTotal() * 0.08)}</span>
              </div>

              <div className="summary-divider"></div>

              <div className="summary-row total-row">
                <span>Total</span>
                <span>
                  {formatPrice(
                    getCartTotal() + 
                    (getCartTotal() >= 75 ? 0 : 9.99) + 
                    (getCartTotal() * 0.08)
                  )}
                </span>
              </div>

              {getCartTotal() < 75 && (
                <div className="shipping-notice">
                  <p>Add {formatPrice(75 - getCartTotal())} more for free shipping!</p>
                  <div className="shipping-progress">
                    <div 
                      className="shipping-progress-bar"
                      style={{ width: `${(getCartTotal() / 75) * 100}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <button className="checkout-btn">
                Proceed to Checkout
              </button>

              <div className="payment-methods">
                <p>We accept:</p>
                <div className="payment-icons">
                  <div className="payment-icon visa">VISA</div>
                  <div className="payment-icon mastercard">MC</div>
                  <div className="payment-icon amex">AMEX</div>
                  <div className="payment-icon paypal">PayPal</div>
                </div>
              </div>

              <div className="security-badges">
                <div className="security-badge">
                  🔒 Secure Checkout
                </div>
                <div className="security-badge">
                  ↩️ 30-Day Returns
                </div>
              </div>
            </div>

            <div className="promo-code">
              <h4>Have a promo code?</h4>
              <div className="promo-input-group">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="promo-input"
                />
                <button className="apply-promo-btn">Apply</button>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="recommended-section">
          <h3>You might also like</h3>
          <div className="recommended-notice">
            <p>Recommended products feature coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;