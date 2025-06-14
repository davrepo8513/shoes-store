import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  CreditCard,
  Shield,
  Truck,
  RotateCcw
} from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', path: '/new-arrivals' },
      { name: 'Best Sellers', path: '/best-sellers' },
      { name: 'Sale', path: '/sale' },
      { name: 'Men\'s Shoes', path: '/category/mens' },
      { name: 'Women\'s Shoes', path: '/category/womens' },
      { name: 'Kids\' Shoes', path: '/category/kids' }
    ],
    categories: [
      { name: 'Running', path: '/category/running' },
      { name: 'Basketball', path: '/category/basketball' },
      { name: 'Casual', path: '/category/casual' },
      { name: 'Skateboarding', path: '/category/skateboarding' },
      { name: 'Lifestyle', path: '/category/lifestyle' },
      { name: 'Athletic', path: '/category/athletic' }
    ],
    brands: [
      { name: 'Nike', path: '/brand/nike' },
      { name: 'Adidas', path: '/brand/adidas' },
      { name: 'Jordan', path: '/brand/jordan' },
      { name: 'Converse', path: '/brand/converse' },
      { name: 'Vans', path: '/brand/vans' },
      { name: 'New Balance', path: '/brand/new-balance' }
    ],
    support: [
      { name: 'Contact Us', path: '/contact' },
      { name: 'Size Guide', path: '/size-guide' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns', path: '/returns' },
      { name: 'FAQ', path: '/faq' },
      { name: 'Track Order', path: '/track-order' }
    ],
    company: [
      { name: 'About Us', path: '/about' },
      { name: 'Careers', path: '/careers' },
      { name: 'Press', path: '/press' },
      { name: 'Sustainability', path: '/sustainability' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms of Service', path: '/terms' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com' }
  ];

  const features = [
    { icon: Truck, title: 'Free Shipping', description: 'On orders over $75' },
    { icon: RotateCcw, title: 'Easy Returns', description: '30-day return policy' },
    { icon: Shield, title: 'Secure Payment', description: '100% secure checkout' },
    { icon: CreditCard, title: 'Multiple Payment', description: 'Various payment options' }
  ];

  return (
    <footer className="footer">
      {/* Features Section */}
      <div className="footer-features">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-item">
                <feature.icon size={32} className="feature-icon" />
                <div className="feature-content">
                  <h4>{feature.title}</h4>
                  <p>{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="footer-newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-text">
              <h3>Stay in the Loop</h3>
              <p>Subscribe to get special offers, free giveaways, and exclusive deals.</p>
            </div>
            <form className="newsletter-form">
              <div className="newsletter-input-group">
                <Mail size={20} className="newsletter-icon" />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-button">
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Section */}
            <div className="footer-brand">
              <Link to="/" className="footer-logo">
                <span className="logo-text">SoleStore</span>
              </Link>
              <p className="brand-description">
                Your ultimate destination for premium footwear. We bring you the latest styles 
                from top brands with unmatched quality and service.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <Phone size={16} />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-item">
                  <Mail size={16} />
                  <span>hello@solestore.com</span>
                </div>
                <div className="contact-item">
                  <MapPin size={16} />
                  <span>123 Fashion Street, NY 10001</span>
                </div>
              </div>
              <div className="social-links">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.name}
                  >
                    <social.icon size={20} />
                  </a>
                ))}
              </div>
            </div>

            {/* Footer Links */}
            <div className="footer-links">
              <div className="link-group">
                <h4>Shop</h4>
                <ul>
                  {footerLinks.shop.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-group">
                <h4>Categories</h4>
                <ul>
                  {footerLinks.categories.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-group">
                <h4>Brands</h4>
                <ul>
                  {footerLinks.brands.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-group">
                <h4>Support</h4>
                <ul>
                  {footerLinks.support.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="link-group">
                <h4>Company</h4>
                <ul>
                  {footerLinks.company.map((link, index) => (
                    <li key={index}>
                      <Link to={link.path}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              <p>&copy; {currentYear} SoleStore. All rights reserved.</p>
            </div>
            <div className="payment-methods">
              <span>We accept:</span>
              <div className="payment-icons">
                <div className="payment-icon visa">VISA</div>
                <div className="payment-icon mastercard">MC</div>
                <div className="payment-icon amex">AMEX</div>
                <div className="payment-icon paypal">PayPal</div>
                <div className="payment-icon apple-pay">Apple Pay</div>
                <div className="payment-icon google-pay">Google Pay</div>
              </div>
            </div>
            <div className="legal-links">
              <Link to="/privacy">Privacy Policy</Link>
              <Link to="/terms">Terms of Service</Link>
              <Link to="/cookies">Cookie Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;