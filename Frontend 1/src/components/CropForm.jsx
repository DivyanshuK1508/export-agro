import { useState } from "react";
import { getAllStates, getDistricts } from "india-state-district";

const allIndiaStates = getAllStates();

function CropForm({ onPredict, onReset, isPredicting }) {
  const [nitrogen, setNitrogen] = useState("");
  const [soilPh, setSoilPh] = useState("");
  const [temperature, setTemperature] = useState("");
  const [rainfall, setRainfall] = useState("");

  const [stateCode, setStateCode] = useState("");
  const [district, setDistrict] = useState("");
  const [customDistrict, setCustomDistrict] = useState("");
  const selectedStateName = allIndiaStates.find((state) => state.code === stateCode)?.name || "";
  const districtOptions = stateCode ? getDistricts(stateCode) : [];

  function handleSubmit(e) {
    e.preventDefault();

    if (isPredicting) return;

    onPredict({
      N: nitrogen,
      Soil_pH: soilPh,
      Temperature: temperature,
      Rainfall: rainfall,
      state: selectedStateName,
      district: district === "__other__" ? customDistrict.trim() : district
    });
  }

  function handleReset() {
    setNitrogen("");
    setSoilPh("");
    setTemperature("");
    setRainfall("");

    setStateCode("");
    setDistrict("");
    setCustomDistrict("");

    if (onReset) onReset();
  }

  return (
    <form className={`crop-smart-form clean-form ${isPredicting ? "is-loading" : ""}`} onSubmit={handleSubmit}>
      <div className="crop-form-header">
        <h2>Crop Recommendation Form</h2>
        <p>Enter only the required soil, weather, and location values.</p>
        <div className="crop-form-badges">
          <span>1. Soil & Climate</span>
          <span>2. Location</span>
        </div>
      </div>

      <section className="crop-form-section">
        <div className="crop-input-section-title section-soil">
          <span className="section-step">Step 1</span>
          <span>Soil / Climate</span>
        </div>
        <div className="crop-input-grid simple-grid">
          <label className="simple-field">
            <span className="simple-label">Nitrogen (N) <em>*</em></span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="Example: 90"
              value={nitrogen}
              onChange={(e) => setNitrogen(e.target.value)}
              required
            />
            <small className="simple-help">Soil nitrogen value</small>
          </label>

          <label className="simple-field">
            <span className="simple-label">Soil pH <em>*</em></span>
            <input
              type="number"
              min="0"
              max="14"
              step="0.1"
              inputMode="decimal"
              placeholder="Example: 6.5"
              value={soilPh}
              onChange={(e) => setSoilPh(e.target.value)}
              required
            />
            <small className="simple-help">pH level of your soil</small>
          </label>

          <label className="simple-field">
            <span className="simple-label">Temperature (°C) <em>*</em></span>
            <input
              type="number"
              min="-10"
              max="60"
              inputMode="numeric"
              placeholder="Example: 25"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              required
            />
            <small className="simple-help">Current average temperature</small>
          </label>

          <label className="simple-field field-wide">
            <span className="simple-label">Rainfall (mm) <em>*</em></span>
            <input
              type="number"
              min="0"
              inputMode="numeric"
              placeholder="Example: 1000"
              value={rainfall}
              onChange={(e) => setRainfall(e.target.value)}
              required
            />
            <small className="simple-help">Average seasonal rainfall in your area</small>
          </label>
        </div>
      </section>

      <section className="crop-form-section">
        <div className="crop-input-section-title section-farm">
          <span className="section-step">Step 2</span>
          <span>Location</span>
        </div>
        <div className="crop-input-grid simple-grid">
          <label className="simple-field field-wide">
            <span className="simple-label">State <em>*</em></span>
            <select
              value={stateCode}
              onChange={(e) => {
                setStateCode(e.target.value);
                setDistrict("");
                setCustomDistrict("");
              }}
              required
            >
              <option value="">Select your state</option>
              {allIndiaStates.map((stateOption) => (
                <option key={stateOption.code} value={stateOption.code}>
                  {stateOption.name}
                </option>
              ))}
            </select>
            <small className="simple-help">State where your farm is located</small>
          </label>

          <label className="simple-field field-wide">
            <span className="simple-label">District <em>*</em></span>
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
              disabled={!stateCode}
            >
              <option value="">{stateCode ? "Select your district" : "Select state first"}</option>
              {districtOptions.map((districtName) => (
                <option key={districtName} value={districtName}>
                  {districtName}
                </option>
              ))}
              <option value="__other__">Other (Enter manually)</option>
            </select>
            <small className="simple-help">District options depend on selected state</small>
          </label>

          {district === "__other__" && (
            <label className="simple-field field-wide">
              <span className="simple-label">Enter District Name <em>*</em></span>
              <input
                type="text"
                value={customDistrict}
                onChange={(e) => setCustomDistrict(e.target.value)}
                placeholder="Type your district name"
                required
              />
              <small className="simple-help">Use this if your district is not listed</small>
            </label>
          )}
        </div>
      </section>

      <div className="crop-form-actions">
        <p className="crop-form-note">Tip: Fill all required fields marked with * for better recommendations.</p>
        <div className="crop-action-buttons">
          <button type="submit" className="crop-submit-btn" disabled={isPredicting}>
            {isPredicting ? "Analyzing Conditions..." : "Generate Recommendation"}
          </button>
          <button type="button" className="crop-reset-btn" onClick={handleReset} disabled={isPredicting}>
            Reset Form
          </button>
        </div>
        <div className="crop-form-trust">
          <span>🔒 Data Safe</span>
          <span>⚡ Instant Analysis</span>
        </div>
      </div>
    </form>
  );
}

export default CropForm;
