const fs = require('fs');
const path = require('path');

// Read transcript files
const chromeDreamyPath = path.join(__dirname, '../../chrome_dreamy.md');
const createAIPath = path.join(__dirname, '../../createai_concise.md');

function parseChromeDreamy(content) {
  const exchanges = [];
  const lines = content.split('\n');

  let currentQuestion = '';
  let currentAnswer = '';
  let inAnswer = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip empty lines
    if (!line) {
      if (currentQuestion && currentAnswer) {
        exchanges.push({
          question: currentQuestion.trim(),
          answer: currentAnswer.trim()
        });
        currentQuestion = '';
        currentAnswer = '';
        inAnswer = false;
      }
      continue;
    }

    // Check for cost/token line (end of answer)
    if (line.startsWith('Tokens:') || line.startsWith('Cost:')) {
      continue;
    }

    // Check if we're starting an answer (after seeing a question)
    if (currentQuestion && !inAnswer) {
      inAnswer = true;
      currentAnswer = line;
    } else if (inAnswer) {
      // Continue collecting answer
      currentAnswer += '\n' + line;
    } else {
      // This is a question
      if (currentQuestion) {
        currentQuestion += ' ' + line;
      } else {
        currentQuestion = line;
      }
    }
  }

  // Add last exchange if exists
  if (currentQuestion && currentAnswer) {
    exchanges.push({
      question: currentQuestion.trim(),
      answer: currentAnswer.trim()
    });
  }

  return exchanges;
}

function parseCreateAIConcise(content) {
  const exchanges = [];
  const lines = content.split('\n');

  let currentQuestion = '';
  let currentAnswer = '';
  let inAnswer = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Skip "Dreamy" markers
    if (line === 'Dreamy') {
      continue;
    }

    // Skip empty lines
    if (!line) {
      if (currentQuestion && currentAnswer) {
        exchanges.push({
          question: currentQuestion.trim(),
          answer: currentAnswer.trim()
        });
        currentQuestion = '';
        currentAnswer = '';
        inAnswer = false;
      }
      continue;
    }

    // Check for cost/token line (end of answer)
    if (line.startsWith('Tokens:') || line.startsWith('Cost:')) {
      continue;
    }

    // Check if we're starting an answer (after seeing a question)
    if (currentQuestion && !inAnswer) {
      inAnswer = true;
      currentAnswer = line;
    } else if (inAnswer) {
      // Continue collecting answer
      currentAnswer += '\n' + line;
    } else {
      // This is a question
      if (currentQuestion) {
        currentQuestion += ' ' + line;
      } else {
        currentQuestion = line;
      }
    }
  }

  // Add last exchange if exists
  if (currentQuestion && currentAnswer) {
    exchanges.push({
      question: currentQuestion.trim(),
      answer: currentAnswer.trim()
    });
  }

  return exchanges;
}

// Read and parse all files
const chromeDreamyContent = fs.readFileSync(chromeDreamyPath, 'utf8');
const createAIContent = fs.readFileSync(createAIPath, 'utf8');

const chromeDreamyExchanges = parseChromeDreamy(chromeDreamyContent);
const createAIExchanges = parseCreateAIConcise(createAIContent);

console.log('Chrome Dreamy exchanges:', chromeDreamyExchanges.length);
console.log('CreateAI exchanges:', createAIExchanges.length);

// Combine exchanges by matching questions
const combinedExchanges = [];

for (let i = 0; i < chromeDreamyExchanges.length; i++) {
  const chromeDreamyExchange = chromeDreamyExchanges[i];

  // Find matching questions in other transcripts
  const conciseMatch = createAIExchanges.find(e =>
    e.question === chromeDreamyExchange.question
  );

  if (conciseMatch) {
    combinedExchanges.push({
      id: i,
      question: chromeDreamyExchange.question,
      responses: {
        chromeDreamy: chromeDreamyExchange.answer,
        createAI: conciseMatch ? conciseMatch.answer : null
      }
    });
  }
}

console.log('Combined exchanges:', combinedExchanges.length);

// Save to JSON file
const outputPath = path.join(__dirname, '../public/aiComparisons.json');
fs.writeFileSync(outputPath, JSON.stringify(combinedExchanges, null, 2));

console.log('Saved to:', outputPath);
console.log('\nFirst exchange:');
console.log('Question:', combinedExchanges[0]?.question);
console.log('Chrome Dreamy:', combinedExchanges[0]?.responses.chromeDreamy?.substring(0, 100) + '...');
