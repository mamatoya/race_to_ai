export interface AIMetrics {
  name: string;
  exchanges: number;
  completionRate: string;
  authenticity: number;
  relevance: number;
  questionRatio: string;
  technicalAccuracy: number;
  clarity: number;
  actionability: number;
  scaffolding: number;
  empathy: number;
  completeness: number;
  reliability: number;
  overall: number;
  teachingStyle: string;
  color: string;
}

export const aiData: AIMetrics[] = [
  {
    name: "ChatGPT5 Edu",
    exchanges: 25,
    completionRate: "100%",
    authenticity: 8,
    relevance: 7,
    questionRatio: "10%",
    technicalAccuracy: 9,
    clarity: 9,
    actionability: 9,
    scaffolding: 7,
    empathy: 9,
    completeness: 9,
    reliability: 9,
    overall: 8.3,
    teachingStyle: "Direct Instruction",
    color: "#10B981"
  },
  {
    name: "Chrome Dreamy",
    exchanges: 15,
    completionRate: "60%",
    authenticity: 6,
    relevance: 7,
    questionRatio: "5%",
    technicalAccuracy: 8,
    clarity: 8,
    actionability: 8,
    scaffolding: 5,
    empathy: 5,
    completeness: 7,
    reliability: 4,
    overall: 6.5,
    teachingStyle: "Instructional/Checklist",
    color: "#F59E0B"
  },
  {
    name: "CreateAI",
    exchanges: 23,
    completionRate: "100%",
    authenticity: 6,
    relevance: 6,
    questionRatio: "6%",
    technicalAccuracy: 8,
    clarity: 8,
    actionability: 8,
    scaffolding: 6,
    empathy: 6,
    completeness: 7,
    reliability: 9,
    overall: 7.1,
    teachingStyle: "Direct Problem-Solving",
    color: "#6366F1"
  },
  {
    name: "NotebookLM",
    exchanges: 25,
    completionRate: "100%",
    authenticity: 9,
    relevance: 9,
    questionRatio: "40%",
    technicalAccuracy: 9,
    clarity: 8,
    actionability: 7,
    scaffolding: 9,
    empathy: 8,
    completeness: 8,
    reliability: 9,
    overall: 8.4,
    teachingStyle: "Socratic/Inquiry-Based",
    color: "#EC4899"
  },
  {
    name: "Grammarly",
    exchanges: 0,
    completionRate: "N/A",
    authenticity: 0,
    relevance: 0,
    questionRatio: "N/A",
    technicalAccuracy: 0,
    clarity: 0,
    actionability: 0,
    scaffolding: 0,
    empathy: 0,
    completeness: 0,
    reliability: 0,
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
    description: "All 5 AI systems were tested with identical BIO181 Excel/Statistics questions",
    points: [
      "25 authentic student questions",
      "Topics: Excel functions, statistics, data visualization",
      "Same conversation flow for all AIs",
      "Measured: exchanges, accuracy, teaching style, reliability"
    ]
  },
  keyFindings: {
    winner: "NotebookLM",
    score: 8.4,
    runnerUp: "ChatGPT5 Edu",
    runnerUpScore: 8.3,
    insights: [
      "NotebookLM: Best knowledge base adherence (9/10)",
      "ChatGPT5 Edu: Best empathy and actionability",
      "Chrome Dreamy: 40% technical failure rate",
      "CreateAI: Consistent but generic responses"
    ]
  }
};
