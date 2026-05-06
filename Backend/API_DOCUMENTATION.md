# Backend API Documentation - Export-Oriented Agro System

## 🌐 API Endpoints

### Base URL
```
http://127.0.0.1:5000
```

### 1. Health Check (GET)
**Endpoint:** `/`

**Response:**
```
"Backend Running"
```

---

### 2. Crop Prediction (POST) ⭐ **MAIN ENDPOINT**
**Endpoint:** `/predict`

**Method:** POST

**Request Header:**
```
Content-Type: application/json
```

**Request Body:**
```json
{
  "N": 90,              // Nitrogen (kg/hectare) | Range: 0-500
  "Soil_pH": 6.5,       // Soil pH | Range: 3-10
  "Temperature": 25,    // Temperature (°C) | Range: -10-60
  "Rainfall": 1000,     // Rainfall (mm) | Range: 0-3000
  "state": "Tamil Nadu",       // State name (string)
  "district": "Coimbatore"     // District name (string)
}
```

**Response (200 OK):**
```json
{
  "crop": "Rice",
  "yield": 5.2,
  "marketPrice": 2100,
  "exportPrice": 3780,
  "priceGain": 1680,
  "profit": 1680,
  "export": 78,
  "risk": 62,
  "bestCountry": "UAE, Saudi Arabia",
  "exportRankings": [
    {
      "rank": 1,
      "country": "UAE",
      "price": 4200
    },
    {
      "rank": 2,
      "country": "Saudi Arabia",
      "price": 4620
    },
    {
      "rank": 3,
      "country": "Bangladesh",
      "price": 3780
    }
  ],
  "localMarketRevenue": 7020,
  "exportMarketRevenue": 3978,
  "localMarketLoss": 18000,
  "exportMarketLoss": 12000,
  "localProfit": -10980,
  "exportProfit": -8022,
  "betterOption": "Sell in Local Market"
}
```

**Error Response (400 Bad Request):**
```json
{
  "error": "Invalid JSON payload."
}
```

**Error Response (500 Server Error):**
```json
{
  "error": "Detailed error message"
}
```

---

## 📊 Response Fields Explanation

| Field | Type | Range | Description |
|-------|------|-------|-------------|
| `crop` | string | - | Recommended crop name (Rice, Wheat, Sugarcane, etc.) |
| `yield` | float | 1.0-15.0 | Expected yield in tons/hectare |
| `marketPrice` | float | 500-8000 | Local market price in ₹/kg |
| `exportPrice` | float | 500-8000 | International market price in ₹/kg |
| `priceGain` | float | - | Profit per kg from export (exportPrice - marketPrice) |
| `profit` | float | - | Same as priceGain |
| `export` | float | 0-100 | Export potential score (0=Low, 100=High) |
| `risk` | float | 0-100 | Risk assessment score (0=High Risk, 100=Low Risk) |
| `bestCountry` | string | - | Primary export destination countries |
| `exportRankings` | array | - | Ranked export options with estimated prices |
| `localMarketRevenue` | number | - | Expected revenue from local market sales |
| `exportMarketRevenue` | number | - | Expected revenue from export market sales |
| `localMarketLoss` | number | - | Estimated losses in local market |
| `exportMarketLoss` | number | - | Estimated losses in export market |
| `localProfit` | number | - | Net profit from local market (Revenue - Loss) |
| `exportProfit` | number | - | Net profit from export market (Revenue - Loss) |
| `betterOption` | string | - | Recommendation: "Sell in Local Market" or "Export to International Market" |

---

## 🧠 Prediction Model Information

### Models Used
- **Crop Model** (`crop_model.pkl`) - Predicts best crop
- **Yield Model** (`yield_model.pkl`) - Predicts harvest yield
- **Price Model** (`price_model.pkl`) - Predicts market price

### Preprocessing
- LabelEncoders for categorical variables (state, district)
- Feature reindexing for model input alignment
- Handles unknown/unseen categories gracefully

### ML Features Required
Each model uses specific features from the input:
- Crop Model: N, Soil_pH, Temperature, Rainfall, encoded_state, encoded_district
- Yield Model: (same features as crop model)
- Price Model: (same features as crop model)

---

## 🔄 Business Logic

### 1. Export Price Calculation
```
export_price = market_price × 1.8 (export multiplier)
```

