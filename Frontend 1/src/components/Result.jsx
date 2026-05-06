function Result({ result }) {
  const yieldValue = Number(result?.yield ?? 0);
  const localMarketRevenue = Number(result?.localMarketRevenue ?? 0);
  const exportMarketRevenue = Number(result?.exportMarketRevenue ?? 0);
  const localMarketCost = Number(result?.localMarketLoss ?? result?.localMarketCost ?? 0);
  const exportMarketCost = Number(result?.exportMarketLoss ?? result?.exportMarketCost ?? 0);
  const localProfit = Number(result?.localProfit ?? localMarketRevenue - localMarketCost);
  const exportProfit = Number(result?.exportProfit ?? exportMarketRevenue - exportMarketCost);

  // Convert numeric scores to tone/level for badges
  const getExportLevel = (score) => {
    if (score >= 75) return "High";
    if (score >= 50) return "Medium";
    return "Low";
  };
  
  const getRiskLevel = (score) => {
    if (score >= 75) return "Low";
    if (score >= 50) return "Medium";
    return "High";
  };

  const exportLevel = result ? getExportLevel(result.export) : "Medium";
  const riskLevel = result ? getRiskLevel(result.risk) : "Medium";
  const exportScore = result ? Math.round(result.export) : 0;
  const riskSafetyScore = result ? Math.round(result.risk) : 0;

  if (!result) {
    return (
      <div className="result crop-result-card result-empty">
        <h2>📊 Prediction Panel</h2>
        <p className="result-empty-text">
          Submit the form to see your recommended crop with yield, pricing, and profit analysis.
        </p>
        <div className="result-empty-chips">
          <span>Crop Fit</span>
          <span>Yield Forecast</span>
          <span>Market Analysis</span>
        </div>
      </div>
    );
  }

  return (
    <div className="result crop-result-card result-filled">
      {/* Hero Card - Crop Recommendation */}
      <div className="result-crop-hero">
        <div className="hero-accent"></div>
        <div className="hero-content">
          <span className="hero-label">✅ Recommended Crop</span>
          <h2 className="hero-crop-name">{result.crop}</h2>
          <div className="hero-badges">
            <span className={`badge badge-export badge-${exportLevel.toLowerCase()}`}>
              💼 Export: {exportLevel}
            </span>
            <span className={`badge badge-risk badge-${riskLevel.toLowerCase()}`}>
              ⚠️ Risk: {riskLevel}
            </span>
          </div>
        </div>
      </div>

      {/* Crop Details Grid */}
      <div className="result-details-section">
        <h3 className="section-title">📋 Crop Details</h3>
        <div className="details-grid">
          <div className="detail-card">
            <div className="detail-label">Predicted Yield</div>
            <div className="detail-value">{yieldValue.toFixed(2)}</div>
            <div className="detail-unit">tons</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">Market Price</div>
            <div className="detail-value">₹{result.marketPrice}</div>
            <div className="detail-unit">per unit</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">Export Price</div>
            <div className="detail-value">₹{result.exportPrice}</div>
            <div className="detail-unit">premium rate</div>
          </div>
          <div className="detail-card">
            <div className="detail-label">Best Export To</div>
            <div className="detail-value" style={{ fontSize: "0.95rem" }}>{result.bestCountry}</div>
            <div className="detail-unit">international</div>
          </div>
        </div>
      </div>

      {/* Market Analysis Section */}
      <div className="result-market-section">
        <h3 className="section-title">📊 Market Analysis</h3>
        <div className="market-grid">
          <div className="market-card local">
            <div className="market-header">
              <span className="market-icon">🏪</span>
              <span className="market-title">Local Market</span>
            </div>
            <div className="market-row">
              <span>Revenue</span>
              <strong className="positive">₹{localMarketRevenue.toLocaleString()}</strong>
            </div>
            <div className="market-row">
              <span>{result?.localMarketLoss != null ? "Loss" : "Cost"}</span>
              <strong className="negative">-₹{localMarketCost.toLocaleString()}</strong>
            </div>
            <div className="market-net">
              <span>Net Profit</span>
              <strong className={localProfit > 0 ? "profit-positive" : "profit-negative"}>
                ₹{localProfit.toLocaleString()}
              </strong>
            </div>
          </div>

          <div className="market-card export">
            <div className="market-header">
              <span className="market-icon">🌍</span>
              <span className="market-title">Export Market</span>
            </div>
            <div className="market-row">
              <span>Revenue</span>
              <strong className="positive">₹{exportMarketRevenue.toLocaleString()}</strong>
            </div>
            <div className="market-row">
              <span>{result?.exportMarketLoss != null ? "Loss" : "Cost"}</span>
              <strong className="negative">-₹{exportMarketCost.toLocaleString()}</strong>
            </div>
            <div className="market-net">
              <span>Net Profit</span>
              <strong className={exportProfit > 0 ? "profit-positive" : "profit-negative"}>
                ₹{exportProfit.toLocaleString()}
              </strong>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendation Box */}
      <div className="result-recommendation-box">
        <div className="recommendation-icon">🎯</div>
        <div className="recommendation-content">
          <span className="recommendation-label">Better Option</span>
          <div className="recommendation-value">{result.betterOption}</div>
        </div>
      </div>

      {/* Score Cards */}
      <div className="result-scores-section">
        <h3 className="section-title">📈 Performance Scores</h3>
        <div className="scores-grid">
          <div className="score-card export-score">
            <div className="score-label-row">
              <strong>Export Potential</strong>
              <span>{exportScore}%</span>
            </div>
            <div className="score-track">
              <div className="score-fill" style={{ "--score": `${exportScore}%` }}></div>
            </div>
          </div>

          <div className="score-card risk-score">
            <div className="score-label-row">
              <strong>Risk Safety Index</strong>
              <span>{riskSafetyScore}%</span>
            </div>
            <div className="score-track">
              <div className="score-fill" style={{ "--score": `${riskSafetyScore}%` }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
