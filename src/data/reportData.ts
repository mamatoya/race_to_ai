export interface AIMetrics {
  name: string;
  exchanges: number;
  completionRate: string;
  kbRelevance: number;
  questionsRatio: number;
  emotionalResponse: number;
  pedagogicalCompliance: number;
  scaffoldingQuality: number;
  overall: number;
  teachingStyle: string;
  color: string;
}

export const aiData: AIMetrics[] = [
  {
    name: "ChatGPT5 Edu",
    exchanges: 10,
    completionRate: "100%",
    kbRelevance: 8,
    questionsRatio: 7,
    emotionalResponse: 6,
    pedagogicalCompliance: 7,
    scaffoldingQuality: 7,
    overall: 7.0,
    teachingStyle: "Explain-Then-Practice",
    color: "#10B981"
  },
  {
    name: "Chrome Dreamy",
    exchanges: 10,
    completionRate: "100%",
    kbRelevance: 4,
    questionsRatio: 3,
    emotionalResponse: 7,
    pedagogicalCompliance: 3,
    scaffoldingQuality: 4,
    overall: 4.2,
    teachingStyle: "Lecture-With-Offers",
    color: "#F59E0B"
  },
  {
    name: "CreateAI",
    exchanges: 10,
    completionRate: "100%",
    kbRelevance: 8,
    questionsRatio: 9,
    emotionalResponse: 8,
    pedagogicalCompliance: 9,
    scaffoldingQuality: 9,
    overall: 8.6,
    teachingStyle: "Pure Socratic",
    color: "#6366F1"
  },
  {
    name: "NotebookLM",
    exchanges: 10,
    completionRate: "100%",
    kbRelevance: 9,
    questionsRatio: 9,
    emotionalResponse: 8,
    pedagogicalCompliance: 9,
    scaffoldingQuality: 9,
    overall: 8.8,
    teachingStyle: "Pure Socratic",
    color: "#EC4899"
  },
  {
    name: "Grammarly",
    exchanges: 0,
    completionRate: "N/A",
    kbRelevance: 0,
    questionsRatio: 0,
    emotionalResponse: 0,
    pedagogicalCompliance: 0,
    scaffoldingQuality: 0,
    overall: 0,
    teachingStyle: "N/A - Currently in Alpha Testing",
    color: "#6B7280"
  }
];

export const slideContent = {
  title: {
    title: "Race to AI in the Classroom",
    subtitle: "A comprehensive analysis of:\nChatGPT, Chrome Dreamy, Create.ai, Grammarly, and NotebookLM",
    description: "Comparing 5 AI Systems for Educational Support"
  },
  overview: {
    title: "Study Overview",
    description: "All AI systems were tested with identical BIO181 student questions",
    points: [
      "10 authentic student questions from BIO 181 course",
      "Topics: Normal distributions, residuals, linear models, frequency distributions",
      "Same prompts for all AIs with proper configuration",
      "Measured: KB Relevance, Questions Ratio, Emotional Response, Pedagogical Compliance, Scaffolding Quality"
    ]
  },
  keyFindings: {
    winner: "NotebookLM",
    score: 8.8,
    runnerUp: "CreateAI",
    runnerUpScore: 8.6,
    insights: [
      "NotebookLM: Best KB integration (9/10) with Pure Socratic method",
      "CreateAI: Excellent Socratic pedagogy with 'one thing at a time' approach",
      "ChatGPT5 Edu: Good content but explain-then-practice pattern limits effectiveness",
      "Chrome Dreamy: Lacks KB integration and pedagogical approach (4.2/10)"
    ]
  }
};
