const fs = require('fs');
const path = require('path');

// Read all transcript files
const chromeDreamyPath = path.join(__dirname, '../../chrome_dreamy.md');
const createAIPath = path.join(__dirname, '../../createai_concise.md');
const gpt5Path = path.join(__dirname, '../../GPT5_Project.md');
const notebookLMPath = path.join(__dirname, '../../NotebookLM_BIO181.md');

// Parse transcript with double newlines
function parseTranscript(content) {
  const exchanges = [];
  const blocks = content.split(/\n\n+/).filter(b => b.trim());

  for (let i = 0; i < blocks.length - 1; i += 2) {
    const questionBlock = blocks[i].trim();
    const answerBlock = blocks[i + 1].trim();

    let question = questionBlock;
    let answer = answerBlock;

    // Remove common prefixes
    if (answer.startsWith('Dreamy')) {
      answer = answer.substring(6).trim();
    }
    if (answer.startsWith('###### **ChatGPT said:**')) {
      answer = answer.replace('###### **ChatGPT said:**', '').trim();
    }

    // Remove tokens/cost lines
    const lines = answer.split('\n');
    const filtered = lines.filter(l => !l.startsWith('Tokens:') && !l.startsWith('Cost:'));
    answer = filtered.join('\n').trim();

    // Only add if we have both question and answer
    if (question.length > 10 && answer.length > 10) {
      exchanges.push({ question, answer });
    }
  }

  return exchanges;
}

// Parse all files
console.log('Reading transcript files...');
const chromeDreamy = parseTranscript(fs.readFileSync(chromeDreamyPath, 'utf8'));
const createAI = parseTranscript(fs.readFileSync(createAIPath, 'utf8'));
const gpt5 = parseTranscript(fs.readFileSync(gpt5Path, 'utf8'));
const notebookLM = parseTranscript(fs.readFileSync(notebookLMPath, 'utf8'));

console.log('Chrome Dreamy:', chromeDreamy.length);
console.log('CreateAI:', createAI.length);
console.log('GPT5 Edu:', gpt5.length);
console.log('NotebookLM:', notebookLM.length);

// Combine by assuming they're in the same order
const combined = [];
const maxLength = Math.min(
  chromeDreamy.length,
  createAI.length,
  gpt5.length,
  notebookLM.length
);

console.log('Creating combined exchanges for', maxLength, 'questions...');

for (let i = 0; i < maxLength; i++) {
  combined.push({
    id: i,
    question: chromeDreamy[i].question,
    responses: {
      chromeDreamy: chromeDreamy[i].answer,
      createAI: createAI[i].answer,
      gpt5Edu: gpt5[i].answer,
      notebookLM: notebookLM[i].answer
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
