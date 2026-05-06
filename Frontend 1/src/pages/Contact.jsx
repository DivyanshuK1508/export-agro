import { useState } from "react";
import "../style/Home.css";

function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null);
  const [focusedField, setFocusedField] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();
    setStatus({ type: "success", text: "Message sent successfully! We'll get back to you soon." });
    setName("");
    setEmail("");
    setMessage("");
    setTimeout(() => setStatus(null), 4000);
  }

  return (
    <div className="contact-page-v3">
      {/* Agriculture Background */}
      <div className="contact-bg-v3">
        {/* Elegant Landscape */}
        <div className="landscape-scene">
          <div className="horizon-glow"></div>
          <div className="field-layer layer-1"></div>
          <div className="field-layer layer-2"></div>
          <div className="field-layer layer-3"></div>
          <div className="field-layer layer-4"></div>
          <div className="field-texture"></div>
        </div>
        
        {/* Sun and Sunlight */}
        <div className="sun"></div>
        <div className="sun-rays"></div>
        <div className="sunlight-beam sunlight-1"></div>
        <div className="sunlight-beam sunlight-2"></div>
        <div className="sunlight-beam sunlight-3"></div>
        
        {/* Clouds */}
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        
        {/* Plants and Leaves */}
        <div className="agri-pattern">
          <div className="leaf leaf-2">🌾</div>
          <div className="leaf leaf-3">🍃</div>
          <div className="leaf leaf-4">🌱</div>
          <div className="leaf leaf-5">🌿</div>
          <div className="leaf leaf-6">🌾</div>
          <div className="leaf leaf-7">🍀</div>
        </div>
        
        {/* Grass/Plants at bottom */}
        <div className="grass-container">
          <div className="grass grass-1"></div>
          <div className="grass grass-2"></div>
          <div className="grass grass-3"></div>
          <div className="grass grass-4"></div>
          <div className="grass grass-5"></div>
          <div className="grass grass-6"></div>
          <div className="grass grass-7"></div>
          <div className="grass grass-8"></div>
          <div className="grass grass-9"></div>
          <div className="grass grass-10"></div>
          <div className="plant plant-1">🌱</div>
          <div className="plant plant-2">🌿</div>
          <div className="plant plant-3">🌾</div>
          <div className="plant plant-4">🪴</div>
          <div className="plant plant-5">🌻</div>
          <div className="plant plant-6">🌼</div>
          <div className="plant plant-7">🌷</div>
          <div className="plant plant-8">🌳</div>
        </div>
      </div>

      <div className="contact-wrapper">
        {/* Left - Info Section */}
        <div className="contact-info-side">
          <div className="info-content">
            <span className="info-badge">🌾 Get in Touch</span>
            <h1>Let's Grow<br /><span className="highlight">Together</span></h1>
            <p>Have questions about our crop recommendation system? We'd love to hear from you and help your farming journey.</p>

            <div className="info-cards">
              <div className="info-card">
                <div className="info-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                  </svg>
                </div>
                <div className="info-card-content">
                  <h4>Call Us</h4>
                  <p>+91 863 936 9441</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div className="info-card-content">
                  <h4>Email Us</h4>
                  <p>support@agroexport.com</p>
                </div>
              </div>

              <div className="info-card">
                <div className="info-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div className="info-card-content">
                  <h4>Visit Us</h4>
                  <p>LPU, Punjab, India</p>
                </div>
              </div>
            </div>

            <div className="social-row">
              <a href="#" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
              <a href="#" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                </svg>
              </a>
              <a href="#" className="social-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Right - Form Section */}
        <div className="contact-form-side">
          <div className="form-card">
            <h2>Send us a Message</h2>
            <p className="form-subtitle">Fill out the form and we'll respond within 24 hours</p>

            <form onSubmit={handleSubmit}>
              <div className={`floating-input ${focusedField === 'name' || name ? 'focused' : ''}`}>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <label htmlFor="name">Your Name</label>
                <div className="input-highlight"></div>
              </div>

              <div className={`floating-input ${focusedField === 'email' || email ? 'focused' : ''}`}>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  required
                />
                <label htmlFor="email">Email Address</label>
                <div className="input-highlight"></div>
              </div>

              <div className={`floating-input textarea ${focusedField === 'message' || message ? 'focused' : ''}`}>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  rows={4}
                  required
                ></textarea>
                <label htmlFor="message">Your Message</label>
                <div className="input-highlight"></div>
              </div>

              <button type="submit" className="submit-btn-v3">
                <span>Send Message</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                </svg>
              </button>

              {status && (
                <div className="status-message success">
                  <span className="status-icon">✓</span>
                  {status.text}
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
