import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import OrderInquiryModal from '../components/OrderInquiryModal';
import { getAssetUrl } from '../utils/assets';
import { apiFetch } from '../utils/api';
import { productsData as fallbackProducts } from '../data/seedData';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiFetch('/api/products');
        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            setProducts(data.data);
            return;
          }
        }
        throw new Error('API unavailable');
      } catch (err) {
        // Fallback to static seed data
        setProducts(fallbackProducts);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEnquire = (productName = '') => {
    setSelectedProduct(productName);
    setModalOpen(true);
  };

  return (
    <>
      <div className="page-hero">
        <div className="page-hero-overlay"></div>
        <div className="page-hero-content">
          <h1>Community Products</h1>
          <p>Pure, organic, and handmade by HIMWAL's women artisans in rural Uttarakhand.</p>
        </div>
      </div>

      <div className="breadcrumb">
        <div className="container breadcrumb-inner">
          <Link to="/">Home</Link>
          <span className="breadcrumb-sep">›</span>
          <span>Products</span>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Purpose Banner */}
          <div className="products-hero-note purpose-banner">
            <div className="purpose-banner-text">
              <strong>🌿 Pure, Handmade &amp; Organic</strong>
              We empower Pahadi women in rural Uttarakhand by providing them with sustainable livelihood opportunities.
              Every purchase directly supports artisan families and sustains our community initiatives.
            </div>

            <div className="purpose-banner-actions">
              <button onClick={() => handleEnquire('')} className="btn btn-primary">
                Submit Order Enquiry
              </button>
            </div>
          </div>

          {/* Product Grid (Symmetrical 3x2 Layout) */}
          <div className="products-grid" id="products-grid">
            {products.map((product) => (
              <div key={product.name} className="product-card">
                <div className="product-image">
                  <img
                    src={getAssetUrl(product.image)}
                    alt={product.name}
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = getAssetUrl('/LOGO.jpeg');
                    }}
                  />
                </div>
                <div className="product-content">
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="product-footer">
                    <button
                      onClick={() => handleEnquire(product.name)}
                      className="enquire-btn enquire-btn--block"
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Direct PDF Catalogue & WhatsApp Section */}
          <div className="catalog-whatsapp-grid" style={{ marginTop: '48px' }}>
            {/* PDF Download Card */}
            <div className="catalog-card">
              <h3>Explore Our Complete Catalogue &amp; Rates</h3>
              <p>Download our full catalog PDF to view all individual item listings, units, and seasonal pricing.</p>
              <a href={getAssetUrl('/PDFs/finalcatalogue.pdf')} target="_blank" rel="noopener noreferrer">
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                Download Price List (PDF)
              </a>
            </div>

            {/* Compact WhatsApp Card */}
            <div className="whatsapp-card">
              <h4>Got Questions?</h4>
              <p>Quick chat with us on WhatsApp.</p>
              <a
                href="https://wa.me/919068682863?text=Hi%20HIMWAL,%20I%20would%20like%20to%20enquire%20about%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="btn whatsapp-btn"
              >
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
                </svg>
                WhatsApp Chat
              </a>
            </div>
          </div>

          {/* Impact Statement */}
          <div className="impact-note impact-note--tight" style={{ marginTop: '36px' }}>
            <div className="impact-note-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              </svg>
            </div>
            <div className="impact-note-text">
              <h3>Your Purchase Makes a Difference</h3>
              <p>
                Every product you buy is prepared by a woman who has partnered with HIMWAL's livelihood program. The
                income she earns goes directly to her family, supports her children's education, and strengthens her
                rural community. By choosing our organic and handmade goods, you are participating in a cycle of lasting
                change in the Himalayas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pop-up Order / Inquiry Modal */}
      <OrderInquiryModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        selectedProduct={selectedProduct}
      />
    </>
  );
};

export default ProductsPage;
