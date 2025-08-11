import numpy as np

def calculate_accuracy(amount_added, amount_found):
    if len(amount_added) != len(amount_found):
        raise ValueError("Mismatch in input lengths")

    recovery = [(found / added) * 100 for added, found in zip(amount_added, amount_found)]
    mean_recovery = np.mean(recovery)
    std_dev = np.std(recovery)
    rsd = (std_dev / mean_recovery) * 100 if mean_recovery else 0

    result = {
        "recovery_percentages": [round(r, 2) for r in recovery],
        "mean_recovery": round(mean_recovery, 2),
        "standard_deviation": round(std_dev, 2),
        "percent_rsd": round(rsd, 2),
        "validation": "PASS - %RSD ≤ 2.0" if rsd <= 2 else "FAIL - %RSD > 2.0"
    }
    return result
