# Making Predictions Using Linear Models

## Overview
Tutorial on estimating outcomes and calculating probabilities using linear regression parameters.

**Worksheet:** 1.9 LM Predictions (Scientific Thinking Excel Tutorial Workbook)

## Setup
Transfer parameters from previous analysis:
- Slope (C2)
- Intercept (C3)
- Standard Deviation (C4)

## Part 1: Visual Estimates from Scatter Plot

### Method
1. Find X value on horizontal axis
2. Move up to the regression line
3. Move left to Y-axis to read predicted value

### Example Predictions
- **3 hrs/week study:** ~74 exam score
- **1 hr/week study:** ~64 exam score
- **6 hrs/week study:** ~89 exam score

### Key Insight
Mean exam score (75.9) predicts well for students near mean study time (3.4 hrs), but poorly for students far from mean. Including causally-linked variables dramatically improves prediction accuracy.

## Part 2: Calculate Predictions Using Linear Function

### Build a Prediction Calculator

**Formula:** y = (slope × x) + intercept

```
=(C2 * C19) + C3
```
- C2 = slope
- C19 = input cell for any X value
- C3 = intercept

### Test Predictions
| Study Time | Predicted Score | Visual Estimate |
|------------|----------------|-----------------|
| 3 hours    | 73.7           | 74             |
| 1 hour     | 63.4           | 64             |
| 6 hours    | 89.0           | 89             |

Calculator provides more precise values than visual estimates.

## Part 3: Calculate Probabilities

### Concept
Use `1 - NORM.DIST` with:
- **Mean:** Predicted Y value (given specific X)
- **Standard Deviation:** Model standard error (STEYX)

### Probability of Score ≥ Target

**General Formula:**
```
=1 - NORM.DIST(target_score, predicted_mean, std_dev, TRUE)
```

### Example 1: P(Score ≥ 80 | 3 hrs study)
```
=1 - NORM.DIST(80, C16, C4, TRUE)
```
- Target score: 80
- Predicted mean (3 hrs): 73.7 (from C16)
- Std dev: 9.61 (from C4)
- **Result:** 0.26 (26% chance, or 1 in 4)

### Example 2: P(Score ≥ 90 | 3 hrs study)
```
=1 - NORM.DIST(90, C16, C4, TRUE)
```
- **Result:** 0.04 (4% chance, or 1 in 25)

### Example 3: P(Score ≥ 90 | 6 hrs study)
```
=1 - NORM.DIST(90, C18, C4, TRUE)
```
- Predicted mean (6 hrs): 89.0 (from C18)
- **Result:** 0.46 (46% chance, or 1 in 2)

### Impact Analysis
Doubling study time (3→6 hrs) increases probability of scoring ≥90 by **over 10x** (from 4% to 46%).

## Key Formulas Summary

**Linear Prediction:**
```
Predicted Y = (Slope × X) + Intercept
```

**Probability Calculation:**
```
P(Y ≥ target) = 1 - NORM.DIST(target, predicted_Y, std_dev, TRUE)
```

## Applications
- Predict outcomes for specific input values
- Calculate probability of achieving goals
- Compare impact of different strategies
- Understand systems from molecular to ecosystem scale
