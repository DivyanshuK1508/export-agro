function Testimonials() {
  const items = [
    { name: "Ramesh K.", text: "The recommendations helped me find export buyers for my crop." },
    { name: "Priya S.", text: "Easy to use — saved time and improved planning for the season." },
    { name: "Anil T.", text: "Clear, practical and focused on export potential — very useful." },
  ];

  return (
    <section className="testimonials">
      <h2>What users say</h2>
      <div className="test-list">
        {items.map((it, i) => (
          <div key={i} className="test-card">
            <div className="test-avatar">{it.name.split(' ')[0][0]}</div>
            <div>
              <strong>{it.name}</strong>
              <p>{it.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;
