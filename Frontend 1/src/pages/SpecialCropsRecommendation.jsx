import { useState } from "react";
import { getAllStates, getDistricts } from "india-state-district";
import "../style/Home.css";

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

  const selectedStateName =
    allIndiaStates.find((state) => state.code === stateCode)?.name || "";

  const districtOptions = stateCode ? getDistricts(stateCode) : [];

  function onChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  // ✅ UPDATED FUNCTION (IMPORTANT)
  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);

    const submitPayload = {
      ...formData,
      state: selectedStateName,
      district:
        districtChoice === "__other__"
          ? customDistrict.trim()
          : districtChoice
    };

    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/special-crops/recommendations",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(submitPayload)
        }
      );

      const data = await response.json();
      console.log("API Response:", data);

      setResult(data);
    } catch (error) {
      console.error("Error fetching special crops:", error);
    }

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
      <section className="special-content">
        <div className="special-layout">
          <form
            id="special-form"
            className="special-form"
            onSubmit={handleSubmit}
          >
            <h2>Special Crop Recommendation</h2>

            <input
              name="N"
              placeholder="Nitrogen"
              value={formData.N}
              onChange={onChange}
              required
            />

            <input
              name="Soil_pH"
              placeholder="Soil pH"
              value={formData.Soil_pH}
              onChange={onChange}
              required
            />

            <input
              name="Temperature"
              placeholder="Temperature"
              value={formData.Temperature}
              onChange={onChange}
              required
            />

            <input
              name="Rainfall"
              placeholder="Rainfall"
              value={formData.Rainfall}
              onChange={onChange}
              required
            />

            <select
              value={stateCode}
              onChange={(e) => {
                setStateCode(e.target.value);
                setDistrictChoice("");
              }}
              required
            >
              <option value="">Select State</option>
              {allIndiaStates.map((state) => (
                <option key={state.code} value={state.code}>
                  {state.name}
                </option>
              ))}
            </select>

            <select
              value={districtChoice}
              onChange={(e) => setDistrictChoice(e.target.value)}
              required
            >
              <option value="">Select District</option>
              {districtOptions.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
              <option value="__other__">Other</option>
            </select>

            {districtChoice === "__other__" && (
              <input
                placeholder="Enter District"
                value={customDistrict}
                onChange={(e) => setCustomDistrict(e.target.value)}
              />
            )}

            <button type="submit" disabled={isLoading}>
              {isLoading ? "Loading..." : "Get Recommendation"}
            </button>

            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </form>

          {/* ✅ RESULT DISPLAY */}
          <div className="special-results">
            {result && (
              <>
                <h3>Top Recommendations</h3>

                {result.topRecommendations.map((crop, index) => (
                  <div key={index} className="card">
                    <h4>{crop.cropName}</h4>
                    <p>Export Price: ₹{crop.exportMarketPrice}</p>
                    <p>Profit Margin: {crop.estimatedProfitMargin}%</p>
                    <p>Best Export Country: {crop.bestExportCountry}</p>
                    <p>Suitability: {crop.suitabilityScore}/100</p>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default SpecialCropsRecommendation;