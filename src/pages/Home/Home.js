import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Star, TrendingUp, Award, Truck } from 'lucide-react';
import { motion } from 'framer-motion';
import { getShoes, getFeaturedShoes } from '../../utils/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import Hero from '../../components/Hero/Hero';
import './Home.css';

const Home = () => {
  const [featuredShoes, setFeaturedShoes] = useState([]);
  const [allShoes, setAllShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [featured, all] = await Promise.all([
          getFeaturedShoes(),
          getShoes()
        ]);
        setFeaturedShoes(featured);
        setAllShoes(all);
      } catch (error) {
        console.error('Error loading shoes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const categories = [
    {
      name: 'Running',
      image: '/images/category-running.jpg',
      path: '/category/running',
      description: 'Performance shoes for every runner'
    },
    {
      name: 'Basketball',
      image: '/images/category-basketball.jpg',
      path: '/category/basketball',
      description: 'Court-ready shoes for peak performance'
    },
    {
      name: 'Casual',
      image: '/images/category-casual.jpg',
      path: '/category/casual',
      description: 'Everyday comfort and style'
    },
    {
      name: 'Skateboarding',
      image: '/images/category-skateboarding.jpg',
      path: '/category/skateboarding',
      description: 'Durable shoes built for skating'
    }
  ];

  const features = [
    {
      icon: <Truck size={32} />,
      title: 'Free Shipping',
      description: 'Free shipping on orders over $75'
    },
    {
      icon: <Award size={32} />,
      title: 'Quality Guarantee',
      description: '100% authentic products guaranteed'
    },
    {
      icon: <Star size={32} />,
      title: 'Customer Reviews',
      description: 'Thousands of satisfied customers'
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Latest Trends',
      description: 'Stay ahead with the newest releases'
    }
  ];

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading amazing shoes...</p>
      </div>
    );
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find the perfect shoes for every occasion</p>
          </div>
          <div className="categories-grid">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                className="category-card"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <Link to={category.path} className="category-link">
                  <div className="category-image">
                    <img src={category.image} alt={category.name} />
                    <div className="category-overlay">
                      <h3>{category.name}</h3>
                      <p>{category.description}</p>
                      <span className="category-arrow">
                        <ChevronRight size={20} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Handpicked favorites from top brands</p>
          </div>
          <div className="products-grid">
            {featuredShoes.map((shoe, index) => (
              <motion.div
                key={shoe.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <ProductCard shoe={shoe} />
              </motion.div>
            ))}
          </div>
          <div className="section-footer">
            <Link to="/featured" className="view-all-button">
              View All Featured
              <ChevronRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="new-arrivals-section">
        <div className="container">
          <div className="section-header">
            <h2>New Arrivals</h2>
            <p>Fresh styles just dropped</p>
          </div>
          <div className="products-grid">
            {allShoes
              .filter(shoe => shoe.isNew)
              .slice(0, 4)
              .map((shoe, index) => (
                <motion.div
                  key={shoe.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <ProductCard shoe={shoe} />
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter-section">
        <div className="container">
          <motion.div
            className="newsletter-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2>Stay in the Loop</h2>
            <p>Get the latest updates on new arrivals, exclusive deals, and more</p>
            <form className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="newsletter-input"
              />
              <button type="submit" className="newsletter-button">
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;