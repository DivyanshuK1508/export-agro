function Stats() {
  const stats = [
    { label: "Farmers helped", value: "1.2k+" },
    { label: "Export-ready crops", value: "45" },
    { label: "Avg. yield increase", value: "+18%" },
  ];

  return (
    <section className="stats">
      <div className="stats-grid">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div className="stat-value">{s.value}</div>
            <div className="stat-label">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;
