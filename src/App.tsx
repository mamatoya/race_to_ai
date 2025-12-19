import { SlideDeck } from './components/SlideDeck';
import { TitleSlide } from './components/slides/TitleSlide';
import { InsightsSlide } from './components/slides/InsightsSlide';
import { CombinedMatrixSlide } from './components/slides/CombinedMatrixSlide';
import { VibeCheckSlide } from './components/slides/VibeCheckSlide';
import { ProcessOverviewSlide } from './components/slides/ProcessOverviewSlide';
import { AssetsSlide } from './components/slides/AssetsSlide';
import { SwimLanesSlide } from './components/slides/SwimLanesSlide';
import { AIResponseComparisonSlide } from './components/slides/AIResponseComparisonSlide';
import { DreamyWorldSlide } from './components/slides/DreamyWorldSlide';
import { aiData, slideContent } from './data/reportData';
import './App.css';

function App() {
  const keyInsights = [
    "This round of testing found NotebookLM and CreateAI guide learning through questions; ChatGPT Edu and Chrome Dreamy tend to scaffold first and ask later.",
    "⚠️  Current evaluation scores throughout this deck are done with AI and human SME evaluations are just getting started"
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
              "Exploring access to student usage insights"
            ]
          }
        ]}
      />

      <DreamyWorldSlide />
    </SlideDeck>
  );
}

export default App;
