import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { getShoesByCategory, getShoes } from '../../utils/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import ProductListItem from '../../components/ProductListItem/ProductListItem';
import './Category.css';

const Category = () => {
  const { category } = useParams();
  const [shoes, setShoes] = useState([]);
  const [filteredShoes, setFilteredShoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [filters, setFilters] = useState({
    brands: [],
    priceRange: [0, 300],
    sizes: [],
    colors: [],
    rating: 0
  });

  useEffect(() => {
    const loadShoes = async () => {
      setLoading(true);
      try {
        let shoeData;
        if (category) {
          shoeData = await getShoesByCategory(category);
        } else {
          shoeData = await getShoes();
        }
        setShoes(shoeData);
        setFilteredShoes(shoeData);
      } catch (error) {
        console.error('Error loading shoes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadShoes();
  }, [category]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [shoes, filters, sortBy]); // eslint-disable-line react-hooks/exhaustive-deps

  const applyFiltersAndSort = () => {
    let filtered = [...shoes];

    // Apply brand filter
    if (filters.brands.length > 0) {
      filtered = filtered.filter(shoe => filters.brands.includes(shoe.brand));
    }

    // Apply price range filter
    filtered = filtered.filter(shoe => 
      shoe.price >= filters.priceRange[0] && shoe.price <= filters.priceRange[1]
    );

    // Apply size filter
    if (filters.sizes.length > 0) {
      filtered = filtered.filter(shoe => 
        shoe.sizes.some(size => filters.sizes.includes(size))
      );
    }

    // Apply color filter
    if (filters.colors.length > 0) {
      filtered = filtered.filter(shoe => 
        shoe.colors.some(color => filters.colors.includes(color))
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(shoe => shoe.rating >= filters.rating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => b.isNew - a.isNew);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // featured
        filtered.sort((a, b) => b.isFeatured - a.isFeatured);
    }

    setFilteredShoes(filtered);
  };

  const handleFilterChange = (filterType, value, checked) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      
      if (filterType === 'priceRange') {
        newFilters.priceRange = value;
      } else if (filterType === 'rating') {
        newFilters.rating = value;
      } else {
        if (checked) {
          newFilters[filterType] = [...newFilters[filterType], value];
        } else {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        }
      }
      
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      brands: [],
      priceRange: [0, 300],
      sizes: [],
      colors: [],
      rating: 0
    });
  };

  const getUniqueValues = (key) => {
    const values = shoes.flatMap(shoe => shoe[key]);
    return [...new Set(values)].sort();
  };

  const getUniqueBrands = () => {
    return [...new Set(shoes.map(shoe => shoe.brand))].sort();
  };

  const categoryTitle = category ? 
    category.charAt(0).toUpperCase() + category.slice(1) + ' Shoes' : 
    'All Shoes';

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading {categoryTitle.toLowerCase()}...</p>
      </div>
    );
  }

  return (
    <div className="category-page">
      <div className="container">
        {/* Page Header */}
        <div className="category-header">
          <div className="category-info">
            <h1>{categoryTitle}</h1>
            <p>{filteredShoes.length} product{filteredShoes.length !== 1 ? 's' : ''} found</p>
          </div>
          
          <div className="category-controls">
            <div className="view-controls">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
              >
                <Grid size={20} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
              >
                <List size={20} />
              </button>
            </div>

            <div className="sort-control">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="name">Name A-Z</option>
              </select>
              <ChevronDown size={16} className="sort-icon" />
            </div>

            <button
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={20} />
              Filters
            </button>
          </div>
        </div>

        <div className="category-content">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                className="filters-sidebar"
                initial={{ x: -300, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -300, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="filters-header">
                  <h3>Filters</h3>
                  <button
                    className="close-filters"
                    onClick={() => setShowFilters(false)}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="filters-content">
                  {/* Brand Filter */}
                  <div className="filter-group">
                    <h4>Brand</h4>
                    <div className="filter-options">
                      {getUniqueBrands().map(brand => (
                        <label key={brand} className="filter-option">
                          <input
                            type="checkbox"
                            checked={filters.brands.includes(brand)}
                            onChange={(e) => handleFilterChange('brands', brand, e.target.checked)}
                          />
                          <span className="checkmark"></span>
                          {brand}
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Price Range Filter */}
                  <div className="filter-group">
                    <h4>Price Range</h4>
                    <div className="price-range">
                      <input
                        type="range"
                        min="0"
                        max="300"
                        value={filters.priceRange[1]}
                        onChange={(e) => handleFilterChange('priceRange', [0, parseInt(e.target.value)])}
                        className="price-slider"
                      />
                      <div className="price-labels">
                        <span>$0</span>
                        <span>${filters.priceRange[1]}</span>
                      </div>
                    </div>
                  </div>

                  {/* Size Filter */}
                  <div className="filter-group">
                    <h4>Size</h4>
                    <div className="size-options">
                      {getUniqueValues('sizes').map(size => (
                        <button
                          key={size}
                          className={`size-filter ${filters.sizes.includes(size) ? 'active' : ''}`}
                          onClick={() => handleFilterChange('sizes', size, !filters.sizes.includes(size))}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Color Filter */}
                  <div className="filter-group">
                    <h4>Color</h4>
                    <div className="color-options">
                      {getUniqueValues('colors').map(color => (
                        <button
                          key={color}
                          className={`color-filter ${filters.colors.includes(color) ? 'active' : ''}`}
                          onClick={() => handleFilterChange('colors', color, !filters.colors.includes(color))}
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

                  {/* Rating Filter */}
                  <div className="filter-group">
                    <h4>Minimum Rating</h4>
                    <div className="rating-options">
                      {[4, 3, 2, 1].map(rating => (
                        <button
                          key={rating}
                          className={`rating-filter ${filters.rating === rating ? 'active' : ''}`}
                          onClick={() => handleFilterChange('rating', rating)}
                        >
                          {rating}+ ⭐
                        </button>
                      ))}
                    </div>
                  </div>

                  <button className="clear-filters" onClick={clearFilters}>
                    Clear All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className={`products-container ${showFilters ? 'with-filters' : ''}`}>
            {filteredShoes.length === 0 ? (
              <div className="no-products">
                <h3>No products found</h3>
                <p>Try adjusting your filters or search criteria</p>
                <button onClick={clearFilters} className="clear-filters-btn">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={`products-container ${viewMode}`}>
                {viewMode === 'grid' ? (
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
                  <div className="products-list">
                    {filteredShoes.map((shoe, index) => (
                      <motion.div
                        key={shoe.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <ProductListItem shoe={shoe} />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;