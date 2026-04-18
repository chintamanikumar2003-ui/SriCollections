import { useState, useEffect } from 'react';
import './Home.css';
import { heritageData, otherCollections, categoryData } from '../data/heritageData';

const Home = () => {
    const heroImages = [
        '/hero_earrings_gold_1775926154696.png',
        '/hero_earrings_diamonds_1775926170706.png',
        '/hero_earrings_rose_1775926187997.png',
        '/hero_earrings_pearls_1775926201699.png'
    ];
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cart, setCart] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const handleAddToCart = (product) => {
        if (!cart.find(item => item.id === product.id)) {
            setCart([...cart, product]);
        }
        setIsCartOpen(true);
        setSelectedProduct(null);
    };

    const removeFromCart = (productId) => {
        setCart(cart.filter(item => item.id !== productId));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % heroImages.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [heroImages.length]);

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length);

    return (
        <div className="home-container">
            {/* Navigation Bar */}
            <nav className="navbar">
                <div className="navbar-left">
                    <div className="navbar-top-mobile">
                        <div className="navbar-logo">
                            <h2>Sri Collections</h2>
                        </div>
                        <div className="mobile-menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            ☰
                        </div>
                    </div>
                </div>
                <div className="navbar-right">
                    <ul className={`navbar-links ${isMenuOpen ? 'active' : ''}`}>
                        <li><a href="#hero" onClick={() => setIsMenuOpen(false)}>Home</a></li>
                        <li><a href="#about" onClick={() => setIsMenuOpen(false)}>About</a></li>
                        <li><a href="#collections" onClick={() => setIsMenuOpen(false)}>Collections</a></li>
                        <li><a href="#location" onClick={() => setIsMenuOpen(false)}>Location</a></li>
                        <li className="cart-icon-nav-wrapper" onClick={() => setIsCartOpen(true)}>
                            <span className="heart-icon">❤️</span>
                            {cart.length > 0 && <span className="cart-count">{cart.length}</span>}
                        </li>
                    </ul>
                    <div className="navbar-actions">
                        <button className="btn-primary">Shop Now</button>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section id="hero" className="hero-section">
                <div className="hero-content">
                    <h1>Elegance in Every Detail</h1>
                    <p>Discover our exclusive ladies' ear rings collection, crafted to perfection.</p>
                    <button className="btn-secondary">Explore The Butalu</button>
                </div>
                <div className="hero-visual">
                    <div className="carousel-container">
                        {heroImages.map((imgUrl, index) => (
                            <div
                                key={index}
                                className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${imgUrl})` }}
                            ></div>
                        ))}

                        <button className="carousel-btn prev-btn" onClick={prevSlide}>&#10094;</button>
                        <button className="carousel-btn next-btn" onClick={nextSlide}>&#10095;</button>

                        <div className="carousel-indicators">
                            {heroImages.map((_, index) => (
                                <span
                                    key={index}
                                    className={`dot ${index === currentSlide ? 'active' : ''}`}
                                    onClick={() => setCurrentSlide(index)}
                                ></span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className="about-section">
                <div className="about-text">
                    <h2>Our Story</h2>
                    <p>
                        At Butalu Collections, we believe that true beauty shines through the details.
                        Our collection is inspired by the timeless elegance of traditional craftsmanship combined
                        with modern aesthetics. From delicate rose gold hoops to grand traditional golden jhumkas,
                        every piece tells a story of grace and luxury.
                    </p>
                </div>
                <div className="about-features">
                    <div className="feature-box">
                        <h3>Pure Gold & Silver</h3>
                        <p>100% certified authentic materials.</p>
                    </div>
                    <div className="feature-box">
                        <h3>Handcrafted</h3>
                        <p>Made by artisan masters from around the world.</p>
                    </div>
                    <div className="feature-box">
                        <h3>Timeless Design</h3>
                        <p>Styles that complement every occasion.</p>
                    </div>
                </div>
            </section>

            {/* Collections Section */}
            <section id="collections" className="collections-section">
                <h2>The Royal Collection</h2>
                {!selectedCategory ? (
                    <>
                        <p className="subtitle">Explore our exquisite types of collections</p>
                        <div className="categories-grid">
                            {categoryData.map((cat) => (
                                <div 
                                    className="category-card" 
                                    key={cat.id}
                                    onClick={() => setSelectedCategory(cat.id)}
                                >
                                    <div 
                                        className="category-image"
                                        style={{ backgroundImage: `url(${cat.path})` }}
                                    ></div>
                                    <div className="category-info">
                                        <h3>{cat.title}</h3>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <>
                        <div className="filter-header">
                            <button className="btn-back" onClick={() => setSelectedCategory(null)}>
                                ← Back to Categories
                            </button>
                            <p className="subtitle">Showing: {categoryData.find(c => c.id === selectedCategory)?.title}</p>
                        </div>
                        <div className="cards-grid">
                            {[...heritageData, ...otherCollections]
                                .filter(item => item.category === selectedCategory)
                                .map((item) => (
                                    <div className="card" key={item.id}>
                                        <div
                                            className="card-image"
                                            style={{
                                                backgroundImage: `url(${item.path})`,
                                                backgroundSize: 'cover',
                                                backgroundPosition: 'center',
                                                backgroundColor: '#f4e4bc'
                                            }}
                                        ></div>
                                        <div className="card-info">
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                            <div className="card-actions">
                                                <div className="price-container">
                                                    <span className="original-price">{item.originalPrice}</span>
                                                    <span className="current-price">{item.price}</span>
                                                </div>
                                                <div className="card-buttons">
                                                    <button className="btn-icon-only highlight-icon" title="Add to Wishlist" onClick={() => handleAddToCart(item)}>❤️</button>
                                                    <button className="btn-icon-only highlight-icon" title="Shop Now" onClick={() => window.open(`https://wa.me/1234567890?text=I want to buy: ${item.title}`, '_blank')}>🛍️</button>
                                                    <button className="btn-outline" onClick={() => setSelectedProduct(item)}>Details</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {[...heritageData, ...otherCollections].filter(item => item.category === selectedCategory).length === 0 && (
                                <div className="no-products">
                                    <p>Coming Soon! New arrivals in this category are on their way.</p>
                                    <button className="btn-primary" onClick={() => setSelectedCategory(null)}>Explore Other Categories</button>
                                </div>
                            )}
                        </div>
                    </>
                )}
            </section>

            {/* Location Section */}
            <section id="location" className="location-section">
                <div className="location-container">
                    <div className="location-info">
                        <h2>Visit Our Boutique</h2>
                        <p>Experience the quality and shine in person. Find us at our flagship location.</p>
                        <div className="address">
                            <strong>Butalu Collections</strong><br />
                            123 Elegance Avenue,<br />
                            Jewelry District, NY 10012<br />
                            <br />
                            <strong>Hours:</strong> Mon-Sat, 10am - 8pm
                        </div>
                        <button className="btn-primary" style={{ marginTop: '20px' }}>Get Directions</button>
                    </div>
                    <div className="location-map">
                        <div className="map-placeholder">
                            <p>Interactive Map Will Load Here</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h2>Butalu Collections</h2>
                        <p>Adorn yourself with unmatched elegance.</p>
                    </div>
                    <div className="footer-links">
                        <h4>Quick Links</h4>
                        <ul>
                            <li><a href="#hero">Home</a></li>
                            <li><a href="#collections">Shop</a></li>
                            <li><a href="#about">About Us</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                    </div>
                    <div className="footer-social">
                        <h4>Follow Us</h4>
                        <ul>
                            <li><a href="#">Instagram</a></li>
                            <li><a href="#">Facebook</a></li>
                            <li><a href="#">Pinterest</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Butalu Collections. All rights reserved.</p>
                </div>
            </footer>

            {/* Product Quick View Modal */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProduct(null)}>&times;</button>
                        <div className="modal-body">
                            <div className="modal-left">
                                <div
                                    className={`modal-image-view ${selectedProduct.gradientClass || ''}`}
                                    style={selectedProduct.gradientClass ? {} : { backgroundImage: `url(${selectedProduct.path})` }}
                                ></div>
                            </div>
                            <div className="modal-right">
                                <h2 className="modal-title">{selectedProduct.title}</h2>
                                <p className="modal-origin"><strong>Origination:</strong> {selectedProduct.origin}</p>
                                <div className="modal-price-box">
                                    <span className="modal-old-price">{selectedProduct.originalPrice}</span>
                                    <span className="modal-new-price">{selectedProduct.price}</span>
                                </div>
                                <div className="modal-description">
                                    <h3>Description</h3>
                                    <p>{selectedProduct.description}</p>
                                </div>
                                <div className="modal-actions">
                                    <button className="btn-order" onClick={() => {
                                        window.open(`https://wa.me/1234567890?text=I'm interested in ordering: ${selectedProduct.title}`, '_blank');
                                    }}>
                                        <span>🛒</span> Order Now
                                    </button>
                                    <button className="btn-cart" onClick={() => handleAddToCart(selectedProduct)}>
                                        <span>❤️</span> Add to Wishlist
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Wishlist Sidebar */}
            <div className={`cart-sidebar ${isCartOpen ? 'open' : ''}`}>
                <div className="cart-sidebar-header">
                    <h2>My Wishlist ❤️</h2>
                    <button className="close-sidebar" onClick={() => setIsCartOpen(false)}>&times;</button>
                </div>
                <div className="cart-items-container">
                    {cart.length === 0 ? (
                        <div className="empty-cart">
                            <p>Your wishlist is empty.</p>
                            <button className="btn-secondary" onClick={() => setIsCartOpen(false)}>Start Shopping</button>
                        </div>
                    ) : (
                        <>
                            {cart.map((item) => (
                                <div className="cart-item" key={item.id}>
                                    <div
                                        className={`cart-item-image ${item.gradientClass || ''}`}
                                        style={item.gradientClass ? {} : { backgroundImage: `url(${item.path})` }}
                                    ></div>
                                    <div className="cart-item-info">
                                        <h4>{item.title}</h4>
                                        <p>{item.price}</p>
                                        <button className="btn-remove" onClick={() => removeFromCart(item.id)}>Remove</button>
                                    </div>
                                </div>
                            ))}
                            <div className="cart-footer">
                                <button className="btn-primary checkout-btn" onClick={() => {
                                    const text = `I'm interested in buying:\n${cart.map(i => `- ${i.title} (${i.price})`).join('\n')}`;
                                    window.open(`https://wa.me/1234567890?text=${encodeURIComponent(text)}`, '_blank');
                                }}>
                                    Confirm Order (Order Now)
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {isCartOpen && <div className="sidebar-overlay" onClick={() => setIsCartOpen(false)}></div>}
        </div>
    );
};

export default Home;
