const fs = require('fs');
const path = require('path');

// Read the CSV file
const csvPath = path.join(__dirname, '../13_QA.csv');
const csvContent = fs.readFileSync(csvPath, 'utf8');

// Proper CSV parser that handles quoted fields with commas and newlines
function parseCSV(content) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    const nextChar = content[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++; // Skip next quote
      } else {
        // Toggle quote state
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      // End of field
      currentRow.push(currentField);
      currentField = '';
    } else if (char === '\n' && !inQuotes) {
      // End of row
      currentRow.push(currentField);
      if (currentRow.some(field => field.trim())) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }

  // Add last field and row if any
  if (currentField || currentRow.length) {
    currentRow.push(currentField);
    if (currentRow.some(field => field.trim())) {
      rows.push(currentRow);
    }
  }

  return rows;
}

const rows = parseCSV(csvContent);
const comparisons = [];

// Skip header row (index 0)
for (let i = 1; i < rows.length; i++) {
  const row = rows[i];

  if (row.length >= 5 && row[0].trim()) {
    comparisons.push({
      id: comparisons.length,
      question: row[0].trim(),
      responses: {
        chromeDreamy: row[1].trim(),
        createAI: row[4].trim(),
        gpt5Edu: row[2].trim(),
        notebookLM: row[3].trim(),
        grammarly: "Coming Soon"
      }
    });
  }
}

console.log(`Parsed ${comparisons.length} questions`);

// Save to JSON
const outputPath = path.join(__dirname, '../public/aiComparisons.json');
fs.writeFileSync(outputPath, JSON.stringify(comparisons, null, 2));

console.log('Saved to:', outputPath);
console.log('\nFirst question:');
if (comparisons.length > 0) {
  console.log(comparisons[0].question.substring(0, 100) + '...');
}
