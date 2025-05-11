'use client';

import { EducationHistorySection } from './education-history-section';
import { PersonalInfoSection } from './personal-info-section';
import { SkillsSection } from './skills-section';
import { SummarySection } from './summary-section';
import { WorkHistorySection } from './work-history-section';

// TODO: decide to use this or not
export function ResumeForm() {
  return (
    <>
      <PersonalInfoSection />
      <WorkHistorySection requireAuth={() => true} />
      <EducationHistorySection />
      <SkillsSection />
      <SummarySection />
    </>
  );
}
