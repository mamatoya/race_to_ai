# Creating Bar Charts and Dot Plots with Error Bars

## Overview
Tutorial on visualizing categorical linear model results using bar charts and dot plots with standard deviation error bars.

**Worksheet:** 1.11 LM Categorical (Scientific Thinking Excel Tutorial Workbook)

## Purpose
Present data analysis findings to stakeholders (e.g., curriculum committee) in clear, visual format that allows independent interpretation.

## Method 1: Bar Chart with Error Bars

### Create Base Chart
1. Highlight category means (C31:C32)
2. **Insert** tab → **Column Charts** → First 2-D option
3. Move chart to desired location

### Add Chart Elements
1. Click chart → **Add Chart Elements**
2. Add **Axis Titles** → **Primary Vertical**
3. Add **Axis Titles** → **Primary Horizontal**
4. Add **Error Bars** → **Standard Deviation**
5. Update chart title (e.g., "Total Exam % vs Chem Prereq")

### Format X-Axis
1. Click X-axis title → Replace with "Chem Prereq"
2. Right-click X-axis → **Select Data**
3. Click "Horizontal (Category) axis labels" → **Select Data**
4. Highlight category labels (D31:D32)

### Format Y-Axis
1. Click Y-axis title → Type "Total Exam %"
2. Right-click Y-axis → **Format Axis**
3. Set Minimum: 0.5
4. Set Maximum: 1.0

### Customize Error Bars
1. Right-click error bars → **Format Error Bars**
2. Select **Custom** → Click **Specify Value**
3. For both Positive and Negative Error Values:
   - Select cell with standard deviation (C30)

### Interpretation
- **Bar height:** Mean for each category
- **Error bars (whiskers):** ±1 standard deviation from mean

## Method 2: Dot Plot with Whiskers

### Create from Bar Chart
1. Copy and paste the bar chart
2. With copy selected → **Chart Design** tab
3. **Change Chart Type** → "Line with markers" (second option)

### Remove Trend Line
1. Double-click the connecting line
2. **Format Data Point** menu → Paint Bucket → **Line**
3. Select **No line**

### Enlarge Markers
1. Click marker → **Marker** → **Marker Options**
2. Select **Built-in**
3. Change size to 7

### Interpretation
- **Dot:** Mean for each category
- **Whiskers:** ±1 standard deviation from mean

## Comparison: Bar Chart vs. Dot Plot

### Bar Chart
- **Pros:** Traditional, familiar format
- **Cons:** Can appear visually "heavier"

### Dot Plot
- **Pros:** Cleaner appearance, easier to read for some audiences
- **Cons:** Less familiar to some viewers

### Recommendation
Both communicate identical information. Choose based on audience preference and context. Be familiar with creating both formats.

## Statistical Elements Displayed

### Required Components
1. **Category labels** (X-axis)
2. **Mean values** (bar height or dot position)
3. **Measure of variability** (error bars)
4. **Units and axis labels**
5. **Descriptive title**

### Error Bar Meaning
- **Upper whisker:** Mean + 1 standard deviation
- **Lower whisker:** Mean - 1 standard deviation
- Represents spread/uncertainty in data

## Best Practices

### Clear Communication
- Label all axes with units
- Provide descriptive title
- Make text large enough to read
- Use appropriate scale to highlight differences

### Data Integrity
- Always show measure of variability (error bars)
- Use consistent error bar type across similar analyses
- Specify what error bars represent (SD, SEM, CI)

## Key Takeaways
- Bar charts and dot plots effectively communicate categorical comparisons
- Error bars show data variability (standard deviation)
- Both formats present identical statistical information
- Choice between formats is stylistic, based on audience and context
