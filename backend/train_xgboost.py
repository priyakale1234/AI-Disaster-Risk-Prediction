import os
import joblib
import numpy as np
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.metrics import (
    r2_score,
    mean_absolute_error,
    mean_squared_error
)

from xgboost import XGBRegressor

print("=" * 60)
print("FLOOD PREDICTION USING XGBOOST")
print("=" * 60)

# ====================================
# LOAD DATASET
# ====================================

df = pd.read_csv("../dataset/flood.csv")

print("\nDataset Loaded Successfully")
print("Shape:", df.shape)

# ====================================
# FEATURES AND TARGET
# ====================================

X = df.drop("FloodProbability", axis=1)
y = df["FloodProbability"]

# ====================================
# TRAIN TEST SPLIT
# ====================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42
)

print("\nTraining Samples :", len(X_train))
print("Testing Samples  :", len(X_test))

# ====================================
# XGBOOST MODEL
# ====================================

print("\nTraining XGBoost Model...")

model = XGBRegressor(
    n_estimators=1000,
    learning_rate=0.05,
    max_depth=8,
    subsample=0.8,
    colsample_bytree=0.8,
    objective="reg:squarederror",
    random_state=42
)

model.fit(X_train, y_train)

print("Training Completed")

# ====================================
# PREDICTION
# ====================================

predictions = model.predict(X_test)

# ====================================
# METRICS
# ====================================

r2 = r2_score(y_test, predictions)

mae = mean_absolute_error(
    y_test,
    predictions
)

rmse = np.sqrt(
    mean_squared_error(
        y_test,
        predictions
    )
)

print("\n" + "=" * 60)
print("MODEL PERFORMANCE")
print("=" * 60)

print(f"R² Score : {r2:.4f}")
print(f"MAE      : {mae:.4f}")
print(f"RMSE     : {rmse:.4f}")

# ====================================
# FEATURE IMPORTANCE
# ====================================

importance = pd.DataFrame({
    "Feature": X.columns,
    "Importance": model.feature_importances_
})

importance = importance.sort_values(
    by="Importance",
    ascending=False
)

print("\nTop 10 Important Features")
print(importance.head(10))

# ====================================
# SAVE MODEL
# ====================================

os.makedirs("../model", exist_ok=True)

joblib.dump(
    model,
    "../model/flood_xgboost.pkl"
)

print("\nModel Saved Successfully")
print("Location: ../model/flood_xgboost.pkl")

print("\nTraining Finished Successfully")