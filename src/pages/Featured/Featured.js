import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, TrendingUp, Award, Zap } from 'lucide-react';
import { getFeaturedShoes, getShoes } from '../../utils/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Featured.css';

const Featured = () => {
  const [featuredShoes, setFeaturedShoes] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeaturedData = async () => {
      setLoading(true);
      try {
        const [featured, allShoes] = await Promise.all([
          getFeaturedShoes(),
          getShoes()
        ]);
        
        setFeaturedShoes(featured);
        
        // Get new arrivals (shoes marked as new)
        const newItems = allShoes.filter(shoe => shoe.isNew);
        setNewArrivals(newItems);
        
        // Get best sellers (shoes with high ratings and reviews)
        const bestSelling = allShoes
          .filter(shoe => shoe.rating >= 4.5 && shoe.reviews >= 1000)
          .sort((a, b) => b.reviews - a.reviews)
          .slice(0, 6);
        setBestSellers(bestSelling);
        
      } catch (error) {
        console.error('Error loading featured data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFeaturedData();
  }, []);

  if (loading) {
    return (
      <div className="featured-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading featured products...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="featured-page">
      <div className="container">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="featured-hero"
        >
          <div className="hero-content">
            <div className="hero-badge">
              <Star className="badge-icon" />
              <span>Featured Collection</span>
            </div>
            <h1>Handpicked for You</h1>
            <p>Discover our carefully curated selection of premium footwear, featuring the latest trends and timeless classics.</p>
          </div>
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">
                <Award size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{featuredShoes.length}</span>
                <span className="stat-label">Featured Items</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <TrendingUp size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{bestSellers.length}</span>
                <span className="stat-label">Best Sellers</span>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <Zap size={24} />
              </div>
              <div className="stat-content">
                <span className="stat-number">{newArrivals.length}</span>
                <span className="stat-label">New Arrivals</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Featured Products */}
        {featuredShoes.length > 0 && (
          <section className="featured-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="section-header"
            >
              <div className="section-title">
                <Star className="section-icon" />
                <h2>Featured Products</h2>
              </div>
              <p>Our top picks for this season</p>
            </motion.div>
            <div className="products-grid">
              {featuredShoes.map((shoe, index) => (
                <motion.div
                  key={shoe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.05 }}
                >
                  <ProductCard shoe={shoe} featured />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* New Arrivals */}
        {newArrivals.length > 0 && (
          <section className="featured-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="section-header"
            >
              <div className="section-title">
                <Zap className="section-icon" />
                <h2>New Arrivals</h2>
              </div>
              <p>Fresh styles just landed</p>
            </motion.div>
            <div className="products-grid">
              {newArrivals.map((shoe, index) => (
                <motion.div
                  key={shoe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                >
                  <ProductCard shoe={shoe} isNew />
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <section className="featured-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="section-header"
            >
              <div className="section-title">
                <TrendingUp className="section-icon" />
                <h2>Best Sellers</h2>
              </div>
              <p>Customer favorites that keep selling out</p>
            </motion.div>
            <div className="products-grid">
              {bestSellers.map((shoe, index) => (
                <motion.div
                  key={shoe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.05 }}
                >
                  <ProductCard shoe={shoe} bestSeller />
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default Featured;