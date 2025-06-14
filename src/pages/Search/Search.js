import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, X, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { searchShoes } from '../../utils/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Search.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  const popularSearches = [
    'Nike Air Max',
    'Adidas Ultraboost',
    'Jordan 1',
    'Running shoes',
    'Basketball shoes',
    'White sneakers',
    'Black shoes',
    'Casual shoes'
  ];

  useEffect(() => {
    const savedSearches = localStorage.getItem('recentSearches');
    if (savedSearches) {
      setRecentSearches(JSON.parse(savedSearches));
    }
  }, []);

  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    }
  }, [searchParams]);

  const performSearch = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const searchResults = await searchShoes(searchQuery);
      setResults(searchResults);
      
      // Save to recent searches
      const updatedRecentSearches = [
        searchQuery,
        ...recentSearches.filter(search => search !== searchQuery)
      ].slice(0, 5);
      
      setRecentSearches(updatedRecentSearches);
      localStorage.setItem('recentSearches', JSON.stringify(updatedRecentSearches));
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query.trim() });
      setShowSuggestions(false);
    }
  };

  const handleQueryChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.trim()) {
      // Generate suggestions based on popular searches
      const filteredSuggestions = popularSearches.filter(search =>
        search.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setSearchParams({ q: suggestion });
    setShowSuggestions(false);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setSearchParams({});
    setShowSuggestions(false);
  };

  const clearRecentSearches = () => {
    setRecentSearches([]);
    localStorage.removeItem('recentSearches');
  };

  return (
    <div className="search-page">
      <div className="container">
        {/* Search Header */}
        <div className="search-header">
          <form className="search-form" onSubmit={handleSearch}>
            <div className="search-input-container">
              <SearchIcon size={20} className="search-icon" />
              <input
                type="text"
                placeholder="Search for shoes, brands, categories..."
                value={query}
                onChange={handleQueryChange}
                className="search-input"
                autoFocus
              />
              {query && (
                <button
                  type="button"
                  className="clear-search"
                  onClick={clearSearch}
                >
                  <X size={20} />
                </button>
              )}
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && (suggestions.length > 0 || recentSearches.length > 0) && (
              <div className="search-suggestions">
                {suggestions.length > 0 && (
                  <div className="suggestion-group">
                    <h4>Suggestions</h4>
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="suggestion-item"
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        <SearchIcon size={16} />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
                
                {recentSearches.length > 0 && (
                  <div className="suggestion-group">
                    <div className="suggestion-group-header">
                      <h4>Recent Searches</h4>
                      <button
                        className="clear-recent"
                        onClick={clearRecentSearches}
                      >
                        Clear
                      </button>
                    </div>
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="suggestion-item recent"
                        onClick={() => handleSuggestionClick(search)}
                      >
                        <SearchIcon size={16} />
                        {search}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </form>
        </div>

        {/* Search Results */}
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Searching...</p>
          </div>
        ) : query ? (
          <div className="search-results">
            <div className="results-header">
              <h2>
                {results.length > 0 
                  ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"`
                  : `No results found for "${query}"`
                }
              </h2>
              {results.length > 0 && (
                <div className="results-actions">
                  <button className="filter-btn">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
              )}
            </div>

            {results.length > 0 ? (
              <div className="results-grid">
                {results.map((shoe, index) => (
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
              <div className="no-results">
                <div className="no-results-content">
                  <SearchIcon size={64} className="no-results-icon" />
                  <h3>No results found</h3>
                  <p>We couldn't find any products matching your search.</p>
                  <div className="search-suggestions-help">
                    <h4>Try searching for:</h4>
                    <div className="popular-searches">
                      {popularSearches.slice(0, 4).map((search, index) => (
                        <button
                          key={index}
                          className="popular-search-btn"
                          onClick={() => handleSuggestionClick(search)}
                        >
                          {search}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="search-home">
            <div className="search-home-content">
              <h2>What are you looking for?</h2>
              <p>Search through our collection of premium footwear</p>
              
              {recentSearches.length > 0 && (
                <div className="recent-searches-section">
                  <div className="section-header">
                    <h3>Recent Searches</h3>
                    <button
                      className="clear-recent"
                      onClick={clearRecentSearches}
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="recent-searches">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        className="recent-search-btn"
                        onClick={() => handleSuggestionClick(search)}
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="popular-searches-section">
                <h3>Popular Searches</h3>
                <div className="popular-searches">
                  {popularSearches.map((search, index) => (
                    <button
                      key={index}
                      className="popular-search-btn"
                      onClick={() => handleSuggestionClick(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>

              <div className="search-tips">
                <h3>Search Tips</h3>
                <ul>
                  <li>Try searching by brand name (e.g., "Nike", "Adidas")</li>
                  <li>Search by shoe type (e.g., "running shoes", "sneakers")</li>
                  <li>Look for specific models (e.g., "Air Max", "Ultraboost")</li>
                  <li>Search by color (e.g., "white shoes", "black sneakers")</li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;