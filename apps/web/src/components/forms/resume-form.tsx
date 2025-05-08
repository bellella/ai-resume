'use client';

import { EducationHistorySection } from './sections/education-history-section';
import { PersonalInfoSection } from './sections/personal-info-section';
import { SkillsSection } from './sections/skills-section';
import { SummarySection } from './sections/summary-section';
import { WorkHistorySection } from './sections/work-history-section';

export function ResumeForm() {
  return (
    <>
      <PersonalInfoSection />
      <WorkHistorySection />
      <EducationHistorySection />
      <SkillsSection />
      <SummarySection />
    </>
  );
}
