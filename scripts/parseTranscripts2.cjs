const fs = require('fs');
const path = require('path');

// Read transcript files
const chromeDreamyPath = path.join(__dirname, '../../chrome_dreamy.md');
const createAIPath = path.join(__dirname, '../../createai_concise.md');

// Simple parser that splits on double newlines and alternates between question/answer
function parseTranscript(content, hasTokens = false) {
  const exchanges = [];

  // Split by blank lines to get blocks
  const blocks = content.split(/\n\n+/).filter(b => b.trim());

  for (let i = 0; i < blocks.length - 1; i += 2) {
    const questionBlock = blocks[i].trim();
    const answerBlock = blocks[i + 1].trim();

    // Skip if answer starts with "Dreamy" or "Tokens"
    let question = questionBlock;
    let answer = answerBlock;

    // Remove "Dreamy" prefix from answer if present
    if (answer.startsWith('Dreamy')) {
      answer = answer.substring(6).trim();
    }

    // Remove tokens/cost lines from answer if present
    if (hasTokens) {
      const lines = answer.split('\n');
      const filtered = lines.filter(l => !l.startsWith('Tokens:') && !l.startsWith('Cost:'));
      answer = filtered.join('\n').trim();
    }

    // Only add if we have both question and answer
    if (question.length > 10 && answer.length > 10) {
      exchanges.push({ question, answer });
    }
  }

  return exchanges;
}

// Parse all files
const chromeDreamyContent = fs.readFileSync(chromeDreamyPath, 'utf8');
const createAIContent = fs.readFileSync(createAIPath, 'utf8');

const chromeDreamy = parseTranscript(chromeDreamyContent, false);
const createAI = parseTranscript(createAIContent, true);

console.log('Chrome Dreamy:', chromeDreamy.length);
console.log('CreateAI:', createAI.length);

// Combine by assuming they're in the same order
const combined = [];
const maxLength = Math.min(chromeDreamy.length, createAI.length);

for (let i = 0; i < maxLength; i++) {
  combined.push({
    id: i,
    question: chromeDreamy[i].question,
    responses: {
      chromeDreamy: chromeDreamy[i].answer,
      createAI: createAI[i].answer
    }
  });
}

console.log('Combined exchanges:', combined.length);

// Save to JSON
const outputPath = path.join(__dirname, '../public/aiComparisons.json');
fs.writeFileSync(outputPath, JSON.stringify(combined, null, 2));

console.log('Saved to:', outputPath);

// Print first few questions for verification
console.log('\nFirst 3 questions:');
for (let i = 0; i < Math.min(3, combined.length); i++) {
  console.log(`${i + 1}. ${combined[i].question.substring(0, 80)}...`);
}
