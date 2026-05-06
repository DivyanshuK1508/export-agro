import { useState } from "react";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ";
import "../style/Home.css";

function FAQPage() {
  const [activeQuickTopic, setActiveQuickTopic] = useState(null);

  const quickTopics = [
    { icon: "🚀", label: "Getting Started", description: "Learn the basics", link: "/howto" },
    { icon: "🌾", label: "Crop Selection", description: "How we recommend", link: "/recommend" }
  ];

  return (
    <div className="page faq-page">
      <div className="faq-hero-enhanced premium-hero-base">
        {/* Elegant Landscape */}
        <div className="landscape-scene">
          <div className="horizon-glow"></div>
          <div className="field-layer layer-1"></div>
          <div className="field-layer layer-2"></div>
          <div className="field-layer layer-3"></div>
          <div className="field-layer layer-4"></div>
          <div className="field-texture"></div>
        </div>
        
        {/* Premium Background Elements */}
        <div className="hero-grid-pattern"></div>
        <div className="hero-glow-orb orb-1"></div>
        <div className="hero-glow-orb orb-2"></div>
        <div className="hero-glow-orb orb-3"></div>
        <div className="hero-particles">
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
          <span className="particle"></span>
        </div>
        <div className="hero-border-glow"></div>
        
        {/* Animated background elements */}
        <div className="faq-hero-bg-elements">
          <div className="bg-circle circle-1"></div>
          <div className="bg-circle circle-2"></div>
          <div className="bg-circle circle-3"></div>
          <div className="bg-wave"></div>
        </div>

        <div className="faq-hero-main">
          <div className="faq-hero-content-enhanced">
            <div className="faq-hero-badge-modern">
              <span className="badge-glow"></span>
              <span className="badge-text">Support Center</span>
            </div>
            
            <h1 className="faq-hero-title">
              How Can We <span className="highlight-text">Help You</span> Today?
            </h1>
            
            <p className="faq-hero-subtitle">
              Find instant answers to common questions about our crop recommendation system.
              Browse by category, search topics, or explore quick links below.
            </p>

            {/* Quick Stats */}
            <div className="faq-quick-stats">
              <div className="stat-item">
                <span className="stat-number">13+</span>
                <span className="stat-label">FAQs Covered</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">5</span>
                <span className="stat-label">Categories</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-number">24/7</span>
                <span className="stat-label">Available</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="faq-hero-actions">
              <Link to="/recommend" className="faq-action-btn primary">
                <span className="btn-icon">🌱</span>
                Try Crop Recommendation
              </Link>
              <Link to="/contact" className="faq-action-btn secondary">
                <span className="btn-icon">✉️</span>
                Contact Support
              </Link>
            </div>
          </div>

          {/* Interactive Quick Topics */}
          <div className="faq-hero-sidebar">
            <div className="quick-topics-card">
              <h3 className="quick-topics-title">
                <span>⚡</span> Quick Topics
              </h3>
              <div className="quick-topics-list">
                {quickTopics.map((topic, index) => (
                  <Link
                    to={topic.link}
                    key={index}
                    className={`quick-topic-item ${activeQuickTopic === index ? 'active' : ''}`}
                    onMouseEnter={() => setActiveQuickTopic(index)}
                    onMouseLeave={() => setActiveQuickTopic(null)}
                  >
                    <span className="topic-icon">{topic.icon}</span>
                    <div className="topic-content">
                      <span className="topic-label">{topic.label}</span>
                      <span className="topic-description">{topic.description}</span>
                    </div>
                    <span className="topic-arrow">→</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="faq-floating-elements">
              <span className="floating-el el-1">❓</span>
              <span className="floating-el el-2">💡</span>
              <span className="floating-el el-3">✨</span>
            </div>
          </div>
        </div>

        <div className="crop-scroll-cue faq-scroll-cue" aria-label="Swipe up to see the FAQs">
          <span className="crop-swipe-text">SWIPE UP TO SEE THE FAQS</span>
          <span className="crop-swipe-arrow" aria-hidden="true">↑</span>
        </div>
      </div>
      <FAQ />
    </div>
  );
}

export default FAQPage;
