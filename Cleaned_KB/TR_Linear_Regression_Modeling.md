# Linear Regression - Modeling Relationships

## Overview
Tutorial on quantifying linear relationships using two methods: plotting regression lines and calculating parameters directly.

**Worksheet:** 1.8 Scatter Plots (Scientific Thinking Excel Tutorial Workbook)

## Purpose
Quantify the relationship between variables to:
- Make objective, agreed-upon measurements
- Enable accurate predictions
- Use results in other Excel formulas

## Method 1: Plot Regression Line and Equation

### Steps
1. Click scatter plot
2. **Chart Design** tab → **Add Chart Element** → **Trendline** → **Linear**
3. **Add Chart Element** → **Trendline** → **More Trendline Options**
4. Check "Display equation on chart"
5. Resize equation for readability

### Understanding the Output

**Linear Equation:** y = mx + b
- **m (slope):** How much Y changes per unit increase in X
- **b (intercept):** Value of Y when X = 0

**Example:** y = 5.12x + 58.296
- Every +1 hour of study time → +5.12 points on exam
- At 0 hours study → predicted score of 58.3

### Limitation
Equation is text only—cannot be referenced in other cells for calculations.

## Method 2: Calculate Parameters with Excel Functions

All three functions follow same syntax:
```
=FUNCTION_NAME(known_y's, known_x's)
```

### Calculate Slope
```
=SLOPE(G4:G35, F4:F35)
```
- **known_y's:** Dependent variable (exam scores)
- **known_x's:** Independent variable (study time)

### Calculate Intercept
```
=INTERCEPT(G4:G35, F4:F35)
```

### Calculate Standard Deviation (Standard Error)
```
=STEYX(G4:G35, F4:F35)
```
- STEYX = Standard Error of Y given X
- Provides measure of uncertainty in predictions

## Advantages of Method 2
1. **Reusable:** Values can be referenced in other formulas
2. **Precise:** No manual transcription errors
3. **Dynamic:** Updates automatically if data changes
4. **Complete:** Provides all parameters needed for predictions

## Example Results
- **Slope:** 5.12 (exam points per hour of study)
- **Intercept:** 58.296 (baseline score)
- **Standard Deviation:** 9.61 (uncertainty measure)

## Next Steps
Use these parameters to:
- Predict specific outcomes
- Calculate probability of achieving target scores
- Answer questions like: "How many hours needed to score an A?"
