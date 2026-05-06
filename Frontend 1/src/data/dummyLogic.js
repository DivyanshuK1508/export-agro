// Wrapper: if a backend API is provided via Vite env (`VITE_API_URL`), call it.
// Otherwise fall back to the in-browser dummy logic below.
export async function predictCrop(input) {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    try {
      const res = await fetch(`${apiUrl.replace(/\/$/, '')}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(input)
      });
      if (!res.ok) throw new Error(`API error ${res.status}`);
      const data = await res.json();
      return data;
    } catch (err) {
      console.error('Backend call failed, falling back to local logic:', err);
      // fall through to local fallback
    }
  }

  // --- local fallback logic (unchanged) ---
  const nitrogen = Number(input.N ?? input.nitrogen ?? 0);
  const soilPh = Number(input.Soil_pH ?? input.soilPh ?? 7);
  const temperature = Number(input.Temperature ?? input.temperature ?? 25);
  const rainfall = Number(input.Rainfall ?? input.rainfall ?? 0);
  const state = input.state || "Unknown State";
  const district = input.district || "Unknown District";

  const phBalance = Math.max(0, 1 - Math.abs(soilPh - 6.5) / 3);
  const climateScore = Math.min(100, (rainfall / 1400) * 50 + ((40 - Math.abs(temperature - 26)) / 40) * 50);
  const nutrientScore = Math.min(100, (nitrogen / 150) * 100);

  let cropYield =
    2.2 +
    nutrientScore * 0.03 +
    phBalance * 1.5 +
    (Math.max(0, 100 - Math.abs(temperature - 26) * 4) / 100) * 1.2 +
    (Math.min(1200, rainfall) / 1200) * 1.8 +
    Math.random() * 0.8;
  cropYield = Math.max(1.2, Math.min(12, cropYield));
  const adjustedYield = cropYield.toFixed(2);

  let crop;
  let riskScore;
  let exportCountry;
  let mktPrice;
  let expPrice;

  if (rainfall >= 900 && rainfall <= 1500 && temperature >= 22 && temperature <= 32 && soilPh >= 5.5 && soilPh <= 7.2 && nitrogen >= 75) {
    crop = "Rice";
    riskScore = "Low";
    exportCountry = "UAE, Saudi Arabia";
    mktPrice = 2100 + Math.random() * 500;
    expPrice = 2900 + Math.random() * 700;
  } else if (rainfall >= 600 && rainfall <= 1300 && temperature >= 20 && temperature <= 35 && soilPh >= 5.8 && soilPh <= 7.8 && nitrogen >= 80) {
    crop = "Sugarcane";
    riskScore = "Medium";
    exportCountry = "Indonesia, Bangladesh";
    mktPrice = 3200 + Math.random() * 700;
    expPrice = 4700 + Math.random() * 1200;
  } else if (rainfall >= 450 && rainfall <= 900 && temperature >= 15 && temperature <= 28 && soilPh >= 6 && soilPh <= 7.5) {
    crop = "Wheat";
    riskScore = "Low";
    exportCountry = "Nepal, Bangladesh";
    mktPrice = 2500 + Math.random() * 550;
    expPrice = 3400 + Math.random() * 700;
  } else if (rainfall < 700 && temperature >= 24) {
    crop = "Millet";
    riskScore = "Low";
    exportCountry = "UAE, Germany";
    mktPrice = 1800 + Math.random() * 450;
    expPrice = 3900 + Math.random() * 900;
  } else {
    crop = "Cotton";
    riskScore = "Medium";
    exportCountry = "Vietnam, China";
    mktPrice = 5200 + Math.random() * 1200;
    expPrice = 6400 + Math.random() * 1600;
  }

  mktPrice = Math.round(mktPrice);
  expPrice = Math.round(expPrice);

  const locationBoost = state === "Tamil Nadu" || district === "Coimbatore" ? 5 : 0;

  const exportPotentialScore = Math.min(100, Math.max(0,
    nutrientScore * 0.35 +
    climateScore * 0.35 +
    phBalance * 20 +
    (mktPrice / 8000) * 10 +
    locationBoost
  ));

  const riskSafetyScore = Math.min(100, Math.max(0,
    80 - Math.abs(soilPh - 6.5) * 10 +
    Math.min(20, rainfall / 80) +
    Math.max(0, 18 - Math.abs(temperature - 27) * 2) +
    Math.min(15, nitrogen / 10)
  ));

  const totalProduction = parseFloat(adjustedYield);
  const localMarketRevenue = Math.round(totalProduction * 0.65 * mktPrice);
  const exportMarketRevenue = Math.round(totalProduction * 0.35 * expPrice);
  
  const localMarketLoss = Math.round(
    (riskScore === "High" ? 35000 : riskScore === "Medium" ? 28000 : 15000) +
    Math.random() * 5000
  );
  const exportMarketLoss = Math.round(
    (riskScore === "High" ? 40000 : riskScore === "Medium" ? 35000 : 20000) +
    Math.random() * 5000
  );

  const localProfit = localMarketRevenue - localMarketLoss;
  const exportProfit = exportMarketRevenue - exportMarketLoss;
  const betterOption = localProfit > exportProfit ? "Sell in Local Market" : "Export to International Market";

  return {
    crop,
    export: exportPotentialScore,
    risk: riskSafetyScore,
    yield: parseFloat(adjustedYield),
    marketPrice: mktPrice,
    exportPrice: expPrice,
    bestCountry: exportCountry,
    localMarketRevenue,
    exportMarketRevenue,
    localMarketLoss,
    exportMarketLoss,
    betterOption,
    localProfit,
    exportProfit
  };
}
