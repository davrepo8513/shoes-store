import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './Hero.css';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Step Into Style",
      subtitle: "Discover the Latest Collection",
      description: "Find your perfect pair from our curated selection of premium footwear",
      image: "/images/hero-slide-1.jpg",
      buttonText: "Shop Now",
      buttonLink: "/category/running",
      accent: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
    },
    {
      id: 2,
      title: "Performance Meets Comfort",
      subtitle: "Athletic Excellence",
      description: "Engineered for athletes, designed for everyone. Experience the difference.",
      image: "/images/hero-slide-2.jpg",
      buttonText: "Explore Athletic",
      buttonLink: "/category/basketball",
      accent: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)"
    },
    {
      id: 3,
      title: "Timeless Classics",
      subtitle: "Never Goes Out of Style",
      description: "Iconic designs that have stood the test of time, reimagined for today.",
      image: "/images/hero-slide-3.jpg",
      buttonText: "View Classics",
      buttonLink: "/category/casual",
      accent: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <section className="hero">
      <div className="hero-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            className="hero-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="hero-background">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="hero-image"
              />
              <div className="hero-overlay"></div>
            </div>

            <div className="hero-content">
              <motion.div
                className="hero-text"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <span 
                  className="hero-subtitle"
                  style={{ background: slides[currentSlide].accent }}
                >
                  {slides[currentSlide].subtitle}
                </span>
                <h1 className="hero-title">
                  {slides[currentSlide].title}
                </h1>
                <p className="hero-description">
                  {slides[currentSlide].description}
                </p>
                <Link
                  to={slides[currentSlide].buttonLink}
                  className="hero-button"
                  style={{ background: slides[currentSlide].accent }}
                >
                  <ShoppingBag size={20} />
                  {slides[currentSlide].buttonText}
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <button className="hero-nav hero-nav-prev" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>
        <button className="hero-nav hero-nav-next" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>

        {/* Slide Indicators */}
        <div className="hero-indicators">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Progress Bar */}
        <div className="hero-progress">
          <div
            className="hero-progress-bar"
            style={{
              width: `${((currentSlide + 1) / slides.length) * 100}%`,
              background: slides[currentSlide].accent
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;