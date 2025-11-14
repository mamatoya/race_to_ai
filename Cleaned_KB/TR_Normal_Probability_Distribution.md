# Normal Probability Distribution (NPD) - Estimating Likelihood

## Overview
Tutorial on calculating sample population parameters and estimating event likelihood using normal distribution.

**Worksheet:** 1.7 Est Likelihood using NPD (Scientific Thinking Excel Tutorial Workbook)

## Key Concepts

### Normal Distribution Basics
- **Definition:** A special density curve that is bell-shaped and symmetrical
- **Purpose:** Describes probability of obtaining possible values of a variable
- **Calculation:** Uses the Gaussian function with inputs: mean and standard deviation
- **Density Curve:** Visualizes how percentage of observations changes across value ranges (taller curve = more observations)

### Standard Deviation Properties
In ANY normal distribution:
- 68.2% of data falls within ±1 standard deviation
- 95.4% of data falls within ±2 standard deviations
- 99.7% of data falls within ±3 standard deviations

This universal property enables predictions about observation probability using only mean and standard deviation.

## Excel Procedures

### Part 1: Calculate Population Parameters

**Calculate Mean:**
```
=AVERAGE(G4:G35)
```

**Calculate Standard Deviation:**
```
=STDEV(G4:G35)
```

### Part 2: Calculate Cumulative Probability (≤ value)

**Function Syntax:**
```
=NORM.DIST(x, mean, standard_dev, cumulative)
```

**Parameters:**
- `x` = value for which to calculate probability
- `mean` = population mean
- `standard_dev` = population standard deviation
- `cumulative` = TRUE (for cumulative area under curve up to x)

**Example:** Probability that student height ≤ 68"
```
=NORM.DIST(D13, D9, D10, TRUE)
```

### Part 3: Calculate Reverse Probability (≥ value)

**Method:** Subtract NORM.DIST from 1
```
=1 - NORM.DIST(x, mean, standard_dev, TRUE)
```

**Reasoning:** If 72% are ≤ 68", then 100% - 72% = 28% are ≥ 68"

**Example:** Probability that student height ≥ 68"
```
=1 - NORM.DIST(D25, D9, D10, TRUE)
```

## Key Takeaways
- Normal distribution enables probability predictions using only mean and standard deviation
- `NORM.DIST` calculates "equal to or less than" probabilities
- Use `1 - NORM.DIST` to calculate "equal to or greater than" probabilities
- These tools are foundational for analyzing relationships between variables
