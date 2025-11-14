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
    "NotebookLM leads with 8.8/10: Best KB integration (9/10) and Pure Socratic method",
    "CreateAI scores 8.6/10: Excellent Socratic pedagogy with 'one thing at a time' approach",
    "ChatGPT5 Edu at 7.0/10: Good content but explain-then-practice pattern limits effectiveness",
    "Chrome Dreamy at 4.2/10: Lacks KB integration and pedagogical approach"
  ];

  const teachingPhilosophies = [
    "Pure Socratic (8.6-8.8): NotebookLM & CreateAI ask first, guide to discovery",
    "Explain-Then-Practice (7.0): ChatGPT5 Edu provides full explanation then asks students to practice",
    "Lecture-With-Offers (4.2): Chrome Dreamy gives complete answers with rhetorical offers"
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
