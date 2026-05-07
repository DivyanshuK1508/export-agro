import os
import joblib
import pandas as pd
import warnings
import requests
warnings.filterwarnings('ignore')

# --- Google Drive download utility ---
def download_file_from_google_drive(file_id, dest_path):
    URL = "https://drive.google.com/uc?export=download"
    session = requests.Session()
    response = session.get(URL, params={'id': file_id}, stream=True)
    token = None
    for key, value in response.cookies.items():
        if key.startswith('download_warning'):
            token = value
    if token:
        params = {'id': file_id, 'confirm': token}
        response = session.get(URL, params=params, stream=True)
    CHUNK_SIZE = 32768
    with open(dest_path, "wb") as f:
        for chunk in response.iter_content(CHUNK_SIZE):
            if chunk:
                f.write(chunk)

# --- Download price_model.pkl if missing ---
PRICE_MODEL_PATH = 'models/price_model.pkl'
PRICE_MODEL_FILE_ID = '1UkbWIPGqGGbGcIdhEIJ194V_RVEn6kbL'  # Google Drive file ID for price_model.pkl
if not os.path.exists(PRICE_MODEL_PATH):
    print(f"Downloading {PRICE_MODEL_PATH} from Google Drive...")
    os.makedirs(os.path.dirname(PRICE_MODEL_PATH), exist_ok=True)
    download_file_from_google_drive(PRICE_MODEL_FILE_ID, PRICE_MODEL_PATH)
    print("Download complete.")

# Load all models
crop_model = joblib.load('models/crop_model.pkl')
crop_encoders = joblib.load('models/encoders.pkl')
crop_features = joblib.load('models/crop_features.pkl')

yield_model = joblib.load('models/yield_model.pkl')
yield_encoders = joblib.load('models/yield_encoders.pkl')
yield_features = joblib.load('models/yield_features.pkl')

price_model = joblib.load(PRICE_MODEL_PATH)
price_encoders = joblib.load('models/price_encoders.pkl')
price_features = joblib.load('models/price_features.pkl')

print("=" * 80)
print("TESTING ACTUAL TRAINED MODELS")
print("=" * 80)

# Test different crops
test_cases = [
    {'N': 80, 'Region': 'North', 'Crop': 'Millet', 'State': 'Maharashtra', 'District': 'Nashik'},
    {'N': 100, 'Region': 'South', 'Crop': 'Rice', 'State': 'Tamil Nadu', 'District': 'Thanjavur'},
    {'N': 60, 'Region': 'East', 'Crop': 'Wheat', 'State': 'Punjab', 'District': 'Ludhiana'},
]

for idx, test in enumerate(test_cases, 1):
    print(f"\nTest Case {idx}:")
    print("-" * 80)
    
    try:
        # First test - predict crop with given parameters
        user_data = {
            'N': test['N'], 'Soil_pH': 7, 'Temperature': 28, 'Rainfall': 800, 'Region': test['Region'],
            'P': 40, 'K': 40, 'Soil_Moisture': 40, 'Soil_Type': 'Loamy',
            'Organic_Carbon': 0.8, 'Electrical_Conductivity': 1.0, 'Humidity': 60,
            'Sunlight_Hours': 8, 'Wind_Speed': 5, 'Altitude': 200,
            'Season': 'Kharif', 'Irrigation_Type': 'Drip', 'Fertilizer_Used': 100, 'Previous_Crop': 'Wheat'
        }
        df = pd.DataFrame([user_data])
        for col in crop_encoders:
            if col in df:
                df[col] = crop_encoders[col].transform(df[col])
        df = df.reindex(columns=crop_features)
        crop_pred = crop_model.predict(df)[0]
        crop_name = crop_encoders['Recommended_Crop'].inverse_transform([crop_pred])[0]
        print(f'  Predicted Crop: {crop_name}')
        
        # Predict yield
        yield_data = {'Crop': crop_name, 'Crop_Year': 2020, 'Season': 'Kharif', 
                      'State_Name': test['State'], 'District_Name': test['District']}
        df_yield = pd.DataFrame([yield_data])
        for col in yield_encoders:
            if col in df_yield:
                if df_yield[col][0] in yield_encoders[col].classes_:
                    df_yield[col] = yield_encoders[col].transform(df_yield[col])
                else:
                    df_yield[col] = 0
        df_yield = df_yield.reindex(columns=yield_features)
        yield_pred = yield_model.predict(df_yield)[0]
        print(f'  Predicted Yield: {yield_pred:.2f} tons/hectare')
        
        # Predict price
        price_data = {'State': test['State'], 'District': test['District'], 'Market': 'Default', 
                      'Commodity': crop_name, 'Variety': 'Other', 'Grade': 'FAQ', 'Year': 2023, 'Month': 7}
        df_price = pd.DataFrame([price_data])
        for col in price_encoders:
            if col in df_price:
                if df_price[col][0] in price_encoders[col].classes_:
                    df_price[col] = price_encoders[col].transform(df_price[col])
                else:
                    df_price[col] = 0
        df_price = df_price.reindex(columns=price_features)
        price_pred = price_model.predict(df_price)[0]
        print(f'  Predicted Price: ₹{price_pred:.2f}')
        print(f'  Price per kg estimate: ₹{max(10, min(500, price_pred/100)):.2f}')
        
        # Estimate revenue and profit
        hectares = 1  # Standard unit
        total_kg = yield_pred * 1000  # Convert tons to kg
        
        # Cost structure (realistic for Indian agriculture)
        local_price_per_kg = min(100, max(10, price_pred / 100))  # Normalize price
        production_cost_per_kg = 15  # Average ₹15/kg to produce
        local_market_revenue = total_kg * local_price_per_kg
        local_production_cost = total_kg * production_cost_per_kg
        local_profit = local_market_revenue - local_production_cost
        
        print(f'  Total Production (1 ha): {total_kg:.0f} kg')
        print(f'  Local Market Price/kg: ₹{local_price_per_kg:.2f}')
        print(f'  Production Cost/kg: ₹{production_cost_per_kg:.2f}')
        print(f'  Local Market Revenue: ₹{local_market_revenue:,.0f}')
        print(f'  Local Market Profit: ₹{local_profit:,.0f}')
        
    except Exception as e:
        print(f'  Error: {str(e)}')

print("\n" + "=" * 80)