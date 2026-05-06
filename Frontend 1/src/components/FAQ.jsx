import { useState } from "react";
import { Link } from "react-router-dom";

function FAQ({ showSearch = true, showCategories = true }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", label: "All Questions", icon: "📋" },
    { id: "general", label: "General", icon: "ℹ️" },
    { id: "usage", label: "How to Use", icon: "🔧" },
    { id: "technical", label: "Technical", icon: "⚙️" },
    { id: "future", label: "Future Plans", icon: "🚀" }
  ];

  const faqs = [
    {
      q: "What is the purpose of this system?",
      a: "To help farmers select the most suitable crops for export based on soil conditions, climate factors, region, and season using data-driven analysis.",
      category: "general",
      icon: "🎯"
    },
    {
      q: "Who can use this tool?",
      a: "This tool is designed for farmers, agricultural advisors, agronomists, and students who are interested in export-oriented crop planning.",
      category: "general",
      icon: "👥"
    },
    {
      q: "What information do I need to use the crop prediction feature?",
      a: "You need basic details such as your region, current season, soil type, approximate rainfall, temperature, and irrigation method.",
      category: "usage",
      icon: "📝"
    },
    {
      q: "How to use this tool?",
      a: "Using this tool is simple! Just navigate to the Crop Recommendation page, fill in your region, season, soil type, rainfall, temperature, and irrigation method, then click submit to get personalized crop recommendations for export.",
      category: "usage",
      icon: "🚀",
      hasLink: true
    },
    {
      q: "Do I need technical knowledge to use this website?",
      a: "No. The website is designed to be simple and easy to use, even for users with limited technical or computer knowledge.",
      category: "usage",
      icon: "💡"
    },
    {
      q: "How does the system recommend crops?",
      a: "The system analyzes user inputs and compares them with historical agricultural, climate, and export data using data analytics and machine learning techniques.",
      category: "technical",
      icon: "🤖"
    },
    {
      q: "Does this system provide real-time market prices?",
      a: "No. The current version uses historical data for analysis. Real-time price and weather integration may be added in future versions.",
      category: "technical",
      icon: "📊"
    },
    {
      q: "How accurate are the crop recommendations?",
      a: "The recommendations are based on historical data and learned patterns. Actual results may vary due to weather changes, soil conditions, and market fluctuations.",
      category: "technical",
      icon: "🎯"
    },
    {
      q: "Can I use this system for all crops?",
      a: "The system currently supports selected major Indian crops with export potential. Support for more crops can be added in future updates.",
      category: "general",
      icon: "🌾"
    },
    {
      q: "Is this system suitable for small-scale farmers?",
      a: "Yes. The system is designed to support both small-scale and large-scale farmers by providing guidance for better crop selection.",
      category: "general",
      icon: "👨‍🌾"
    },
    {
      q: "Does this system replace agricultural experts?",
      a: "No. This system is a decision-support tool and should be used along with expert advice and local farming knowledge.",
      category: "general",
      icon: "🤝"
    },
    {
      q: "What technologies are used in this project?",
      a: "The system uses React.js for the frontend, Python and Flask for the backend, and machine learning libraries for prediction.",
      category: "technical",
      icon: "💻"
    },
    {
      q: "What are the future enhancements planned for this system?",
      a: "Future improvements include real-time data integration, support for more regions and crops, multilingual support, and mobile application development.",
      category: "future",
      icon: "🔮"
    }
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch = faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      {showSearch && (
        <div className="faq-search-container">
          <div className="faq-search-wrapper">
            <span className="faq-search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search frequently asked questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="faq-search-input"
            />
            {searchQuery && (
              <button 
                className="faq-search-clear" 
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      )}

      {showCategories && (
        <div className="faq-categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={`faq-category-btn ${activeCategory === cat.id ? "active" : ""}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <span className="faq-category-icon">{cat.icon}</span>
              <span className="faq-category-label">{cat.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="faq-results-info">
        <span className="faq-count">
          {filteredFaqs.length} {filteredFaqs.length === 1 ? "question" : "questions"} found
        </span>
      </div>

      <div className="faq-list-modern">
        {filteredFaqs.length === 0 ? (
          <div className="faq-no-results">
            <span className="faq-no-results-icon">🔎</span>
            <h3>No questions found</h3>
            <p>Try adjusting your search or category filter</p>
            <button 
              className="faq-reset-btn"
              onClick={() => { setSearchQuery(""); setActiveCategory("all"); }}
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredFaqs.map((f, i) => (
            <div 
              key={i} 
              className={`faq-accordion-item ${activeIndex === i ? "active" : ""}`}
            >
              <button
                className="faq-accordion-header"
                onClick={() => toggleAccordion(i)}
                aria-expanded={activeIndex === i}
              >
                <div className="faq-question-content">
                  <span className="faq-question-icon">{f.icon}</span>
                  <span className="faq-question-text">{f.q}</span>
                </div>
                <span className={`faq-accordion-arrow ${activeIndex === i ? "rotated" : ""}`}>
                  ▼
                </span>
              </button>
              <div className={`faq-accordion-body ${activeIndex === i ? "expanded" : ""}`}>
                <div className="faq-answer-content">
                  <p>{f.a}</p>
                  {f.hasLink && (
                    <div className="faq-link-wrapper">
                      <p>Want to learn more about using this tool?</p>
                      <Link to="/howto" className="faq-link-btn">
                        <span>📖</span> View How to Use Guide
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="faq-help-section">
        <div className="faq-help-card">
          <span className="faq-help-icon">💬</span>
          <h3>Still have questions?</h3>
          <p>Can't find what you're looking for? We're here to help!</p>
          <Link to="/contact" className="faq-contact-btn">
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}

export default FAQ;
