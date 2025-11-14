import { SlideDeck } from './components/SlideDeck';
import { TitleSlide } from './components/slides/TitleSlide';
import { InsightsSlide } from './components/slides/InsightsSlide';
import { CombinedMatrixSlide } from './components/slides/CombinedMatrixSlide';
import { VibeCheckSlide } from './components/slides/VibeCheckSlide';
import { ProcessOverviewSlide } from './components/slides/ProcessOverviewSlide';
import { AssetsSlide } from './components/slides/AssetsSlide';
import { SwimLanesSlide } from './components/slides/SwimLanesSlide';
import { AIResponseComparisonSlide } from './components/slides/AIResponseComparisonSlide';
import { aiData, slideContent } from './data/reportData';
import './App.css';

function App() {
  const keyInsights = [
    "NotebookLM leads with excellent knowledge base adherence (9/10) and Socratic teaching method",
    "ChatGPT5 Edu excels in empathy (9/10) and actionability, providing immediate solutions",
    "Chrome Dreamy suffered 40% technical failure rate, limiting usability",
    "Question-to-direction ratio: NotebookLM 40%, others 5-10%"
  ];

  const teachingPhilosophies = [
    "Direct Instruction: ChatGPT5 Edu & CreateAI provide immediate step-by-step answers",
    "Inquiry-Based: NotebookLM uses Socratic method for deeper learning",
    "Hybrid Approach: Chrome Dreamy attempts checklists but faces reliability issues"
  ];

  return (
    <SlideDeck>
      <TitleSlide
        title={slideContent.title.title}
        subtitle={slideContent.title.subtitle}
        description={slideContent.title.description}
      />

      <ProcessOverviewSlide />

      <AssetsSlide />

      <CombinedMatrixSlide
        title="Features and Scores"
        aiSystems={aiData}
      />

      <InsightsSlide
        title="Key Findings"
        insights={keyInsights}
        showNumbers={false}
      />

      <AIResponseComparisonSlide />

      <VibeCheckSlide />

      <SwimLanesSlide
        title="Possible Avenues"
        lanes={[
          {
            title: "Re-architecture for Dreamy",
            description: [
              "Chrome extension, updating infrastructure and improving scale deployment and CSAT",
              "Leveraging Create AI's new agent builder",
              "Student usage insights available"
            ]
          },
          {
            title: "Create AI Builder and Marketplace",
            description: [
              "Low Dev lift for EdPlus",
              "More of a focus on content curating",
              "Student usage insights available"
            ]
          },
          {
            title: "Third-Party Tools and Services",
            description: [
              "Utilize ChatGPT5 Edu, NotebookLM, Grammarly",
              "Low Dev lift and current market adoption",
              "No access to student usage insights"
            ]
          }
        ]}
      />
    </SlideDeck>
  );
}

export default App;