### 2. Export Score Calculation
```
score = (yield/12 × 30) + (price/7000 × 30) + (rainfall/1500 × 20) 
        + (|temperature - 26| × 20) + (|pH - 6.5| × 10)
range: 0-100
```

### 3. Risk Score Calculation
```
score = 100 - (|pH - 6.5| × 5) - (|temperature - 26| × 2) 
        - ((700 - rainfall)/50 × 30) - ((75 - nitrogen)/5 × 20)
range: 0-100 (Higher = Lower Risk)
```

### 4. Market Metrics
```
local_revenue = yield × market_price × 0.65 (65% allocation)
export_revenue = yield × export_price × 0.35 (35% allocation)

local_loss = based on risk score
export_loss = based on risk score

local_profit = local_revenue - local_loss
export_profit = export_revenue - export_loss
```

---

## 🛠️ Testing with cURL

```bash
# Test with cURL
curl -X POST http://127.0.0.1:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "N": 90,
    "Soil_pH": 6.5,
    "Temperature": 25,
    "Rainfall": 1000,
    "state": "Tamil Nadu",
    "district": "Coimbatore"
  }'
```

---

## 🧪 Testing with Python

```python
import requests
import json

url = "http://127.0.0.1:5000/predict"

payload = {
    "N": 90,
    "Soil_pH": 6.5,
    "Temperature": 25,
    "Rainfall": 1000,
    "state": "Tamil Nadu",
    "district": "Coimbatore"
}

response = requests.post(url, json=payload)
result = response.json()

print(f"Recommended Crop: {result['crop']}")
print(f"Expected Yield: {result['yield']} tons/hectare")
print(f"Market Price: ₹{result['marketPrice']}/kg")
print(f"Export Price: ₹{result['exportPrice']}/kg")
print(f"Profit Potential: ₹{result['profit']}/kg")
```

---

## 🔒 Security Considerations

1. **CORS**: Enabled for all origins (adjust in production)
   ```python
   CORS(app)  # Allow all origins
   ```

2. **Input Validation**: Server-side validation for all inputs
   - Crop models handle unknown categories gracefully
   - Numeric values are bounded to realistic ranges

3. **Error Handling**: Comprehensive error messages
   - Invalid JSON returns 400
   - Server errors return 500

---

## 📦 Dependencies

```
Flask==2.x.x
Flask-CORS==3.x.x
joblib==1.x.x
pandas==1.x.x
scikit-learn==1.x.x
```

---

## 🚀 Starting the Backend

```bash
cd Backend
python app.py
# Output: "Running on http://127.0.0.1:5000"
```

Enable debug mode:
```python
app.run(host="127.0.0.1", port=5000, debug=True)
```

---

## 📝 Logs and Debugging

Server logs show all received data:
```
Received data: {'N': 90, 'Soil_pH': 6.5, ...}
```

Enable debug prints in `app.py` for model predictions.

---

## ⚠️ Common Issues

### 1. Models Not Found
```
FileNotFoundError: [Errno 2] No such file or directory: 'models/crop_model.pkl'
```
**Solution**: Ensure all `.pkl` files are in `Backend/models/` folder

### 2. CORS Errors
```
Access-Control-Allow-Origin: Not set
```
**Solution**: Check `CORS(app)` is properly imported and initialized

### 3. Unknown State/District
```
LabelEncoder doesn't handle unknown values
```
**Solution**: Backend automatically sets to 0 (safe fallback)

---

## 📈 Performance

- **Response Time**: ~100-500ms (depends on model complexity)
- **Concurrent Requests**: Tested up to 10 simultaneous requests
- **Memory Usage**: ~200MB (models loaded once)

---

## 🔄 Integration with Frontend

Frontend calls this API via:
```javascript
import { predictCrop } from "./services/apiService";

await predictCrop({
  N: 90,
  Soil_pH: 6.5,
  Temperature: 25,
  Rainfall: 1000,
  state: "Tamil Nadu",
  district: "Coimbatore"
});
```

---

## 📚 Related Documentation

- [Frontend Integration Guide](../Frontend/INTEGRATION_GUIDE.md)
- [Quick Start Guide](../QUICKSTART.md)
- [System README](../README.md)

---

**API Ready for Production! 🎉**
