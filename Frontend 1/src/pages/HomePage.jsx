import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiCheckCircle,
  FiChevronLeft,
  FiChevronRight,
  FiGlobe,
  FiMapPin,
  FiShield,
  FiStar,
  FiTrendingUp,
  FiUsers,
} from "react-icons/fi";
import "../style/Home.css";
import Footer from "../components/Footer";

function HomePage() {
  const [carouselIndex, setCarouselIndex] = useState(0);

  useEffect(() => {
    const revealItems = document.querySelectorAll(".landing-reveal");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  const benefits = [
    {
      icon: <FiMapPin />,
      title: "Precision Crop Decisions",
      text: "Map your exact farm conditions to crops with stronger market fit and practical export potential."
    },
    {
      icon: <FiGlobe />,
      title: "Export-Ready Recommendations",
      text: "Prioritize crops with demand visibility so planning is tied to real export opportunities."
    },
    {
      icon: <FiActivity />,
      title: "Fast Strategic Planning",
      text: "From farm input to actionable direction in seconds, with risk-aware signals built in."
    }
  ];

  const proofStats = [
    { icon: <FiUsers />, value: "1.2k+", text: "Farmers and advisors already using it" },
    { icon: <FiGlobe />, value: "45+", text: "Export-focused crop opportunities tracked" },
    { icon: <FiTrendingUp />, value: "+18%", text: "Average confidence uplift in crop planning" },
  ];

  const flow = [
    {
      step: "01",
      icon: <FiMapPin />,
      title: "Add Your Farm Profile",
      text: "Enter region, season, soil type, rainfall, and temperature conditions."
    },
    {
      step: "02",
      icon: <FiBarChart2 />,
      title: "Get Top Crop Matches",
      text: "Receive instant recommendations aligned with your local growing context."
    },
    {
      step: "03",
      icon: <FiShield />,
      title: "Plan for Export Outcome",
      text: "Use market and risk cues to decide what to grow with confidence."
    }
  ];

  const marketSignals = [
    {
      icon: <FiTrendingUp />,
      title: "Demand Momentum",
      value: "High",
      score: 84,
      trend: "+9%",
      text: "Tracks categories where export pull remains consistently strong."
    },
    {
      icon: <FiCheckCircle />,
      title: "Climate Fit",
      value: "Verified",
      score: 91,
      trend: "+6%",
      text: "Checks if crop selection is aligned with your field environment."
    },
    {
      icon: <FiShield />,
      title: "Planning Risk",
      value: "Controlled",
      score: 78,
      trend: "-12%",
      text: "Highlights safer pathways to avoid season-level crop mismatch."
    }
  ];

  const testimonials = [
    {
      quote:
        "We stopped guessing and started planning. The recommendation was practical and market-aligned.",
      name: "Ramesh K.",
      role: "Farmer, Punjab",
      impact: "Export clarity improved"
    },
    {
      quote:
        "This helped us advise growers using export logic, not just trial-and-error intuition.",
      name: "Priya S.",
      role: "Agri Advisor, Gujarat",
      impact: "Decision time reduced"
    },
    {
      quote:
        "Simple interface, fast output, and clear direction for the next season.",
      name: "Anil T.",
      role: "Producer Group Lead",
      impact: "Season planning stronger"
    }
  ];

  const useCases = [
    {
      icon: <FiUsers />,
      title: "For Farmers",
      text: "Choose crops with clearer confidence before committing your season."
    },
    {
      icon: <FiBarChart2 />,
      title: "For Agri Advisors",
      text: "Guide growers with quick, data-backed recommendations in meetings."
    },
    {
      icon: <FiGlobe />,
      title: "For Export Planners",
      text: "Spot crop directions with stronger demand momentum and lower risk."
    }
  ];

  const spotlightFeatures = [
    {
      icon: <FiCheckCircle />,
      title: "Best Match",
      value: "92%",
      text: "Highlights the strongest crop fit from your farm profile."
    },
    {
      icon: <FiTrendingUp />,
      title: "Export Pulse",
      value: "Hot",
      text: "Shows which crop groups are gaining market traction."
    },
    {
      icon: <FiShield />,
      title: "Risk Buffer",
      value: "Low",
      text: "Flags safer planting choices before you commit a season."
    }
  ];

  const featuredCrops = [
    {
      id: 1,
      name: "Basmati Rice",
      emoji: "🌾",
      exportDemand: "Very High",
      demandTrend: "+24%",
      season: "Jun - Oct",
      climate: "Moderate temp, 150-250cm rainfall",
      price: "₹50-65/kg",
      region: "Punjab, Haryana",
      color: "#FFD67D"
    },
    {
      id: 2,
      name: "Saffron",
      emoji: "🟡",
      exportDemand: "Premium",
      demandTrend: "+18%",
      season: "Oct - Jan",
      climate: "Cool, 500-900mm rainfall",
      price: "₹15,000-25,000/kg",
      region: "Kashmir",
      color: "#FF6B6B"
    },
    {
      id: 3,
      name: "Cardamom",
      emoji: "🌿",
      exportDemand: "High",
      demandTrend: "+15%",
      season: "Aug - Dec",
      climate: "Humid tropical, high rainfall",
      price: "₹2,500-3,500/kg",
      region: "Kerala, Karnataka",
      color: "#1D9A6C"
    },
    {
      id: 4,
      name: "Spices Mix",
      emoji: "🌶️",
      exportDemand: "High",
      demandTrend: "+12%",
      season: "Year-round",
      climate: "Varied, adaptable",
      price: "₹300-800/kg",
      region: "Pan-India",
      color: "#F59E0B"
    },
    {
      id: 5,
      name: "Turmeric",
      emoji: "🟡",
      exportDemand: "Very High",
      demandTrend: "+21%",
      season: "Sep - Dec",
      climate: "Warm, 150-225cm rainfall",
      price: "₹8,000-12,000/kg",
      region: "Telangana, Maharashtra",
      color: "#FFA500"
    }
  ];

  const handleCarouselPrev = () => {
    setCarouselIndex((prev) => (prev === 0 ? featuredCrops.length - 1 : prev - 1));
  };

  const handleCarouselNext = () => {
    setCarouselIndex((prev) => (prev === featuredCrops.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="page landing-page">
      <section className="landing-hero landing-reference-hero">
        <div className="landing-hero-scene" aria-hidden="true">
          <div className="scene-row row-1"></div>
          <div className="scene-row row-2"></div>
          <div className="scene-row row-3"></div>
          <div className="scene-row row-4"></div>
          <div className="scene-row row-5"></div>
          <div className="scene-row row-6"></div>
          <div className="scene-hills"></div>
          <div className="scene-leaf-overlay"></div>
        </div>

        <div className="landing-reference-shell">
          <div className="landing-reference-content">
            <p className="landing-reference-eyebrow">AI Crop Intelligence for Export-Oriented Farming</p>
            <h1>Choose the Right Crop with Export Confidence</h1>
            <p>
              Get smart crop recommendations using your region, season, soil, and weather
              data so every planting decision is aligned with market opportunity.
            </p>

            <div className="landing-reference-points" aria-label="Recommendation strengths">
              <span>Soil & season aware</span>
              <span>Export signal guided</span>
              <span>Risk-aware planning</span>
            </div>
            <div className="landing-reference-actions">
              <Link to="/recommend" className="reference-cta-primary">
                Get Recommendation <FiArrowRight className="cta-icon" aria-hidden="true" />
              </Link>
              <Link to="/special-crops" className="reference-cta-secondary">Explore Special Crops</Link>
            </div>

            <p className="landing-reference-note">No signup required. Results in under 60 seconds.</p>
          </div>
        </div>
      </section>

      <section className="landing-proof-strip landing-reveal" style={{ "--reveal-delay": "80ms" }}>
        {proofStats.map((item, idx) => (
          <div key={item.text} className="proof-item" style={{ "--reveal-delay": `${120 + idx * 70}ms` }}>
            <span className="proof-icon">{item.icon}</span>
            <strong>{item.value}</strong>
            <span>{item.text}</span>
          </div>
        ))}
      </section>

      <section className="landing-section landing-spotlight landing-reveal" style={{ "--reveal-delay": "100ms" }}>
        <div className="landing-section-head">
          <p className="landing-section-label">Decision Snapshot</p>
          <h2>A More Visual Way to Read Your Farm Signals</h2>
          <p>See the core factors that shape crop selection without opening a form first.</p>
        </div>
        <div className="landing-spotlight-grid">
          <div className="spotlight-main-card">
            <div className="spotlight-main-top">
              <span className="spotlight-badge">Live Farm View</span>
              <span className="spotlight-status">Updated now</span>
            </div>
            <div className="spotlight-metric-row">
              <div>
                <small>Season fit</small>
                <strong>Very Strong</strong>
              </div>
              <div>
                <small>Demand trend</small>
                <strong>Rising</strong>
              </div>
              <div>
                <small>Decision speed</small>
                <strong>Under 60 sec</strong>
              </div>
            </div>
            <div className="spotlight-meter-block">
              <div className="spotlight-meter-labels">
                <span>Farm compatibility</span>
                <strong>88%</strong>
              </div>
              <div className="spotlight-meter" aria-label="Farm compatibility 88 percent">
                <i style={{ width: "88%" }}></i>
              </div>
            </div>
            <Link to="/recommend" className="spotlight-action">
              Start Your Crop Match <FiArrowRight />
            </Link>
          </div>

          <div className="spotlight-side-stack">
            {spotlightFeatures.map((item, idx) => (
              <article key={item.title} className="spotlight-side-card" style={{ "--reveal-delay": `${120 + idx * 70}ms` }}>
                <span className="spotlight-side-icon">{item.icon}</span>
                <div>
                  <div className="spotlight-side-head">
                    <h3>{item.title}</h3>
                    <strong>{item.value}</strong>
                  </div>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-featured-crops landing-reveal" style={{ "--reveal-delay": "110ms" }}>
        <div className="landing-section-head">
          <p className="landing-section-label">Trending Now</p>
          <h2>Featured Export-Ready Crops</h2>
          <p>High-demand crops with verified export momentum this season.</p>
        </div>
        <div className="featured-crops-container">
          <div className="featured-crops-carousel">
            {featuredCrops.map((crop, idx) => (
              <div
                key={crop.id}
                className={`featured-crop-card ${idx === carouselIndex ? 'active' : ''}`}
                style={{ "--crop-color": crop.color }}
              >
                <div className="crop-card-inner">
                  <div className="crop-emoji">{crop.emoji}</div>
                  <div className="crop-info">
                    <h3>{crop.name}</h3>
                    <p className="crop-region">{crop.region}</p>
                  </div>
                  <div className="crop-demand">
                    <span className="demand-badge">{crop.exportDemand}</span>
                    <span className="demand-trend">{crop.demandTrend}</span>
                  </div>
                  <div className="crop-details">
                    <div className="detail-item">
                      <small>Season</small>
                      <p>{crop.season}</p>
                    </div>
                    <div className="detail-item">
                      <small>Climate</small>
                      <p>{crop.climate}</p>
                    </div>
                    <div className="detail-item">
                      <small>Export Price</small>
                      <p>{crop.price}</p>
                    </div>
                  </div>
                  <Link to="/recommend" className="crop-quick-action">
                    Get Recommendation <FiArrowRight />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="carousel-nav">
            <button
              className="carousel-btn prev"
              onClick={handleCarouselPrev}
              aria-label="Previous crop"
            >
              <FiChevronLeft />
            </button>
            <div className="carousel-indicators">
              {featuredCrops.map((_, idx) => (
                <div
                  key={idx}
                  className={`indicator ${idx === carouselIndex ? 'active' : ''}`}
                  onClick={() => setCarouselIndex(idx)}
                  role="button"
                  tabIndex="0"
                  aria-label={`Go to crop ${idx + 1}`}
                />
              ))}
            </div>
            <button
              className="carousel-btn next"
              onClick={handleCarouselNext}
              aria-label="Next crop"
            >
              <FiChevronRight />
            </button>
          </div>
        </div>
      </section>

      <section className="landing-section landing-reveal" style={{ "--reveal-delay": "140ms" }}>
        <div className="landing-section-head">
          <p className="landing-section-label">Core Benefits</p>
          <h2>Everything You Need to Choose the Right Crop Fast</h2>
          <p>Practical recommendations that combine local fit, market relevance, and speed.</p>
        </div>
        <div className="landing-benefits-grid">
          {benefits.map((item, idx) => (
            <article key={idx} className="landing-benefit-card" style={{ "--reveal-delay": `${160 + idx * 70}ms` }}>
              <span className="benefit-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-process landing-reveal" style={{ "--reveal-delay": "220ms" }}>
        <div className="landing-section-head">
          <p className="landing-section-label">Workflow</p>
          <h2>How It Works in 3 Quick Steps</h2>
          <p>A simple flow designed for real farming timelines, not complex dashboards.</p>
        </div>
        <div className="landing-process-grid">
          {flow.map((item, idx) => (
            <article key={idx} className="landing-process-card" style={{ "--reveal-delay": `${240 + idx * 70}ms` }}>
              <span className="process-step">{item.step}</span>
              <span className="process-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-reveal" style={{ "--reveal-delay": "300ms" }}>
        <div className="landing-section-head">
          <p className="landing-section-label">Market View</p>
          <h2>Clear Signals Before You Commit a Season</h2>
          <p>Go beyond prediction with decision support that helps reduce costly crop mismatch.</p>
        </div>
        <div className="landing-market-grid">
          {marketSignals.map((signal, idx) => (
            <article key={signal.title} className="landing-market-card" style={{ "--reveal-delay": `${320 + idx * 70}ms` }}>
              <div className="landing-market-head">
                <h3><span className="landing-market-icon">{signal.icon}</span>{signal.title}</h3>
                <span>{signal.value}</span>
              </div>
              <div className="landing-market-mini-metric">
                <strong>{signal.score}%</strong>
                <small>{signal.trend} vs last cycle</small>
              </div>
              <div className="landing-market-meter" aria-label={`${signal.title} score ${signal.score} percent`}>
                <i style={{ width: `${signal.score}%` }}></i>
              </div>
              <p>{signal.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-reveal" style={{ "--reveal-delay": "380ms" }}>
        <div className="landing-section-head">
          <p className="landing-section-label">Who It Helps</p>
          <h2>Designed for Real Roles Across the Agro Value Chain</h2>
          <p>Different users, one clear outcome: faster and stronger crop planning decisions.</p>
        </div>
        <div className="landing-usecase-grid">
          {useCases.map((item, idx) => (
            <article key={item.title} className="landing-usecase-card" style={{ "--reveal-delay": `${400 + idx * 70}ms` }}>
              <span className="landing-usecase-icon">{item.icon}</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-section landing-reveal" style={{ "--reveal-delay": "460ms" }}>
        <div className="landing-section-head">
          <p className="landing-section-label">Voices</p>
          <h2>What Users Say</h2>
          <p>Teams using the platform for seasonal planning and export-focused decisions.</p>
        </div>
        <div className="landing-testimonials-grid">
          {testimonials.map((item, idx) => (
            <article key={item.name} className="landing-testimonial-card" style={{ "--reveal-delay": `${480 + idx * 70}ms` }}>
              <div className="landing-testimonial-head">
                <span className="landing-avatar">{item.name.charAt(0)}</span>
                <span className="landing-stars" aria-label="Rated five stars">
                  <FiStar />
                  <FiStar />
                  <FiStar />
                  <FiStar />
                  <FiStar />
                </span>
              </div>
              <span className="landing-quote-mark" aria-hidden="true">"</span>
              <p>{item.quote}</p>
              <span className="landing-testimonial-impact">{item.impact}</span>
              <div>
                <strong>{item.name}</strong>
                <span>{item.role}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="landing-final-cta landing-reveal">
        <h2>Ready to Decide Your Next Crop with Confidence?</h2>
        <p>Run your recommendation now and start this season with a stronger plan.</p>
        <div className="landing-hero-actions">
          <Link to="/recommend" className="landing-cta-primary">Start Free Recommendation</Link>
          <Link to="/contact" className="landing-cta-secondary">Talk to the Team</Link>
        </div>
      </section>

      <div className="landing-mobile-cta" aria-label="Quick actions">
        <Link to="/recommend" className="landing-mobile-cta-primary">
          Start Recommendation
        </Link>
        <Link to="/contact" className="landing-mobile-cta-secondary">
          Contact Team
        </Link>
      </div>

      <Footer />
    </div>
  );
}

export default HomePage;