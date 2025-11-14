# Linear Models with Categorical Independent Variables

## Overview
Tutorial on modeling relationships when the independent variable is categorical (not continuous).

**Worksheet:** 1.11 LM Categorical (Scientific Thinking Excel Tutorial Workbook)

## Conceptual Framework

### Categorical vs. Continuous Variables
- **Continuous:** Study time, height, temperature (quantitative)
- **Categorical:** Drug/placebo, male/female, yes/no (qualitative labels)

### What Linear Models Tell Us
- **Continuous X:** How Y changes across entire range of X values
- **Categorical X:** How mean Y differs between categories

### Special Interpretation
- **Slope:** Difference between category means
- **Intercept:** Mean of one category (coded as 0)

## Part 1: Dummy Coding

### Purpose
Convert categorical labels to numbers for Excel analysis.

### Coding Scheme
- Choose one category = 0
- Choose other category = 1
- *Note: Choice is arbitrary; either way yields same means*

### Example: Chemistry Prerequisite
- "chem" = 1
- "no chem" = 0

### Automate with IF Function

**Syntax:**
```
=IF(logical_test, value_if_true, value_if_false)
```

**Implementation:**
```
=IF(F2="chem", 1, 0)
```
- If cell contains "chem" → return 1
- Otherwise → return 0

Copy formula down entire column to code all data.

## Part 2: Create Scatter Plot and Linear Model

### Create Plot
1. Highlight dummy codes (G1:G33) and dependent variable (H1:H33)
2. **Insert** → **X Y (Scatter)**
3. Add title: "Total Exam % vs Chem Prereq"
4. Add **Trendline** → **Linear**
5. Display equation on chart

### Format Axes
**X-Axis:**
- Label: "Chem Prereq (0 = No, 1 = Yes)"
- Bounds: Minimum = 0, Maximum = 1
- Units: Major = 1

**Y-Axis:**
- Label: "Total Exam %"

### Interpret the Plot
- Data clusters at x = 0 and x = 1 only
- Linear model connects the means of both categories
- Positive slope indicates category 1 has higher mean than category 0

## Part 3: Calculate Parameters Directly

### Same Functions as Continuous Models

**Slope:**
```
=SLOPE(H2:H33, G2:G33)
```

**Intercept:**
```
=INTERCEPT(H2:H33, G2:G33)
```

**Standard Deviation:**
```
=STEYX(H2:H33, G2:G33)
```

### Calculate Category Means

**Mean for Category Coded as 0:**
```
= Intercept
```
When x = 0: y = (slope × 0) + intercept = intercept

**Mean for Category Coded as 1:**
```
= Intercept + Slope
```
When x = 1: y = (slope × 1) + intercept = slope + intercept

### Example Results
- **Intercept:** 0.758 (75.8%)
- **Slope:** 0.101 (10.1%)
- **Mean without chem:** 75.8%
- **Mean with chem:** 75.8% + 10.1% = 85.9%

**Interpretation:** Students with chemistry prerequisite scored >10% higher (more than one letter grade).

## Why Use Linear Models for Categories?

### Advantages
1. **Correct degrees of freedom:** Accounts for multiple means in standard deviation calculation (n-2 instead of n-1)
2. **Scalability:** Extends to 3+ categories and multiple independent variables
3. **Standardization:** Consistent method across all statistical analyses
4. **Automation:** Excel handles complex calculations automatically

### Limitations of Manual Calculation
- Standard deviation formula uses n-1 (assumes one mean)
- With multiple categories, should use n-k where k = number of parameters
- Linear model automatically applies correct formula

## Key Takeaways
- Dummy coding converts categorical data to numerical format
- Linear models can quantify differences between category means
- Slope = difference between means
- Intercept = mean of category coded as 0
- Method extends to complex multi-variable models
