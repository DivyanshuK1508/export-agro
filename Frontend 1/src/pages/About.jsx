import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../style/Home.css";

function Counter({ to, label, icon }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 800;
    const stepTime = Math.max(10, Math.floor(duration / to));
    const timer = setInterval(() => {
      start += 1;
      if (start >= to) {
        setValue(to);
        clearInterval(timer);
      } else {
        setValue(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [to]);

  return (
    <div className="stat-card-new">
      <div className="stat-icon">{icon}</div>
      <div className="stat-value">{value}+</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

function About() {
  const features = [
    { icon: "🌾", title: "Crop Recommendation", desc: "Suggests suitable crops from soil and climate inputs" },
    { icon: "📊", title: "Export Potential", desc: "Estimates how well a crop may perform in export markets" },
    { icon: "⚠️", title: "Risk Indicators", desc: "Highlights weather and soil conditions that may affect yield" },
    { icon: "📱", title: "Mobile Friendly", desc: "Works smoothly on phones and tablets for field use" },
    { icon: "⚡", title: "Fast Predictions", desc: "Returns recommendations in just a few seconds" },
    { icon: "🎯", title: "Practical Focus", desc: "Built to support real farm decisions, not just lab results" },
  ];

  const projectDetails = [
    {
      title: "What this project does",
      body:
        "Export-Oriented Indian Agro helps farmers choose crops using soil, temperature, rainfall, state, and district inputs. The goal is to make crop selection more informed, more local, and more export-aware.",
    },
    {
      title: "Why it exists",
      body:
        "Many farmers have access to land and labour but not enough guidance about which crop fits their conditions or has better market potential. This project bridges that gap with a simple digital recommendation flow.",
    },
    {
      title: "Who it helps",
      body:
        "It is designed for farmers, agri-students, local advisors, and anyone who wants a quick view of crop suitability without digging through scattered market and climate data.",
    },
  ];

  const differentiation = [
    {
      title: "Built for Indian farming conditions",
      body:
        "The form and recommendation flow are centered around Indian states, districts, and weather patterns rather than generic global assumptions.",
    },
    {
      title: "Focuses on export potential",
      body:
        "The result is not only about what can grow, but also about which crops may be more valuable in market and export contexts.",
    },
    {
      title: "Simple enough to use quickly",
      body:
        "The interface keeps only the most important inputs, with a manual district fallback when a place is not listed.",
    },
  ];

  const workflow = [
    {
      step: "01",
      title: "Enter farm conditions",
      desc: "Provide N, soil pH, temperature, rainfall, state, and district, plus manual district entry if needed.",
    },
    {
      step: "02",
      title: "Analyze suitability",
      desc: "The system compares your input against crop-fit rules and market-oriented scoring.",
    },
    {
      step: "03",
      title: "Review recommendation",
      desc: "You get the suggested crop, yield estimate, export potential, and risk signals in one place.",
    },
  ];

  const benefits = [
    "Supports faster crop planning",
    "Encourages export-focused thinking",
    "Makes location-based input easier to use",
    "Reduces guesswork for first-time users",
    "Helps compare market and risk signals",
    "Keeps the experience simple and mobile-ready",
  ];

  const missionPoints = [
    {
      title: "Make decisions clearer",
      desc: "Turn scattered farm conditions into a single recommendation that is easy to understand.",
    },
    {
      title: "Support export-ready thinking",
      desc: "Help farmers think beyond yield and consider crops with stronger market and export value.",
    },
    {
      title: "Keep the tool practical",
      desc: "Use a clean interface with simple inputs so the tool stays useful in real field conditions.",
    },
  ];

  const roadmap = [
    {
      title: "Input collection",
      desc: "Capture soil, weather, and location details through a short guided form.",
    },
    {
      title: "Recommendation engine",
      desc: "Analyze crop-fit, risk, and export cues to identify the best crop option.",
    },
    {
      title: "Actionable result",
      desc: "Show yield, market signals, and export fit in a way that supports fast planning.",
    },
  ];

  const tech = [
    { name: "React", icon: "⚛️", color: "#61DAFB" },
    { name: "Flask", icon: "🌶️", color: "#000" },
    { name: "Python", icon: "🐍", color: "#3776AB" },
    { name: "Scikit-learn", icon: "🔬", color: "#F7931E" },
    { name: "XGBoost", icon: "🚀", color: "#FF6600" },
    { name: "Pandas", icon: "🐼", color: "#150458" },
  ];

  const team = [
    { name: "Divyanshu Kashyap", role: "Backend Developer", icon: "⚙️" },
    { name: "Bavigadda Meghana", role: "Research & ML", icon: "🧠" },
    { name: "Aditya Raj", role: "Frontend Developer", icon: "🎨", image: "/PFP.jpg" },
  ];

  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="page about-page-clean">
      <section className="about-clean-hero">
        <div className="about-clean-hero-rings" aria-hidden="true">
          <span className="hero-ring ring-1"></span>
          <span className="hero-ring ring-2"></span>
        </div>

        <div className="about-clean-inner about-clean-hero-layout">
          <div className="about-clean-hero-copy">
            <span className="about-clean-badge">Export-Oriented Indian Agro</span>
            <h1>
              Better farm decisions.
              <br />
              <span className="about-hero-emphasis">Better export outcomes.</span>
            </h1>
            <div className="about-clean-intro-row">
              <p className="about-clean-hero-intro">
                We combine climate, soil, and market signals into practical crop recommendations
                so farmers can plan with confidence.
              </p>

              <aside className="about-clean-hero-proof" aria-label="platform highlights">
                <h3>At a glance</h3>
                <ul>
                  <li>
                    <strong>1200+</strong>
                    <span>Farmers supported</span>
                  </li>
                  <li>
                    <strong>45+</strong>
                    <span>Export crop profiles</span>
                  </li>
                  <li>
                    <strong>92%</strong>
                    <span>Recommendation accuracy</span>
                  </li>
                </ul>
              </aside>
            </div>

            <div className="about-clean-hero-pills">
              <span>AI-guided crop fit</span>
              <span>Export demand focus</span>
              <span>Quick and mobile-ready</span>
            </div>

            <div className="about-clean-hero-actions">
              <Link to="/recommend" className="about-clean-primary-btn">
                Try Crop Recommendation
              </Link>
              <Link to="/howto" className="about-clean-secondary-btn">
                See How It Works
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section-head">
          <h2>About the Project</h2>
          <p>
            This website is a focused agri-tech decision tool. It brings together soil,
            weather, and location data to recommend crops that are practical for local farming
            conditions and relevant to export opportunities.
          </p>
        </div>

        <div className="landing-benefits-grid">
          {projectDetails.map((item) => (
            <div key={item.title} className="landing-benefit-card">
              <div className="benefit-icon">ℹ️</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section-head">
          <h2>What Makes It Different</h2>
          <p>
            The website is designed to feel specific to the problem it solves, not like a generic
            farming dashboard.
          </p>
        </div>

        <div className="landing-benefits-grid">
          {differentiation.map((item) => (
            <div key={item.title} className="landing-benefit-card">
              <div className="benefit-icon">⭐</div>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section-head">
          <h2>Our Mission</h2>
          <p>
            The project is built to make crop planning more informed, more local, and more useful
            for farmers who want a straightforward digital assistant.
          </p>
        </div>

        <div className="landing-benefits-grid">
          {missionPoints.map((item) => (
            <div key={item.title} className="landing-benefit-card">
              <div className="benefit-icon">🎯</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <Counter to={1200} label="Farmers Helped" icon="👨‍🌾" />
        <Counter to={45} label="Export Crops" icon="🌾" />
        <Counter to={92} label="Accuracy %" icon="🎯" />
        <Counter to={18} label="Yield Increase %" icon="📈" />
      </section>

      <section className="landing-section">
        <div className="landing-section-head">
          <h2>How It Works</h2>
          <p>
            The flow is intentionally simple: collect the right inputs, analyze crop suitability,
            and present a clear recommendation that can be used for planning or comparison.
          </p>
        </div>

        <div className="landing-process-grid">
          {workflow.map((item) => (
            <div key={item.step} className="landing-process-card">
              <span className="process-step">{item.step}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section-head">
          <h2>Roadmap</h2>
          <p>
            The system is designed to stay simple now and grow later with richer recommendations,
            stronger data, and more region-specific guidance.
          </p>
        </div>

        <div className="landing-process-grid">
          {roadmap.map((item, index) => (
            <div key={item.title} className="landing-process-card">
              <span className="process-step">0{index + 1}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="problem-solution">
        <div className="ps-card problem">
          <div className="ps-icon">❌</div>
          <h3>The Problem</h3>
          <p>
            Farmers often have to make crop decisions with incomplete soil information, changing
            weather patterns, and limited export guidance.
          </p>
        </div>
        <div className="ps-arrow">→</div>
        <div className="ps-card solution">
          <div className="ps-icon">✅</div>
          <h3>Our Solution</h3>
          <p>
            Our system combines input fields, crop-fit logic, and market-aware scoring to deliver
            a recommendation that is easier to act on.
          </p>
        </div>
      </section>

      <section className="landing-section">
        <div className="landing-section-head">
          <h2>Why This Matters</h2>
          <p>
            Crop choice is not just about what can grow. It is also about what is resilient,
            profitable, and practical for the region a farmer is working in.
          </p>
        </div>

        <div className="landing-benefits-grid">
          {benefits.map((item) => (
            <div key={item} className="landing-benefit-card">
              <div className="benefit-icon">✔</div>
              <h3>{item}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="features-section-new">
        <h2>What We Offer</h2>
        <p className="landing-section-head" style={{ marginBottom: "20px" }}>
          The platform is centered on useful features that make crop recommendation understandable,
          quick, and relevant to farm conditions in India.
        </p>
        <div className="features-grid-new">
          {features.map((f, i) => (
            <div
              key={i}
              className={`feature-card-new ${hoveredFeature === i ? "active" : ""}`}
              onMouseEnter={() => setHoveredFeature(i)}
              onMouseLeave={() => setHoveredFeature(null)}
            >
              <div className="feature-icon-new">{f.icon}</div>
              <h4>{f.title}</h4>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="tech-section">
        <h2>Built With</h2>
        <p className="landing-section-head" style={{ marginBottom: "20px" }}>
          The stack is modern, lightweight, and suitable for a responsive data-driven web app.
        </p>
        <div className="tech-grid">
          {tech.map((t, i) => (
            <div key={i} className="tech-card">
              <span className="tech-icon">{t.icon}</span>
              <span className="tech-name">{t.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="team-section-new">
        <h2>Meet the Team</h2>
        <p className="landing-section-head" style={{ marginBottom: "20px" }}>
          Built as a collaborative project where frontend, backend, research, and machine learning
          work together to support the recommendation experience.
        </p>
        <div className="team-grid-new">
          {team.map((m, i) => (
            <div key={i} className="team-card-new">
              <div className="team-photo-placeholder">
                {m.image ? <img src={m.image} alt={`${m.name} profile`} /> : <span>{m.icon}</span>}
              </div>
              <h3 className="team-name">{m.name}</h3>
              <p className="team-role">{m.role}</p>
            </div>
          ))}
        </div>
        <p className="guide-text">
          <span className="guide-icon">👨‍🏫</span>
          Guided by <strong>Mr. Karan Kumar Das</strong> — LPU
        </p>
      </section>

      <section className="about-cta-section">
        <div className="cta-content">
          <h2>Ready to Boost Your Exports?</h2>
          <Link to="/recommend" className="cta-btn-new">Get Started →</Link>
        </div>
      </section>
    </div>
  );
}

export default About;
