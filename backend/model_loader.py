import joblib

model = joblib.load(
    "../model/flood_xgboost.pkl"
)

print("XGBoost Model Loaded Successfully")