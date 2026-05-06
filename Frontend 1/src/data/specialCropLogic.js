const SPECIAL_CROPS = [
  {
    name: "Moringa",
    suitableRegions: ["Tamil Nadu", "Karnataka", "Maharashtra"],
    seasons: ["Kharif", "Zaid"],
    rainfallRange: [400, 1200],
    nutrientBand: [120, 240],
    harvestTime: "Short",
    processingFriendly: true,
    indiaPrice: 5200,
    exportPrice: 9100
  },
  {
    name: "Makhana",
    suitableRegions: ["Uttar Pradesh", "Bihar", "West Bengal"],
    seasons: ["Kharif"],
    rainfallRange: [900, 1800],
    nutrientBand: [110, 220],
    harvestTime: "Long",
    processingFriendly: true,
    indiaPrice: 7600,
    exportPrice: 13200
  },
  {
    name: "Psyllium Husk",
    suitableRegions: ["Rajasthan", "Gujarat", "Haryana"],
    seasons: ["Rabi"],
    rainfallRange: [250, 700],
    nutrientBand: [100, 210],
    harvestTime: "Medium",
    processingFriendly: true,
    indiaPrice: 9800,
    exportPrice: 16800
  },
  {
    name: "Saffron",
    suitableRegions: ["Jammu & Kashmir", "Himachal Pradesh"],
    seasons: ["Rabi"],
    rainfallRange: [600, 1100],
    nutrientBand: [130, 230],
    harvestTime: "Long",
    processingFriendly: false,
    indiaPrice: 122000,
    exportPrice: 198000
  },
  {
    name: "Exotic Mushrooms",
    suitableRegions: ["Punjab", "Haryana", "Karnataka"],
    seasons: ["Zaid", "Rabi"],
    rainfallRange: [500, 1400],
    nutrientBand: [140, 260],
    harvestTime: "Short",
    processingFriendly: true,
    indiaPrice: 14500,
    exportPrice: 23600
  },
  {
    name: "Millets",
    suitableRegions: ["Karnataka", "Maharashtra", "Rajasthan", "Tamil Nadu"],
    seasons: ["Kharif", "Rabi"],
    rainfallRange: [350, 900],
    nutrientBand: [90, 220],
    harvestTime: "Medium",
    processingFriendly: false,
    indiaPrice: 3600,
    exportPrice: 7300
  },
  {
    name: "Pomegranate",
    suitableRegions: ["Maharashtra", "Karnataka", "Gujarat"],
    seasons: ["Kharif", "Zaid"],
    rainfallRange: [450, 950],
    nutrientBand: [130, 250],
    harvestTime: "Medium",
    processingFriendly: true,
    indiaPrice: 9200,
    exportPrice: 14900
  }
];

function toProfitLevel(margin) {
  if (margin >= 90) return "High";
  if (margin >= 55) return "Medium";
  return "Low";
}

function toRecommendationShapeFromBackend(apiData, input) {
  const recommendations = (apiData.topRecommendations ?? apiData.allRecommendations ?? []).map((item) => ({
    cropName: String(item.cropName ?? item.crop ?? "Special Crop"),
    suitableRegion: String(item.suitableRegion ?? input.state ?? "India"),
    indiaMarketPrice: Math.round(Number(item.indiaMarketPrice ?? item.localPrice ?? 0)),
    exportMarketPrice: Math.round(Number(item.exportMarketPrice ?? item.exportPrice ?? 0)),
    estimatedProfitMargin: Math.round(Number(item.estimatedProfitMargin ?? item.profitMargin ?? 0)),
    profitLevel: item.profitLevel ?? toProfitLevel(Number(item.estimatedProfitMargin ?? item.profitMargin ?? 0)),
    harvestTime: item.harvestTime ?? "Medium",
    processingFriendly: Boolean(item.processingFriendly ?? true),
    suitabilityScore: Math.round(Number(item.suitabilityScore ?? 0)),
    totalScore: Number(item.totalScore ?? 0),
    bestExportCountry: item.bestExportCountry ?? apiData.bestExportCountry ?? "",
    analytics: item.analytics ?? null
  }));

  const topRecommendations = recommendations.slice(0, 3);

  return {
    topRecommendations,
    allRecommendations: recommendations,
    summary: apiData.summary ?? {
      matchedCount: recommendations.length,
      priority: topRecommendations[0]?.profitLevel ?? "Low",
      mode: "Backend",
    }
  };
}

