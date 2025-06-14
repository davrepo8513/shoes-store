import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { ToastProvider } from './components/Toast/Toast';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import ProductDetail from './pages/ProductDetail/ProductDetail';
import Cart from './pages/Cart/Cart';
import Category from './pages/Category/Category';
import Search from './pages/Search/Search';
import Brands from './pages/Brands/Brands';
import Featured from './pages/Featured/Featured';
import Profile from './pages/Profile/Profile';
import Footer from './components/Footer/Footer';
import './App.css';

function App() {
  return (
    <ToastProvider>
      <WishlistProvider>
        <CartProvider>
          <Router>
            <div className="App">
              <Header />
              <main className="main-content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/category/:category" element={<Category />} />
                  <Route path="/search" element={<Search />} />
                  <Route path="/brands" element={<Brands />} />
                  <Route path="/featured" element={<Featured />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </WishlistProvider>
    </ToastProvider>
  );
}

export default App;
