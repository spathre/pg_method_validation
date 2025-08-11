import numpy as np

def calculate_linearity(x, y):
    # Convert to numpy arrays
    x_arr = np.array(x, dtype=float)
    y_arr = np.array(y, dtype=float)

    if x_arr.size < 2:
        raise ValueError("At least two (x, y) points are required")

    # Linear fit: y = slope*x + intercept
    slope, intercept = np.polyfit(x_arr, y_arr, 1)

    # Predictions
    y_pred = slope * x_arr + intercept

    # R^2 calculation
    ss_res = np.sum((y_arr - y_pred) ** 2)
    ss_tot = np.sum((y_arr - np.mean(y_arr)) ** 2)
    r_squared = 1.0 - (ss_res / ss_tot) if ss_tot != 0 else 0.0

    # Residual std deviation (sample std, ddof=1)
    residuals = y_arr - y_pred
    residual_sd = float(np.std(residuals, ddof=1)) if x_arr.size > 1 else 0.0

    return {
        "slope": round(float(slope), 4),
        "intercept": round(float(intercept), 4),
        "r_squared": round(float(r_squared), 4),
        "residual_std_dev": round(residual_sd, 4),
        "chart_data": [{"x": float(xi), "y": float(yi)} for xi, yi in zip(x_arr, y_arr)],
        "validation": "PASS - R² ≥ 0.99" if r_squared >= 0.99 else "FAIL - R² < 0.99",
        "metadata": {
            "method": "linearity"
        }
    }
