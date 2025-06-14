import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getShoes } from '../../utils/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Brands.css';

const Brands = () => {
  const [shoes, setShoes] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('all');
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [loading, setLoading] = useState(true);

  const brands = [
    { name: 'All Brands', value: 'all', logo: '🏷️' },
    { name: 'Nike', value: 'nike', logo: '✓' },
    { name: 'Adidas', value: 'adidas', logo: '⚡' },
    { name: 'Jordan', value: 'jordan', logo: '🏀' },
    { name: 'Converse', value: 'converse', logo: '⭐' },
    { name: 'Vans', value: 'vans', logo: '🛹' },
    { name: 'New Balance', value: 'new balance', logo: '🏃' },
    { name: 'Puma', value: 'puma', logo: '🐾' },
    { name: 'Reebok', value: 'reebok', logo: '💪' }
  ];

  useEffect(() => {
    const loadShoes = async () => {
      setLoading(true);
      try {
        const data = await getShoes();
        setShoes(data);
        setFilteredShoes(data);
      } catch (error) {
        console.error('Error loading shoes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadShoes();
  }, []);

  useEffect(() => {
    if (selectedBrand === 'all') {
      setFilteredShoes(shoes);
    } else {
      const filtered = shoes.filter(shoe => 
        shoe.brand.toLowerCase() === selectedBrand.toLowerCase()
      );
      setFilteredShoes(filtered);
    }
  }, [selectedBrand, shoes]);

  const getBrandStats = (brandValue) => {
    if (brandValue === 'all') return shoes.length;
    return shoes.filter(shoe => 
      shoe.brand.toLowerCase() === brandValue.toLowerCase()
    ).length;
  };

  if (loading) {
    return (
      <div className="brands-page">
        <div className="container">
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading brands...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="brands-page">
      <div className="container">
        {/* Header */}
        <div className="brands-header">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="header-content"
          >
            <h1>Shop by Brand</h1>
            <p>Discover premium footwear from the world's leading brands</p>
          </motion.div>
        </div>

        {/* Brand Filter */}
        <div className="brand-filter">
          <div className="brand-grid">
            {brands.map((brand, index) => (
              <motion.button
                key={brand.value}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`brand-card ${selectedBrand === brand.value ? 'active' : ''}`}
                onClick={() => setSelectedBrand(brand.value)}
              >
                <div className="brand-logo">{brand.logo}</div>
                <div className="brand-info">
                  <h3>{brand.name}</h3>
                  <span className="brand-count">
                    {getBrandStats(brand.value)} products
                  </span>
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="brand-results">
          <div className="results-header">
            <h2>
              {selectedBrand === 'all' 
                ? `All Products (${filteredShoes.length})`
                : `${brands.find(b => b.value === selectedBrand)?.name} (${filteredShoes.length})`
              }
            </h2>
          </div>

          {filteredShoes.length > 0 ? (
            <div className="products-grid">
              {filteredShoes.map((shoe, index) => (
                <motion.div
                  key={shoe.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <ProductCard shoe={shoe} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-content">
                <div className="no-products-icon">👟</div>
                <h3>No products found</h3>
                <p>We don't have any products from this brand yet.</p>
                <Link to="/" className="btn btn-primary">
                  Browse All Products
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Brands;