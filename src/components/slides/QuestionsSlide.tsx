import React, { useState, useEffect } from 'react';
import { Slide } from '../Slide';
import './QuestionsSlide.css';

type ViewMode = 'grid' | 'accordion' | 'cloud';

interface Question {
  number: number;
  text: string;
  category?: string;
}

interface QuestionCategory {
  name: string;
  count: number;
  questions: Question[];
}

interface ThemeTopic {
  name: string;
  count: number;
  size: number;
}

export const QuestionsSlide: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<QuestionCategory[]>([]);
  const [themes, setThemes] = useState<ThemeTopic[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load and parse CSV
    fetch('/aiQuestions.csv')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      })
      .then(csvText => {
        console.log('CSV loaded, length:', csvText.length);

        // Parse CSV properly handling quoted fields with embedded newlines
        const parsedQuestions: Question[] = [];
        const lines = csvText.split('\n');

        // Skip header
        for (let i = 1; i < lines.length; i++) {
          const line = lines[i].trim();
          if (!line) continue;

          // Check if line starts with a number (question number)
          const match = line.match(/^(\d+),(.*)$/);
          if (match) {
            const number = parseInt(match[1]);
            let text = match[2];

            // If text starts with a quote, we need to find the closing quote
            if (text.startsWith('"')) {
              text = text.substring(1); // Remove opening quote

              // Keep reading lines until we find the closing quote
              while (!text.endsWith('"') && i < lines.length - 1) {
                i++;
                text += '\n' + lines[i];
              }

              // Remove closing quote
              if (text.endsWith('"')) {
                text = text.substring(0, text.length - 1);
              }

              // Handle escaped quotes
              text = text.replace(/""/g, '"');
            }

            parsedQuestions.push({
              number,
              text,
              category: categorizeQuestion(text)
            });
          }
        }

        console.log('Parsed questions:', parsedQuestions.length);
        setQuestions(parsedQuestions);

        // Create categories
        const categoryMap = new Map<string, Question[]>();
        parsedQuestions.forEach(q => {
          const cat = q.category || 'Other';
          if (!categoryMap.has(cat)) {
            categoryMap.set(cat, []);
          }
          categoryMap.get(cat)!.push(q);
        });

        const cats: QuestionCategory[] = Array.from(categoryMap.entries()).map(([name, questions]) => ({
          name,
          count: questions.length,
          questions
        })).sort((a, b) => b.count - a.count);

        setCategories(cats);

        // Create themes for cloud view
        const themeData = extractThemes(parsedQuestions);
        setThemes(themeData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error loading CSV:', error);
        setError('Failed to load questions data');
        setLoading(false);
      });
  }, []);

  const categorizeQuestion = (text: string): string => {
    const lower = text.toLowerCase();

    if (lower.includes('excel') || lower.includes('workbook') || lower.includes('formula') ||
        lower.includes('cell') || lower.includes('histogram') || lower.includes('chart') ||
        lower.includes('graph') || lower.includes('scatter plot')) {
      return 'Excel & Formulas';
    }
    if (lower.includes('probability') || lower.includes('norm.dist') || lower.includes('standard deviation') ||
        lower.includes('mean') || lower.includes('median') || lower.includes('frequency') ||
        lower.includes('distribution')) {
      return 'Statistics & Probability';
    }
    if (lower.includes('canvas') || lower.includes('upload') || lower.includes('submission') ||
        lower.includes('graded') || lower.includes('quiz') || lower.includes('assignment')) {
      return 'Course Navigation';
    }
    if (lower.includes('calculate') || lower.includes('slope') || lower.includes('linear') ||
        lower.includes('residual') || lower.includes('model')) {
      return 'Calculations & Models';
    }
    if (lower.includes('interpret') || lower.includes('what does') || lower.includes('what is') ||
        lower.includes('explain') || lower.includes('difference between')) {
      return 'Conceptual Understanding';
    }
    if (lower.includes('mission memo') || lower.includes('lab') || lower.includes('dsl')) {
      return 'Lab & Assignments';
    }
    if (lower.includes('cell death') || lower.includes('apoptosis') || lower.includes('muscle') ||
        lower.includes('ligand') || lower.includes('biological')) {
      return 'Biology Content';
    }

    return 'General Questions';
  };

  const extractThemes = (questions: Question[]): ThemeTopic[] => {
    const keywords = [
      'Excel', 'Formula', 'Probability', 'Standard Deviation', 'Mean', 'Median',
      'Canvas', 'Upload', 'Graph', 'Chart', 'Calculate', 'Distribution',
      'Mission Memo', 'Lab', 'Quiz', 'Workbook', 'Slope', 'Data',
      'NORM.DIST', 'Frequency', 'Assignment', 'Submission'
    ];

    const counts = new Map<string, number>();

    questions.forEach(q => {
      keywords.forEach(keyword => {
        if (q.text.toLowerCase().includes(keyword.toLowerCase())) {
          counts.set(keyword, (counts.get(keyword) || 0) + 1);
        }
      });
    });

    const maxCount = Math.max(...Array.from(counts.values()));

    return Array.from(counts.entries())
      .map(([name, count]) => ({
        name,
        count,
        size: 12 + (count / maxCount) * 36 // 12px to 48px
      }))
      .sort((a, b) => b.count - a.count);
  };

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => {
      const newSet = new Set(prev);
      if (newSet.has(categoryName)) {
        newSet.delete(categoryName);
      } else {
        newSet.add(categoryName);
      }
      return newSet;
    });
  };

  return (
    <Slide className="questions-slide">
      <div className="slide-content">
        <div className="questions-header">
          <div className="header-text">
            <h2 className="slide-title">Student Prompts Dataset (n={questions.length})</h2>
            <p className="dataset-note">* Missing: Student/TA discussion board questions</p>
          </div>
          <div className="view-toggle">
            <button
              className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              Grid View
            </button>
            <button
              className={`toggle-btn ${viewMode === 'accordion' ? 'active' : ''}`}
              onClick={() => setViewMode('accordion')}
            >
              Categories
            </button>
            <button
              className={`toggle-btn ${viewMode === 'cloud' ? 'active' : ''}`}
              onClick={() => setViewMode('cloud')}
            >
              Themes
            </button>
          </div>
        </div>

        {loading && (
          <div className="questions-loading">
            <div className="loading-spinner"></div>
            <p>Loading questions...</p>
          </div>
        )}

        {error && (
          <div className="questions-error">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && viewMode === 'grid' && (
          <div className="questions-grid-container">
            <div className="questions-grid">
              {questions.map((q) => (
                <div key={q.number} className="question-item">
                  <span className="question-number">#{q.number}</span>
                  <span className="question-text">{q.text}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && viewMode === 'accordion' && (
          <div className="questions-accordion-container">
            <div className="questions-accordion">
              {categories.map((category) => (
                <div key={category.name} className="category-section">
                  <button
                    className={`category-header ${expandedCategories.has(category.name) ? 'expanded' : ''}`}
                    onClick={() => toggleCategory(category.name)}
                  >
                    <span className="category-name">{category.name}</span>
                    <span className="category-count">({category.count})</span>
                    <span className="category-arrow">
                      {expandedCategories.has(category.name) ? '▼' : '▶'}
                    </span>
                  </button>
                  {expandedCategories.has(category.name) && (
                    <div className="category-questions">
                      {category.questions.map((q) => (
                        <div key={q.number} className="question-item-accordion">
                          <span className="question-number-accordion">#{q.number}</span>
                          <span className="question-text-accordion">{q.text}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && !error && viewMode === 'cloud' && (
          <div className="questions-cloud-container">
            <div className="theme-stats">
              <div className="stat-item">
                <span className="stat-label">Total Questions:</span>
                <span className="stat-value">{questions.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Categories:</span>
                <span className="stat-value">{categories.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Top Theme:</span>
                <span className="stat-value">{themes[0]?.name || 'N/A'}</span>
              </div>
            </div>
            <div className="questions-cloud">
              {themes.map((theme, index) => (
                <div
                  key={theme.name}
                  className="theme-item"
                  style={{
                    fontSize: `${theme.size}px`,
                    animationDelay: `${index * 0.05}s`
                  }}
                  title={`${theme.count} questions`}
                >
                  {theme.name}
                  <span className="theme-count">({theme.count})</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Slide>
  );
};
