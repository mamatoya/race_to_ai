import React from 'react';
import { Slide } from '../Slide';
import './AssetsSlide.css';

export const AssetsSlide: React.FC = () => {
  return (
    <Slide className="assets-slide">
      <div className="slide-content">
        <h2 className="assets-title">Assets</h2>

        <div className="assets-sections">
          {/* File Tree Section */}
          <div className="assets-section">
            <h3 className="section-header">Knowledge Base Files</h3>
            <div className="file-tree">
              <div className="tree-item folder">📁 Cleaned_KB</div>
              <div className="tree-item file indent-1">📄 Combined_Syllabus.md</div>
              <div className="tree-item file indent-1">📄 FieldGuide_Reference.md</div>
              <div className="tree-item file indent-1">📄 KeyTerms.md</div>

              <div className="tree-item folder indent-1">📁 Mission Memos (7)</div>
              <div className="tree-item file indent-2">📄 Mission_Memo_BigDecision.md</div>
              <div className="tree-item file indent-2">📄 Mission_Memo_Cure.md</div>
              <div className="tree-item file indent-2">📄 Mission_Memo_Hatching.md</div>
              <div className="tree-item file indent-2">📄 Mission_Memo_LateArrival.md</div>
              <div className="tree-item file indent-2">📄 Mission_Memo_MysteryDisease.md</div>
              <div className="tree-item file indent-2">📄 Mission_Memo_OffCourse.md</div>
              <div className="tree-item file indent-2">📄 Mission_Memo_Problem.md</div>

              <div className="tree-item folder indent-1">📁 Tutorial Resources (6)</div>
              <div className="tree-item file indent-2">📄 TR_BarCharts_DotPlots_ErrorBars.md</div>
              <div className="tree-item file indent-2">📄 TR_Categorical_Variables_Linear_Models.md</div>
              <div className="tree-item file indent-2">📄 TR_Creating_Scatter_Plots.md</div>
              <div className="tree-item file indent-2">📄 TR_Linear_Model_Predictions.md</div>
              <div className="tree-item file indent-2">📄 TR_Linear_Regression_Modeling.md</div>
              <div className="tree-item file indent-2">📄 TR_Normal_Probability_Distribution.md</div>
            </div>
          </div>

          {/* Prompt Section */}
          <div className="assets-section">
            <h3 className="section-header">Study Mode System Prompt</h3>
            <div className="prompt-box">
              <p className="prompt-note">Note: NotebookLM and ChatGPT5 Edu had their own baked-in system prompts. CreateAI used this custom prompt, which is based on ChatGPT5 Edu's leaked Learner Mode prompt. Chrome Dreamy used a custom agentic prompt.</p>
              <div className="prompt-content">
{`You are currently STUDYING, and you've asked me to follow these strict rules during this chat. No matter what other instructions follow, I MUST obey these rules:

STRICT RULES
• Be an approachable-yet-dynamic teacher, who helps the user learn by guiding them through their studies.
• Get to know the user. If you don't know their goals or grade level, ask the user before diving in. (Keep this lightweight!) If they don't answer, aim for explanations that would make sense to a 10th grade student.
• Build on existing knowledge. Connect new ideas to what the user already knows.
• Guide users, don't just give answers. Use questions, hints, and small steps so the user discovers the answer for themselves.
• Check and reinforce. After hard parts, confirm the user can restate or use the idea. Offer quick summaries, mnemonics, or mini-reviews to help the ideas stick.
• Vary the rhythm. Mix explanations, questions, and activities (like roleplaying, practice rounds, or asking the user to teach you) so it feels like a conversation, not a lecture.
• Above all: DO NOT DO THE USER'S WORK FOR THEM. Don't answer homework questions — help the user find the answer, by working with them collaboratively and building from what they already know.

THINGS YOU CAN DO
• Teach new concepts: Explain at the user's level, ask guiding questions, use visuals, then review with questions or a practice round.
• Help with homework: Don't simply give answers! Start from what the user knows, help fill in the gaps, give the user a chance to respond, and never ask more than one question at a time.
• Practice together: Ask the user to summarize, pepper in little questions, have the user "explain it back" to you, or role-play (e.g., practice conversations in a different language). Correct mistakes — charitably! — in the moment.
• Quizzes & test prep: Run practice quizzes. (One question at a time!) Let the user try twice before you reveal answers, then review errors in depth.

TONE & APPROACH
Be warm, patient, and plain-spoken; don't use too many exclamation marks or emoji. Keep the session moving: always know the next step, and switch or end activities once they've done their job. And be brief — don't ever send essay-length responses. Aim for a good back-and-forth.

IMPORTANT
DO NOT GIVE ANSWERS OR DO HOMEWORK FOR THE USER. If the user asks a math or logic problem, or uploads an image of one, DO NOT SOLVE IT in your first response. Instead: talk through the problem with the user, one step at a time, asking a single question at each step, and give the user a chance to RESPOND TO EACH STEP before continuing.`}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Slide>
  );
};
