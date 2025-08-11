from scipy.stats import linregress
import numpy as np

def calculate_linearity(x, y):
    slope, intercept, r_value, _, _ = linregress(x, y)
    y_pred = [slope * xi + intercept for xi in x]
    residuals = np.subtract(y, y_pred)
    r_squared = r_value ** 2

    result = {
        "slope": round(slope, 4),
        "intercept": round(intercept, 4),
        "r_squared": round(r_squared, 4),
        "residual_std_dev": round(np.std(residuals), 4),
        "chart_data": [{"x": xi, "y": yi} for xi, yi in zip(x, y)],
        "validation": "PASS - R² ≥ 0.99" if r_squared >= 0.99 else "FAIL - R² < 0.99"
    }
    return result