function scoreCrop(crop, input) {
  const nitrogen = Number(input.N ?? input.nitrogen ?? 0);
  const soilPh = Number(input.Soil_pH ?? input.soilPh ?? 7);
  const temperature = Number(input.Temperature ?? input.temperature ?? 25);
  const rainfall = Number(input.Rainfall ?? input.rainfall ?? 0);
  const district = input.district || "";
  const fertilityIndex = nitrogen + Math.max(0, 84 - Math.abs(soilPh - 6.5) * 20);

  let score = 0;

  if (crop.suitableRegions.includes(input.state)) score += 28;
  if (district) score += 8;

  if (rainfall >= crop.rainfallRange[0] && rainfall <= crop.rainfallRange[1]) {
    score += 22;
  } else {
    const rainfallGap = Math.min(
      Math.abs(rainfall - crop.rainfallRange[0]),
      Math.abs(rainfall - crop.rainfallRange[1])
    );
    score += Math.max(0, 22 - rainfallGap / 30);
  }

  if (fertilityIndex >= crop.nutrientBand[0] && fertilityIndex <= crop.nutrientBand[1]) {
    score += 20;
  } else {
    const nutrientGap = Math.min(
      Math.abs(fertilityIndex - crop.nutrientBand[0]),
      Math.abs(fertilityIndex - crop.nutrientBand[1])
    );
    score += Math.max(0, 20 - nutrientGap / 8);
  }

  // Higher score when pH is near neutral and temperature is near crop-friendly band.
  score += Math.max(0, 12 - Math.abs(soilPh - 6.5) * 3);
  score += Math.max(0, 10 - Math.abs(temperature - 27) * 0.8);

  return Math.round(score);
}

export async function recommendSpecialCrops(input) {
  const apiUrl = import.meta.env.VITE_API_URL;
  if (apiUrl) {
    try {
      const payload = {
        Temperature: Number(input.Temperature ?? 0),
        Soil_pH: Number(input.Soil_pH ?? 0),
        Rainfall: Number(input.Rainfall ?? 0),
        N: Number(input.N ?? 0),
        state: input.state || "",
        district: input.district || ""
      };

      const res = await fetch(`${apiUrl.replace(/\/$/, "")}/api/special-crops/recommendations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        const apiData = await res.json();
        return toRecommendationShapeFromBackend(apiData, input);
      }
    } catch (err) {
      console.error("Special crops API failed, using local fallback:", err);
    }
  }

  const priorityThreshold = 35;
  const rainfall = Number(input.Rainfall ?? input.rainfall ?? 0);
  const temperature = Number(input.Temperature ?? input.temperature ?? 25);

  const normalized = SPECIAL_CROPS.map((crop) => {
    const baseMargin = ((crop.exportPrice - crop.indiaPrice) / crop.indiaPrice) * 100;
    const rainfallBonus = rainfall >= crop.rainfallRange[0] && rainfall <= crop.rainfallRange[1] ? 6 : 0;
    const climateBonus = Math.max(0, 6 - Math.abs(temperature - 27) * 0.5);

    const estimatedProfitMargin = Math.round(baseMargin + rainfallBonus + climateBonus);
    const suitability = scoreCrop(crop, input);

    return {
      cropName: crop.name,
      suitableRegion: crop.suitableRegions.join(", "),
      indiaMarketPrice: Math.round(crop.indiaPrice),
      exportMarketPrice: Math.round(crop.exportPrice),
      estimatedProfitMargin,
      profitLevel: toProfitLevel(estimatedProfitMargin),
      harvestTime: crop.harvestTime,
      processingFriendly: crop.processingFriendly,
      suitabilityScore: suitability,
      totalScore: estimatedProfitMargin * 0.65 + suitability * 0.35
    };
  })
    .filter((crop) => crop.estimatedProfitMargin >= priorityThreshold)
    .sort((a, b) => b.totalScore - a.totalScore);

  const recommendations = normalized.slice(0, 6);

  return {
    topRecommendations: recommendations.slice(0, 3),
    allRecommendations: recommendations,
    summary: {
      matchedCount: recommendations.length,
      priority: "Standard",
      mode: "Auto"
    }
  };
}
