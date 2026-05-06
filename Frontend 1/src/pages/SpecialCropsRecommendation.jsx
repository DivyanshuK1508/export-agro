import { useState } from "react";
import { getAllStates, getDistricts } from "india-state-district";
import "../style/Home.css";
import { recommendSpecialCrops } from "../data/specialCropLogic";

const allIndiaStates = getAllStates();

const initialForm = {
  N: "",
  Soil_pH: "",
  Temperature: "",
  Rainfall: "",
  state: "",
  district: ""
};

function SpecialCropsRecommendation() {
  const [formData, setFormData] = useState(initialForm);
  const [stateCode, setStateCode] = useState("");
  const [districtChoice, setDistrictChoice] = useState("");
  const [customDistrict, setCustomDistrict] = useState("");
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectedStateName = allIndiaStates.find((state) => state.code === stateCode)?.name || "";
  const districtOptions = stateCode ? getDistricts(stateCode) : [];

  const averageMargin = result?.allRecommendations?.length
    ? Math.round(
        result.allRecommendations.reduce((sum, item) => sum + item.estimatedProfitMargin, 0) /
          result.allRecommendations.length
      )
    : 0;

  const bestExportGap = result?.allRecommendations?.length
    ? Math.max(
        ...result.allRecommendations.map((item) => item.exportMarketPrice - item.indiaMarketPrice)
      )
    : 0;

  const averageSuitability = result?.allRecommendations?.length
    ? Math.round(
        result.allRecommendations.reduce((sum, item) => sum + item.suitabilityScore, 0) /
          result.allRecommendations.length
      )
    : 0;

  const bestCrop = result?.topRecommendations?.[0] ?? null;
  const secondCrop = result?.topRecommendations?.[1] ?? null;
  const isGeneratedTheme = isLoading || Boolean(result);

  const marginLead = bestCrop && secondCrop
    ? bestCrop.estimatedProfitMargin - secondCrop.estimatedProfitMargin
    : 0;

  const fitLead = bestCrop && secondCrop
    ? bestCrop.suitabilityScore - secondCrop.suitabilityScore
    : 0;

  const analytics = bestCrop?.analytics ?? null;
  const featureCards = analytics
    ? [
        {
          icon: "🌦️",
          label: "Weather fit",
          value: `${Math.round(analytics.weather?.overall_suitability ?? bestCrop.suitabilityScore)}/100`,
          note: analytics.weather?.warnings?.[0] ?? "Conditions are balanced",
          score: Math.round(analytics.weather?.overall_suitability ?? bestCrop.suitabilityScore),
          chip: "Climate"
        },
        {
          icon: "📈",
          label: "Demand trend",
          value: analytics.marketForecast?.current_demand ?? "Unknown",
          note: analytics.marketForecast?.price_trend ?? "Market direction not available",
          score:
            analytics.marketForecast?.current_demand === "Very High"
              ? 96
              : analytics.marketForecast?.current_demand === "High"
                ? 84
                : analytics.marketForecast?.current_demand === "Medium-High"
                  ? 78
                  : 60,
          chip: "Market"
        },
        {
          icon: "🌱",
          label: "Sustainability",
          value: `${analytics.sustainability?.sustainability_score ?? 0}/100`,
          note: analytics.sustainability?.organic_potential ?? "Organic potential not available",
          score: Math.round(analytics.sustainability?.sustainability_score ?? 0),
          chip: "Eco"
        },
        {
          icon: "🏷️",
          label: "Quality signal",
          value: (analytics.qualityStandards?.certifications ?? []).slice(0, 2).join(" · ") || "Certified",
          note: analytics.qualityStandards?.price_premium ?? "Premium grading available",
          score: Math.min(100, ((analytics.qualityStandards?.certifications?.length ?? 0) || 1) * 28),
          chip: "Certs"
        }
      ]
    : [];

  function onChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const submitPayload = {
      ...formData,
      state: selectedStateName,
      district: districtChoice === "__other__" ? customDistrict.trim() : districtChoice
    };

    await new Promise((resolve) => setTimeout(resolve, 250));
    const data = await recommendSpecialCrops(submitPayload);
    setResult(data);
    setIsLoading(false);
  }

  function handleReset() {
    setFormData(initialForm);
    setStateCode("");
    setDistrictChoice("");
    setCustomDistrict("");
    setResult(null);
  }

  return (
    <div className="page special-page">
      <section className="special-hero premium-hero-base">
        <div className="hero-grid-pattern"></div>
        <div className="special-hero-inner">
          <div className="special-hero-copy">
            <span className="special-badge">Special Intelligence Layer</span>
            <p className="special-hero-kicker">Export-Oriented Strategy</p>
            <h1>
              Special Crops
              <span className="special-hero-title-highlight"> for Higher Global Margins</span>
            </h1>
            <p className="special-hero-lead">
              This page is built for premium planning: it prioritizes crops that match your farm
              profile and can produce stronger export-side returns.
            </p>
            <div className="special-hero-cta-row">
              <a href="#special-form">Start Recommendation</a>
              <small>Use latest NPK and rainfall values for precise output</small>
            </div>
          </div>
          <aside className="special-hero-proof">
            <p className="proof-label">What makes this page special</p>
            <h3>Built for export-focused crop decisions, not generic recommendations.</h3>
            <div className="proof-stats">
              <div>
                <strong>Top 3</strong>
                <span>Action-ready shortlist</span>
              </div>
              <div>
                <strong>2 Signals</strong>
                <span>Farm fit + margin logic</span>
              </div>
              <div>
                <strong>Clear Why</strong>
                <span>Reason shown for #1 crop</span>
              </div>
            </div>
            <div className="proof-points">
              <span>Export premium focused ranking</span>
              <span>Suitability + profit scoring engine</span>
              <span>Transparent recommendation logic</span>
            </div>
          </aside>
        </div>
      </section>

      <section className="special-content">
        <div className={`special-layout ${isGeneratedTheme ? "is-generated" : ""}`}>
          <form id="special-form" className={`special-form ${isLoading ? "is-loading" : ""}`} onSubmit={handleSubmit}>
            <div className="special-form-head">
              <span className="special-form-eyebrow">Export Strategy Input</span>
              <h2>Input Details</h2>
              <p>Fill the form to get clear export-focused crop recommendations.</p>
              <p className="special-form-tagline">Designed for farmers who want stronger margins, not generic suggestions.</p>
              <div className="special-form-progress">
                <span>Step 1 Soil and Climate</span>
                <span>Step 2 Location</span>
              </div>
              <div className="special-form-highlights">
                <span>Guided form</span>
                <span>Profit first</span>
                <span>Fast output</span>
              </div>
              <div className="special-quick-check">
                <span>Use latest soil test values</span>
                <span>Select your exact location</span>
                <span>Use district fallback if needed</span>
              </div>
            </div>

            <div className="special-section special-section-soil">
              <div className="special-section-title">
                <span className="step-pill">Step 1</span>
                <span className="step-title">Soil & Climate</span>
              </div>
              <div className="special-grid">
                <label className="special-field">
                  <span className="special-label">Nitrogen (N)</span>
                  <input
                    name="N"
                    type="number"
                    min="0"
                    placeholder="Example: 90"
                    value={formData.N}
                    onChange={onChange}
                    required
                  />
                  <small>Primary growth nutrient (typical range: 40 to 140)</small>
                </label>
                <label className="special-field">
                  <span className="special-label">Soil pH</span>
                  <input
                    name="Soil_pH"
                    type="number"
                    min="0"
                    max="14"
                    step="0.1"
                    placeholder="Example: 6.5"
                    value={formData.Soil_pH}
                    onChange={onChange}
                    required
                  />
                  <small>Soil pH balance for crop suitability</small>
                </label>
                <label className="special-field">
                  <span className="special-label">Temperature (°C)</span>
                  <input
                    name="Temperature"
                    type="number"
                    min="-10"
                    max="60"
                    placeholder="Example: 25"
                    value={formData.Temperature}
                    onChange={onChange}
                    required
                  />
                  <small>Average temperature in your cultivation period</small>
                </label>
                <label className="special-field">
                  <span className="special-label">Rainfall (mm)</span>
                  <input
                    name="Rainfall"
                    type="number"
                    min="0"
                    placeholder="Example: 1000"
                    value={formData.Rainfall}
                    onChange={onChange}
                    required
                  />
                  <small>Average seasonal rainfall (example: 600 to 1200 mm)</small>
                </label>
              </div>
            </div>

            <div className="special-section special-section-farm">
              <div className="special-section-title">
                <span className="step-pill">Step 2</span>
                <span className="step-title">Location</span>
              </div>
              <div className="special-grid">
                <label className="special-field">
                  <span className="special-label">State</span>
                  <select
                    value={stateCode}
                    onChange={(e) => {
                      setStateCode(e.target.value);
                      setDistrictChoice("");
                      setCustomDistrict("");
                    }}
                    required
                  >
                    <option value="">Select state</option>
                    {allIndiaStates.map((stateOption) => (
                      <option key={stateOption.code} value={stateOption.code}>
                        {stateOption.name}
                      </option>
                    ))}
                  </select>
                  <small>State where your farm is located</small>
                </label>
                <label className="special-field">
                  <span className="special-label">District</span>
                  <select
                    value={districtChoice}
                    onChange={(e) => setDistrictChoice(e.target.value)}
                    required
                    disabled={!stateCode}
                  >
                    <option value="">{stateCode ? "Select district" : "Select state first"}</option>
                    {districtOptions.map((districtName) => (
                      <option key={districtName} value={districtName}>
                        {districtName}
                      </option>
                    ))}
                    <option value="__other__">Other (Enter manually)</option>
                  </select>
                  <small>District options depend on selected state</small>
                </label>

                {districtChoice === "__other__" && (
                  <label className="special-field">
                    <span className="special-label">Enter District Name</span>
                    <input
                      type="text"
                      placeholder="Type your district"
                      value={customDistrict}
                      onChange={(e) => setCustomDistrict(e.target.value)}
                      required
                    />
                    <small>Use this when your district is not listed</small>
                  </label>
                )}
              </div>
            </div>

            <div className="special-actions">
              <p className="special-form-note">Tip: Keep values realistic to get stronger suitability ranking.</p>
              <button type="submit" disabled={isLoading}>
                {isLoading ? "Analyzing..." : "Generate Recommendations"}
              </button>
              <button type="button" className="secondary" onClick={handleReset} disabled={isLoading}>
                Reset
              </button>
              <div className="special-form-trust">
                <span>Data Safe</span>
                <span>Instant Analysis</span>
                <span>Export Focused</span>
              </div>
            </div>
          </form>

          <div className="special-results">
            <div className="special-results-head">
              <span className="results-status">Live Decision Board</span>
              <h3>Recommendation Results</h3>
              <p>Ranked by suitability and export profit potential.</p>
            </div>

            {!result && (
              <div className="special-empty">
                <h3>Recommendation Preview</h3>
                <p>
                  Submit your inputs to view top 3 special crops with export-price advantage and
                  expected profit margin.
                </p>
              </div>
            )}

            {result && (
              <>
                {bestCrop && (
                  <section className="special-output-hero">
                    <div className="special-output-hero-main">
                      <p className="hero-eyebrow">Best Opportunity Right Now</p>
                      <h4>{bestCrop.cropName}</h4>
                      <p>
                        Best combined score for your conditions with {bestCrop.estimatedProfitMargin}%
                        estimated margin and {bestCrop.suitabilityScore}/100 farm fit.
                      </p>
                    </div>
                    <div className="special-output-hero-metrics">
                      <span>India: Rs {bestCrop.indiaMarketPrice.toLocaleString()}</span>
                      <span>Export: Rs {bestCrop.exportMarketPrice.toLocaleString()}</span>
                      <span>Harvest: {bestCrop.harvestTime}</span>
                    </div>
                  </section>
                )}

                {bestCrop && (
                  <section className="special-spotlight-card">
                    <div className="special-spotlight-badge">Best Crop Spotlight</div>
                    <div className="special-spotlight-main">
                      <div>
                        <p className="special-spotlight-kicker">Recommended crop</p>
                        <h4>{bestCrop.cropName}</h4>
                        <p>
                          A strong match for your climate and market conditions with an export
                          advantage of Rs {(bestCrop.exportMarketPrice - bestCrop.indiaMarketPrice).toLocaleString()}.
                        </p>
                      </div>
                      <div className="special-spotlight-score">
                        <strong>{bestCrop.suitabilityScore}/100</strong>
                        <span>Farm fit</span>
                      </div>
                    </div>
                    <div className="special-spotlight-stats">
                      <div>
                        <span>Margin</span>
                        <strong>{bestCrop.estimatedProfitMargin}%</strong>
                      </div>
                      <div>
                        <span>Harvest</span>
                        <strong>{bestCrop.harvestTime}</strong>
                      </div>
                      <div>
                        <span>Export</span>
                        <strong>Rs {bestCrop.exportMarketPrice.toLocaleString()}</strong>
                      </div>
                      <div>
                        <span>Domestic</span>
                        <strong>Rs {bestCrop.indiaMarketPrice.toLocaleString()}</strong>
                      </div>
                    </div>
                  </section>
                )}

                {bestCrop?.analytics && (
                  <section className="special-analytics-strip">
                    <div>
                      <span>Market demand</span>
                      <strong>{bestCrop.analytics.marketForecast?.current_demand ?? "-"}</strong>
                    </div>
                    <div>
                      <span>Sustainability</span>
                      <strong>
                        {bestCrop.analytics.sustainability?.sustainability_score ?? "-"}/100
                      </strong>
                    </div>
                    <div>
                      <span>Pest risk</span>
                      <strong>{bestCrop.analytics.pestRisk?.severity ?? "-"}</strong>
                    </div>
                    <div>
                      <span>Export markets</span>
                      <strong>
                        {(bestCrop.analytics.marketForecast?.export_markets ?? []).slice(0, 2).join(", ") || "-"}
                      </strong>
                    </div>
                  </section>
                )}

                {featureCards.length > 0 && (
                  <section className="special-feature-grid">
                    {featureCards.map((feature) => (
                      <article key={feature.label} className="special-feature-card">
                        <div className="special-feature-topline">
                          <span className="special-feature-icon" aria-hidden="true">
                            {feature.icon}
                          </span>
                          <span className="special-feature-label">{feature.chip}</span>
                        </div>
                        <span className="special-feature-label-text">{feature.label}</span>
                        <strong>{feature.value}</strong>
                        <p>{feature.note}</p>
                        <div className="special-feature-meter" aria-hidden="true">
                          <span
                            style={{
                              ["--meter-width"]: `${Math.max(8, Math.min(100, feature.score))}%`
                            }}
                          ></span>
                        </div>
                      </article>
                    ))}
                  </section>
                )}

                <div className="special-summary">
                  <span>Matched crops: {result.summary.matchedCount}</span>
                  <span>State: {selectedStateName || "-"}</span>
                  <span>District: {districtChoice === "__other__" ? customDistrict : districtChoice || "-"}</span>
                </div>

                <div className="special-kpi-grid">
                  <div className="special-kpi-card">
                    <strong>{averageMargin}%</strong>
                    <span>Average Margin</span>
                  </div>
                  <div className="special-kpi-card">
                    <strong>Rs {bestExportGap.toLocaleString()}</strong>
                    <span>Top Export Gap</span>
                  </div>
                  <div className="special-kpi-card">
                    <strong>{result.topRecommendations[0]?.cropName ?? "-"}</strong>
                    <span>Best Ranked Crop</span>
                  </div>
                  <div className="special-kpi-card">
                    <strong>{averageSuitability}/100</strong>
                    <span>Avg Farm Fit Score</span>
                  </div>
                </div>

                {bestCrop && secondCrop && (
                  <section className="special-compare-strip">
                    <div>
                      <span>Top Match</span>
                      <strong>{bestCrop.cropName}</strong>
                    </div>
                    <div>
                      <span>Margin Lead vs #2</span>
                      <strong>{marginLead > 0 ? `+${marginLead}%` : `${marginLead}%`}</strong>
                    </div>
                    <div>
                      <span>Farm Fit Lead</span>
                      <strong>{fitLead > 0 ? `+${fitLead}` : fitLead} pts</strong>
                    </div>
                  </section>
                )}

                {result.topRecommendations.length === 0 && (
                  <div className="special-no-results">
                    <h4>No crops matched your current filters.</h4>
                    <p>Try adjusting soil and climate values and regenerate recommendations.</p>
                  </div>
                )}

                <div className="special-top-head">
                  <h3 className="special-top-title">Top 3 Recommended Special Crops</h3>
                  <p>Shortlisted for export edge, farm fit, and your selected strategy.</p>
                </div>
                <div className="special-top-grid">
                  {result.topRecommendations.map((crop, idx) => (
                    <article key={crop.cropName} className="special-top-card">
                      <div className="rank">#{idx + 1}</div>
                      <h4>{crop.cropName}</h4>
                      <span className={`top-profit-level ${crop.profitLevel.toLowerCase()}`}>{crop.profitLevel} Profit</span>
                      <p>{crop.suitableRegion}</p>
                      <div className="special-price-row">
                        <span>India: Rs {crop.indiaMarketPrice.toLocaleString()}</span>
                        <span>Export: Rs {crop.exportMarketPrice.toLocaleString()}</span>
                      </div>
                      <div className="special-card-meta">
                        <span>Fit {crop.suitabilityScore}/100</span>
                        <span>{crop.harvestTime} harvest</span>
                        <span>{crop.processingFriendly ? "Processing-friendly" : "Raw focus"}</span>
                      </div>
                      <div className="margin">{crop.estimatedProfitMargin}% margin</div>
                    </article>
                  ))}
                </div>

                {bestCrop && (
                  <section className="special-why-card">
                    <h4>Why this ranking is strong</h4>
                    <ul>
                      <li>
                        {bestCrop.cropName} has the best total score from your selected climate,
                        soil, and location profile.
                      </li>
                      <li>
                        Export advantage is Rs{" "}
                        {(bestCrop.exportMarketPrice - bestCrop.indiaMarketPrice).toLocaleString()}
                        over domestic price.
                      </li>
                      <li>
                        Farm fit score reflects rainfall, nitrogen strength, pH balance, and
                        temperature suitability.
                      </li>
                    </ul>
                  </section>
                )}

                <div className="special-table-wrap">
                  <table className="special-table">
                    <thead>
                      <tr>
                        <th>Crop Name</th>
                        <th>Suitable Region</th>
                        <th>India Price (Rs)</th>
                        <th>Export Price (Rs)</th>
                        <th>Profit Margin (%)</th>
                        <th>Farm Fit (0-100)</th>
                        <th>Harvest</th>
                        <th>Profit Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {result.allRecommendations.map((crop) => (
                        <tr key={crop.cropName}>
                          <td>{crop.cropName}</td>
                          <td>{crop.suitableRegion}</td>
                          <td>Rs {crop.indiaMarketPrice.toLocaleString()}</td>
                          <td>Rs {crop.exportMarketPrice.toLocaleString()}</td>
                          <td>{crop.estimatedProfitMargin}%</td>
                          <td>{crop.suitabilityScore}</td>
                          <td>{crop.harvestTime}</td>
                          <td>
                            <span className={`profit-tag ${crop.profitLevel.toLowerCase()}`}>
                              {crop.profitLevel}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SpecialCropsRecommendation;
