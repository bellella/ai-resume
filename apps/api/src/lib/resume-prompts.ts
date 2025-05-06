import { ResumeJson, SummaryMeta, WorkExperienceMeta } from '@ai-resume/types';

type SummaryPromptParams = {
  userInput?: string;
  meta: SummaryMeta;
};

type WorkExperiencePromptParams = {
  userInput?: string;
  meta: WorkExperienceMeta;
};

export const resumePrompts = {
  evaluateResume: (resumeJson: ResumeJson): string =>
    `You are an expert resume reviewer.
  Evaluate the following resume and return your response strictly in JSON format as shown below:
  
  {
    "score": number,                // A score between 0 and 100
    "summary": string,              // A brief summary of the resume's overall quality
    "strengths": string[],          // 2–3 key strengths
    "weaknesses": string[]          // 2–3 key areas for improvement
  }
  
  Resume:
  ${JSON.stringify(resumeJson, null, 2)}
`.trim(),
  summary: ({ userInput, meta }: SummaryPromptParams): string =>
    `
You are a professional AI resume assistant.

The user has requested help with their "Summary" section.

---

✏️ User's current Summary:
"""
${userInput}
"""

📄 Additional information in JSON format:
${JSON.stringify(meta, null, 2)}

---

🧠 Instructions:
- Rewrite the summary to sound more professional, results-oriented, and tailored for a resume.
- Use bullet points if necessary and highlight achievements or responsibilities.
- If the input is missing or vague, generate a strong resume entry using the metadata.
- Return only the rewritten experience entry.
`.trim(),
  workExperience: ({ userInput, meta }: WorkExperiencePromptParams): string =>
    `
You are a professional AI resume assistant.

The user has requested help with their "Experience" section.

---

✏️ User's current Experience:
"""
${userInput}
"""

📄 Additional information in JSON format:
${JSON.stringify(meta, null, 2)}

---

🧠 Instructions:
- Rewrite the experience to sound more professional, results-oriented, and tailored for a resume.
- Use bullet points if necessary and highlight achievements or responsibilities.
- If the input is missing or vague, generate a strong resume entry using the metadata.
- Return only the rewritten experience entry.
`.trim(),
};

export type ResumeSectionPromptKey = keyof typeof resumePrompts;
