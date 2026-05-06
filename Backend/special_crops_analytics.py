import pandas as pd
import numpy as np
import json
from datetime import datetime, timedelta

class SpecialCropsAnalytics:
    """
    Advanced analytics for special crops including:
    - Pest risk analysis
    - Weather impact modeling
    - Market forecasting
    - Sustainability scoring
    - Quality metrics
    - Supply chain optimization
    """
    
    def __init__(self):
        self.pest_risk_data = self._init_pest_risks()
        self.weather_impact = self._init_weather_impacts()
        self.market_trends = self._init_market_trends()
        self.sustainability_metrics = self._init_sustainability_metrics()
        self.quality_standards = self._init_quality_standards()
    
    def _init_pest_risks(self):
        """Pest and disease risks by crop and season"""
        return {
            'Moringa': {
                'winter': {'risks': ['Leaf Spot', 'Aphids'], 'severity': 'Low', 'score': 3.5},
                'summer': {'risks': ['Heat Stress', 'Spider Mites'], 'severity': 'Medium', 'score': 5.5},
                'monsoon': {'risks': ['Fungal Infections'], 'severity': 'High', 'score': 7.0},
                'spring': {'risks': ['Leaf Curl'], 'severity': 'Low', 'score': 3.0}
            },
            'Makhana': {
                'winter': {'risks': ['Stem Rot'], 'severity': 'Low', 'score': 3.0},
                'summer': {'risks': ['Water Stress'], 'severity': 'Medium', 'score': 5.5},
                'monsoon': {'risks': ['Fungal Blight'], 'severity': 'High', 'score': 7.5},
                'spring': {'risks': ['Leaf Spot'], 'severity': 'Low', 'score': 2.5}
            },
            'Psyllium Husk': {
                'winter': {'risks': ['Powdery Mildew'], 'severity': 'Low', 'score': 3.0},
                'summer': {'risks': ['Heat Stress'], 'severity': 'Medium', 'score': 5.0},
                'monsoon': {'risks': ['Fungal Rot'], 'severity': 'High', 'score': 7.0},
                'spring': {'risks': ['Aphids'], 'severity': 'Low', 'score': 2.5}
            },
            'Exotic Mushrooms': {
                'winter': {'risks': ['Low Temperature Shock'], 'severity': 'Medium', 'score': 5.0},
                'summer': {'risks': ['Heat Stress'], 'severity': 'High', 'score': 8.0},
                'monsoon': {'risks': ['Contamination', 'Fungal Overgrowth'], 'severity': 'High', 'score': 8.5},
                'spring': {'risks': ['Humidity Imbalance'], 'severity': 'Medium', 'score': 5.5}
            },
            'Millets': {
                'winter': {'risks': ['Bird Damage'], 'severity': 'Low', 'score': 2.5},
                'summer': {'risks': ['Drought Stress'], 'severity': 'Medium', 'score': 4.5},
                'monsoon': {'risks': ['Rust'], 'severity': 'Medium', 'score': 5.0},
                'spring': {'risks': ['Aphids'], 'severity': 'Low', 'score': 2.0}
            },
            'Pomegranate': {
                'winter': {'risks': ['Fruit Spot'], 'severity': 'Low', 'score': 3.0},
                'summer': {'risks': ['Sunburn', 'Fruit Cracking'], 'severity': 'Medium', 'score': 5.5},
                'monsoon': {'risks': ['Bacterial Blight', 'Wilt'], 'severity': 'High', 'score': 7.5},
                'spring': {'risks': ['Aphids'], 'severity': 'Low', 'score': 2.5}
            },
            'Lavender': {
                'winter': {'risks': ['Root Rot', 'Gray Mold'], 'severity': 'Medium', 'score': 6.5},
                'summer': {'risks': ['Spider Mites', 'Leaf Spot'], 'severity': 'Medium', 'score': 6.0},
                'monsoon': {'risks': ['Fungal Infections'], 'severity': 'High', 'score': 7.5},
                'spring': {'risks': ['Thrips', 'Mites'], 'severity': 'Low', 'score': 4.5}
            },
            'Turmeric': {
                'winter': {'risks': ['Leaf Blotch'], 'severity': 'Low', 'score': 4.0},
                'summer': {'risks': ['Rhizome Rot', 'Leaf Spot'], 'severity': 'Medium', 'score': 6.5},
                'monsoon': {'risks': ['Rhizome Rot', 'Stem Rot'], 'severity': 'High', 'score': 8.0},
                'spring': {'risks': ['Early Blight'], 'severity': 'Low', 'score': 3.5}
            },
            'Saffron': {
                'winter': {'risks': ['Nematodes', 'Corm Rot'], 'severity': 'Medium', 'score': 7.0},
                'summer': {'risks': ['Thrips'], 'severity': 'Low', 'score': 3.0},
                'monsoon': {'risks': ['Fungal Rot'], 'severity': 'High', 'score': 8.5},
                'spring': {'risks': ['Leaf Blotch'], 'severity': 'Low', 'score': 2.5}
            },
            'Ashwagandha': {
                'winter': {'risks': ['Root Rot'], 'severity': 'Medium', 'score': 5.5},
                'summer': {'risks': ['Leaf Spot', 'Rust'], 'severity': 'Medium', 'score': 5.0},
                'monsoon': {'risks': ['Root Rot', 'Damping Off'], 'severity': 'High', 'score': 7.0},
                'spring': {'risks': ['Leaf Webber'], 'severity': 'Low', 'score': 3.0}
            },
            'Dragon Fruit': {
                'winter': {'risks': ['Anthracnose'], 'severity': 'Low', 'score': 3.5},
                'summer': {'risks': ['Stem Canker'], 'severity': 'Medium', 'score': 5.5},
                'monsoon': {'risks': ['Fungal Infection'], 'severity': 'High', 'score': 7.0},
                'spring': {'risks': ['Bacterial Spot'], 'severity': 'Low', 'score': 2.5}
            }
        }
    
    def _init_weather_impacts(self):
        """Weather conditions that favor/hinder crop growth"""
        return {
            'Moringa': {
                'optimal_temp': (25, 35),
                'optimal_humidity': (40, 60),
                'optimal_rainfall': 800,
                'heat_stress_above': 38,
                'cold_stress_below': 10,
                'moisture_stress': 'Moderate - drought tolerant once established',
                'wind_tolerance': 'High'
            },
            'Makhana': {
                'optimal_temp': (24, 32),
                'optimal_humidity': (60, 80),
                'optimal_rainfall': 1400,
                'heat_stress_above': 36,
                'cold_stress_below': 12,
                'moisture_stress': 'Needs standing water / high moisture',
                'wind_tolerance': 'Low'
            },
            'Psyllium Husk': {
                'optimal_temp': (20, 30),
                'optimal_humidity': (30, 45),
                'optimal_rainfall': 450,
                'heat_stress_above': 35,
                'cold_stress_below': 8,
                'moisture_stress': 'Prefers dry conditions',
                'wind_tolerance': 'Medium'
            },
            'Exotic Mushrooms': {
                'optimal_temp': (18, 26),
                'optimal_humidity': (70, 90),
                'optimal_rainfall': 1000,
                'heat_stress_above': 30,
                'cold_stress_below': 10,
                'moisture_stress': 'Needs controlled humidity',
                'wind_tolerance': 'Low'
            },
            'Millets': {
                'optimal_temp': (24, 34),
                'optimal_humidity': (25, 50),
                'optimal_rainfall': 600,
                'heat_stress_above': 40,
                'cold_stress_below': 12,
                'moisture_stress': 'Very drought tolerant',
                'wind_tolerance': 'High'
            },
            'Pomegranate': {
                'optimal_temp': (18, 32),
                'optimal_humidity': (30, 50),
                'optimal_rainfall': 700,
                'heat_stress_above': 38,
                'cold_stress_below': 5,
                'moisture_stress': 'Avoid waterlogging',
                'wind_tolerance': 'Medium'
            },
            'Lavender': {
                'optimal_temp': (18, 25),
                'optimal_humidity': (30, 40),
                'optimal_rainfall': 300,
                'heat_stress_above': 32,
                'cold_stress_below': 5,
                'moisture_stress': 'High - needs dry conditions',
                'wind_tolerance': 'High'
            },
            'Turmeric': {
                'optimal_temp': (22, 30),
                'optimal_humidity': (70, 80),
                'optimal_rainfall': 1750,
                'heat_stress_above': 35,
                'cold_stress_below': 10,
                'moisture_stress': 'Needs consistent moisture',
                'wind_tolerance': 'Medium'
            },
            'Saffron': {
                'optimal_temp': (10, 25),
                'optimal_humidity': (50, 60),
                'optimal_rainfall': 500,
                'heat_stress_above': 28,
                'cold_stress_below': -5,
                'moisture_stress': 'Moderate - well-draining',
                'wind_tolerance': 'Low - needs protection'
            },
            'Ashwagandha': {
                'optimal_temp': (20, 28),
                'optimal_humidity': (40, 60),
                'optimal_rainfall': 600,
                'heat_stress_above': 35,
                'cold_stress_below': 0,
                'moisture_stress': 'Drought tolerant',
                'wind_tolerance': 'High'
            },
            'Dragon Fruit': {
                'optimal_temp': (22, 32),
                'optimal_humidity': (50, 60),
                'optimal_rainfall': 800,
                'heat_stress_above': 40,
                'cold_stress_below': 12,
                'moisture_stress': 'Prefers dry - good drainage',
                'wind_tolerance': 'Medium - needs support'
            }
        }
    
    def _init_market_trends(self):
        """Market demand and price trends for special crops"""
        return {
            'Moringa': {
                'current_demand': 'High',
                'price_trend': 'Upward',
                'export_markets': ['UAE', 'USA', 'Europe'],
                'growth_rate': '+16% YoY',
                'market_opportunity': 'Nutraceuticals & health food',
                'forecast_2024': 'Strong demand from wellness buyers'
            },
            'Makhana': {
                'current_demand': 'Very High',
                'price_trend': 'Upward',
                'export_markets': ['USA', 'Middle East', 'Singapore'],
                'growth_rate': '+20% YoY',
                'market_opportunity': 'Premium healthy snack',
                'forecast_2024': 'Export demand remains strong'
            },
            'Psyllium Husk': {
                'current_demand': 'High',
                'price_trend': 'Stable-Upward',
                'export_markets': ['USA', 'Europe', 'Middle East'],
                'growth_rate': '+10% YoY',
                'market_opportunity': 'Dietary fiber and pharma',
                'forecast_2024': 'Stable international demand'
            },
            'Exotic Mushrooms': {
                'current_demand': 'High',
                'price_trend': 'Upward',
                'export_markets': ['Japan', 'Singapore', 'UAE'],
                'growth_rate': '+14% YoY',
                'market_opportunity': 'Gourmet and processed foods',
                'forecast_2024': 'Premium export opportunity'
            },
            'Millets': {
                'current_demand': 'High',
                'price_trend': 'Upward',
                'export_markets': ['USA', 'Europe', 'UAE'],
                'growth_rate': '+17% YoY',
                'market_opportunity': 'Healthy grains and superfoods',
                'forecast_2024': 'Growing health-food demand'
            },
            'Pomegranate': {
                'current_demand': 'High',
                'price_trend': 'Stable',
                'export_markets': ['UAE', 'UK', 'Netherlands'],
                'growth_rate': '+9% YoY',
                'market_opportunity': 'Fresh fruit export',
                'forecast_2024': 'Consistent premium demand'
            },
            'Lavender': {
                'current_demand': 'Very High',
                'price_trend': 'Upward',
                'export_markets': ['France', 'UK', 'USA', 'Australia'],
                'growth_rate': '+18% YoY',
                'market_opportunity': 'Premium essential oils',
                'forecast_2024': 'Strong growth in wellness market'
            },
            'Turmeric': {
                'current_demand': 'High',
                'price_trend': 'Stable',
                'export_markets': ['UAE', 'USA', 'Mexico', 'Japan'],
                'growth_rate': '+8% YoY',
                'market_opportunity': 'Health supplements & cosmetics',
                'forecast_2024': 'Steady with organic premium'
            },
            'Saffron': {
                'current_demand': 'Medium-High',
                'price_trend': 'Upward',
                'export_markets': ['Iran', 'Spain', 'USA', 'UK'],
                'growth_rate': '+12% YoY',
                'market_opportunity': 'Luxury culinary & cosmetics',
                'forecast_2024': 'Growing demand from Asia'
            },
            'Ashwagandha': {
                'current_demand': 'Very High',
                'price_trend': 'Upward',
                'export_markets': ['USA', 'Europe', 'Australia', 'Canada'],
                'growth_rate': '+25% YoY',
                'market_opportunity': 'Adaptogenic supplement boom',
                'forecast_2024': 'Explosive growth in wellness'
            },
            'Dragon Fruit': {
                'current_demand': 'High',
                'price_trend': 'Stable-Upward',
                'export_markets': ['China', 'SE Asia', 'USA', 'Europe'],
                'growth_rate': '+15% YoY',
                'market_opportunity': 'Superfood & exotic fruit trend',
                'forecast_2024': 'Strong Asian demand'
            }
        }
    
    def _init_sustainability_metrics(self):
        """Environmental impact and sustainability scores"""
        return {
            'Moringa': {
                'water_usage': 'Low (500-800mm/year)',
                'soil_degradation': 'Low - improves soil health',
                'biodiversity_impact': 'High - supports pollinators',
                'carbon_footprint': 'Low',
                'organic_potential': 'High',
                'sustainability_score': 90
            },
            'Makhana': {
                'water_usage': 'High (1400mm+)',
                'soil_degradation': 'Low',
                'biodiversity_impact': 'Medium',
                'carbon_footprint': 'Low',
                'organic_potential': 'High',
                'sustainability_score': 80
            },
            'Psyllium Husk': {
                'water_usage': 'Very Low (250-500mm)',
                'soil_degradation': 'Low',
                'biodiversity_impact': 'Medium',
                'carbon_footprint': 'Very Low',
                'organic_potential': 'Very High',
                'sustainability_score': 93
            },
            'Exotic Mushrooms': {
                'water_usage': 'Controlled humidity only',
                'soil_degradation': 'Minimal',
                'biodiversity_impact': 'Medium',
                'carbon_footprint': 'Low',
                'organic_potential': 'High',
                'sustainability_score': 82
            },
            'Millets': {
                'water_usage': 'Very Low (250-600mm)',
                'soil_degradation': 'Very Low - regenerative potential',
                'biodiversity_impact': 'High',
                'carbon_footprint': 'Very Low',
                'organic_potential': 'Very High',
                'sustainability_score': 96
            },
            'Pomegranate': {
                'water_usage': 'Moderate (700-900mm)',
                'soil_degradation': 'Low',
                'biodiversity_impact': 'Medium',
                'carbon_footprint': 'Low',
                'organic_potential': 'High',
                'sustainability_score': 87
            },
            'Lavender': {
                'water_usage': 'Very Low (300mm/year)',
                'soil_degradation': 'Minimal - improves soil',
                'biodiversity_impact': 'High - attracts pollinators',
                'carbon_footprint': 'Low',
                'organic_potential': 'Very High',
                'sustainability_score': 95
            },
            'Turmeric': {
                'water_usage': 'High (1750mm)',
                'soil_degradation': 'Moderate - crop rotation needed',
                'biodiversity_impact': 'Medium',
                'carbon_footprint': 'Moderate',
                'organic_potential': 'High',
                'sustainability_score': 75
            },
            'Saffron': {
                'water_usage': 'Low-Moderate (500mm)',
                'soil_degradation': 'Low - sustainable',
                'biodiversity_impact': 'High - supports ecosystems',
                'carbon_footprint': 'Very Low',
                'organic_potential': 'Very High',
                'sustainability_score': 90
            },
            'Ashwagandha': {
                'water_usage': 'Very Low (600mm) - drought tolerant',
                'soil_degradation': 'Beneficial - nitrogen fixing',
                'biodiversity_impact': 'High',
                'carbon_footprint': 'Very Low',
                'organic_potential': 'Very High',
                'sustainability_score': 92
            },
            'Dragon Fruit': {
                'water_usage': 'Low (800mm) - minimal irrigation',
                'soil_degradation': 'Minimal',
                'biodiversity_impact': 'Medium',
                'carbon_footprint': 'Low',
                'organic_potential': 'High',
                'sustainability_score': 85
            }
        }
    
    def _init_quality_standards(self):
        """International quality standards and certifications"""
        return {
            'Moringa': {
                'certifications': ['Organic', 'GAP'],
                'quality_parameters': {
                    'leaf_color': 'Deep green',
                    'moisture': 'Low',
                    'taste': 'Mild, earthy'
                },
                'premium_varieties': ['PKM-1', 'PKM-2'],
                'price_premium': '+80-140% for organic'
            },
            'Makhana': {
                'certifications': ['Organic', 'FSSAI'],
                'quality_parameters': {
                    'seed_size': 'Large, uniform',
                    'moisture': 'Very Low',
                    'color': 'White'
                },
                'premium_varieties': ['Hand-popped', 'Premium large'],
                'price_premium': '+100-180% for premium grade'
            },
            'Psyllium Husk': {
                'certifications': ['Organic', 'GI', 'ISO 22000'],
                'quality_parameters': {
                    'fiber_content': 'High',
                    'purity': '>95%',
                    'color': 'Light cream'
                },
                'premium_varieties': ['Clean husk', 'Extra-fine husk'],
                'price_premium': '+70-120% for pharma grade'
            },
            'Exotic Mushrooms': {
                'certifications': ['Organic', 'Export certified'],
                'quality_parameters': {
                    'cap_size': 'Uniform',
                    'freshness': 'Very High',
                    'texture': 'Firm'
                },
                'premium_varieties': ['Oyster', 'Shiitake'],
                'price_premium': '+60-130% for export grade'
            },
            'Millets': {
                'certifications': ['Organic', 'Non-GMO'],
                'quality_parameters': {
                    'grain_size': 'Uniform',
                    'cleanliness': 'High',
                    'moisture': 'Low'
                },
                'premium_varieties': ['Foxtail', 'Finger', 'Kodo'],
                'price_premium': '+50-110% for organic'
            },
            'Pomegranate': {
                'certifications': ['GlobalG.A.P.', 'Organic'],
                'quality_parameters': {
                    'brix_level': 'High',
                    'color': 'Deep red',
                    'firmness': 'Firm'
                },
                'premium_varieties': ['Bhagwa', 'Arakta'],
                'price_premium': '+40-90% for export grade'
            },
            'Lavender': {
                'certifications': ['Organic', 'Fair Trade', 'ISO 9001'],
                'quality_parameters': {
                    'oil_content': '0.5-1.5%',
                    'color': 'Purple-violet',
                    'aroma_strength': 'Strong floral'
                },
                'premium_varieties': ['Grosso', 'Super', 'Hidcote'],
                'price_premium': '+150-300% for certified organic'
            },
            'Turmeric': {
                'certifications': ['Organic', 'GI Status', 'ISO 22000'],
                'quality_parameters': {
                    'curcumin_content': '3-10%',
                    'color': 'Golden-orange',
                    'aroma': 'Warm, earthy'
                },
                'premium_varieties': ['Alleppey', 'Rajendra', 'Megha'],
                'price_premium': '+80-150% for high curcumin'
            },
            'Saffron': {
                'certifications': ['Organic', 'PDO', 'GI'],
                'quality_parameters': {
                    'color_strength': 'ASTA > 180',
                    'flavor_strength': 'High',
                    'crocin_content': '>85%'
                },
                'premium_varieties': ['Mongra', 'Lacha', 'Guchhi'],
                'price_premium': '+300-500% for premium grades'
            },
            'Ashwagandha': {
                'certifications': ['Organic', 'GMP', 'ISO 13485'],
                'quality_parameters': {
                    'withanolide_content': '>1.5%',
                    'alkaloid': 'Full spectrum',
                    'potency': 'High'
                },
                'premium_varieties': ['KSM-66', 'Sensoril'],
                'price_premium': '+100-250% for standardized extracts'
            },
            'Dragon Fruit': {
                'certifications': ['Organic', 'Export certified'],
                'quality_parameters': {
                    'brix_level': '13-15',
                    'color': 'Vibrant pink/red',
                    'firmness': 'Medium-firm'
                },
                'premium_varieties': ['Red flesh', 'Pink skin'],
                'price_premium': '+50-100% for organic'
            }
        }
    
    def calculate_pest_risk(self, crop_name, current_month=None):
        """Calculate pest risk based on current season"""
        if current_month is None:
            current_month = datetime.now().month
        
        # Determine season
        if current_month in [12, 1, 2]:
            season = 'winter'
        elif current_month in [3, 4, 5]:
            season = 'spring'
        elif current_month in [6, 7, 8, 9]:
            season = 'monsoon'
        else:
            season = 'summer'
        
        pest_data = self.pest_risk_data.get(crop_name, {}).get(season, {})
        
        return {
            'season': season,
            'risks': pest_data.get('risks', []),
            'severity': pest_data.get('severity', 'Unknown'),
            'risk_score': pest_data.get('score', 5),
            'recommendations': self._get_pest_recommendations(crop_name, pest_data.get('risks', []))
        }
    
    def _get_pest_recommendations(self, crop_name, pests):
        """Get management recommendations for pests"""
        recommendations = []
        for pest in pests:
            if pest in ['Root Rot', 'Fungal Infections', 'Damping Off']:
                recommendations.append('Ensure proper drainage and fungicide treatment')
            elif pest in ['Spider Mites', 'Thrips', 'Leaf Webber']:
                recommendations.append('Monitor regularly and use integrated pest management')
            elif pest in ['Nematodes']:
                recommendations.append('Use nematode-resistant varieties and crop rotation')
            elif pest in ['Bacterial Spot', 'Early Blight', 'Leaf Blotch']:
                recommendations.append('Copper fungicide spraying and plant sanitization')
        return recommendations if recommendations else ['Standard preventive measures recommended']
    
    def analyze_weather_suitability(self, crop_name, temperature, humidity, rainfall):
        """Analyze how current weather conditions suit the crop"""
        weather_profile = self.weather_impact.get(crop_name, {})
        
        optimal_temp = weather_profile.get('optimal_temp', (20, 28))
        optimal_humidity = weather_profile.get('optimal_humidity', (50, 60))
        optimal_rainfall = weather_profile.get('optimal_rainfall', 600)
        
        # Calculate suitability scores
        temp_score = 100 if optimal_temp[0] <= temperature <= optimal_temp[1] else 50 - abs(temperature - (optimal_temp[0] + optimal_temp[1])/2) * 5
        humidity_score = 100 if optimal_humidity[0] <= humidity <= optimal_humidity[1] else 50 - abs(humidity - (optimal_humidity[0] + optimal_humidity[1])/2) * 3
        rainfall_score = 100 if abs(rainfall - optimal_rainfall) < optimal_rainfall * 0.2 else 70 - abs(rainfall - optimal_rainfall) / optimal_rainfall * 30
        
        overall_score = (temp_score + humidity_score + rainfall_score) / 3
        
        return {
            'temperature_suitability': round(max(0, min(100, temp_score)), 1),
            'humidity_suitability': round(max(0, min(100, humidity_score)), 1),
            'rainfall_suitability': round(max(0, min(100, rainfall_score)), 1),
            'overall_suitability': round(max(0, min(100, overall_score)), 1),
            'optimal_conditions': weather_profile,
            'warnings': self._get_weather_warnings(crop_name, temperature, humidity, rainfall)
        }
    
    def _get_weather_warnings(self, crop_name, temperature, humidity, rainfall):
        """Generate weather-related warnings"""
        weather_profile = self.weather_impact.get(crop_name, {})
        warnings = []
        
        if temperature > weather_profile.get('heat_stress_above', 35):
            warnings.append(f'⚠️ High temperature ({temperature}°C) - Risk of heat stress')
        if temperature < weather_profile.get('cold_stress_below', 0):
            warnings.append(f'⚠️ Low temperature ({temperature}°C) - Risk of frost damage')
        if humidity < 30:
            warnings.append(f'⚠️ Very low humidity - May need irrigation')
        if humidity > 85:
            warnings.append(f'⚠️ High humidity - Increased fungal disease risk')
        
        return warnings if warnings else ['✅ Weather conditions are suitable']
    
    def get_market_forecast(self, crop_name):
        """Get market trends and forecasts for the crop"""
        return self.market_trends.get(crop_name, {
            'current_demand': 'Unknown',
            'price_trend': 'Unknown',
            'export_markets': [],
            'growth_rate': 'Unknown'
        })
    
    def get_sustainability_score(self, crop_name):
        """Get sustainability metrics for the crop"""
        return self.sustainability_metrics.get(crop_name, {
            'water_usage': 'Unknown',
            'soil_degradation': 'Unknown',
            'sustainability_score': 50
        })
    
    def get_quality_standards(self, crop_name):
        """Get international quality standards"""
        return self.quality_standards.get(crop_name, {
            'certifications': [],
            'quality_parameters': {},
            'price_premium': 'Unknown'
        })
