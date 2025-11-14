export type RatingLevel = 'High' | 'Medium' | 'Low' | 'Critical' | 'N/A';

export interface MatrixCell {
  rating: RatingLevel;
  description: string | string[];
}

export interface MatrixFeature {
  name: string;
  description: string;
  ratings: {
    [aiName: string]: MatrixCell;
  };
}

export const competitiveMatrix: MatrixFeature[] = [
  {
    name: "Custom Content Library\n(Knowledge Base)",
    description: "Ability to integrate and leverage ASU course materials",
    ratings: {
      "ChatGPT5 Edu": {
        rating: "High",
        description: "Can create GPTs or Projects with custom KBs"
      },
      "Chrome Dreamy": {
        rating: "Medium",
        description: "Can have customer KB but slow to update and manage"
      },
      "CreateAI": {
        rating: "High",
        description: "Limited to 25 KB docs"
      },
      "NotebookLM": {
        rating: "High",
        description: "Excellent KB integration; cited course materials"
      },
      "Grammarly": {
        rating: "N/A",
        description: "Currently Alpha Testing; custom agents 7+ months out until beta"
      }
    }
  },
  {
    name: "Deployable @ Scale",
    description: "How easily can we provide student access institution-wide",
    ratings: {
      "ChatGPT5 Edu": {
        rating: "High",
        description: [
          "Students have access",
          "Existing ASU partnership; Cost? ⚠️",
          "Already have some market adoption"
        ]
      },
      "Chrome Dreamy": {
        rating: "Critical",
        description: [
          "Slow to deploy to 40+ students",
          "Rapidly evolving tech stack creates multiple failure points"
        ]
      },
      "CreateAI": {
        rating: "Medium",
        description: [
          "In production via ASU GPT's marketplace",
          "API available; embeds into Canvas",
          "⚠️ Inconsistent performance"
        ]
      },
      "NotebookLM": {
        rating: "High",
        description: [
          "Students have access",
          "Existing ASU partnership; Cost? ⚠️",
          "Already have some market adoption"
        ]
      },
      "Grammarly": {
        rating: "N/A",
        description: [
          "Currently Beta Testing",
          "General use Grammarly AI for students 6+ months out",
          "Already have some market adoption"
        ]
      }
    }
  },
  {
    name: "Future Proofing",
    description: "Custom tooling potential and technical debt considerations",
    ratings: {
      "ChatGPT5 Edu": {
        rating: "High",
        description: "• OpenAI is moving fast\n• Possible custom tooling\n• No tech debt"
      },
      "Chrome Dreamy": {
        rating: "Critical",
        description: "• High technical debt\n• Rearchitecture needed\n• ⚠️ New CreateAI Agentic Builder"
      },
      "CreateAI": {
        rating: "Medium",
        description: "• Newer platform\n• Concerns of tech debt\n• Promising custom tooling"
      },
      "NotebookLM": {
        rating: "High",
        description: "• Google is moving fast\n• Possible custom tooling\n• No tech debt"
      },
      "Grammarly": {
        rating: "N/A",
        description: "• Newer platform\n• Concerns of tech debt\n• Promising custom tooling"
      }
    }
  },
  {
    name: "Data Insights",
    description: "Analytics on student questions and learning patterns",
    ratings: {
      "ChatGPT5 Edu": {
        rating: "Low",
        description: "Still waiting on ChatGPT answer."
      },
      "Chrome Dreamy": {
        rating: "High",
        description: "FERPA Compliant Insights on Student Usage"
      },
      "CreateAI": {
        rating: "High",
        description: "FERPA Compliant Insights on Student Usage"
      },
      "NotebookLM": {
        rating: "Low",
        description: "Seems to have data options but request additional money"
      },
      "Grammarly": {
        rating: "N/A",
        description: "Currently drafting DSA with intent of data insights."
      }
    }
  }
];

export const aiNames = ["Chrome Dreamy", "CreateAI", "ChatGPT5 Edu", "NotebookLM", "Grammarly"];

export const aiCompanies: { [key: string]: string } = {
  "Chrome Dreamy": "ASU",
  "CreateAI": "ASU",
  "ChatGPT5 Edu": "OpenAI",
  "NotebookLM": "Google",
  "Grammarly": "Grammarly"
};

export const ratingColors = {
  High: "#10B981",      // Green
  Medium: "#F59E0B",    // Orange
  Low: "#EF4444",       // Red
  Critical: "#7C3AED",  // Purple
  "N/A": "#6B7280"      // Grey
};
