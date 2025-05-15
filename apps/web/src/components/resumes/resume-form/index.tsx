'use client';

import { EducationHistorySection } from './education-history-section';
import { LanguagesSection } from './languages-section';
import { LinksSection } from './links-section';
import { PersonalInfoSection } from './personal-info-section';
import { SkillsSection } from './skills-section';
import { SummarySection } from './summary-section';
import { WorkHistorySection } from './work-history-section';

export function ResumeForm() {
  return (
    <>
      <PersonalInfoSection />
      <SummarySection />
      <WorkHistorySection />
      <EducationHistorySection />
      <SkillsSection />
      <LanguagesSection />
      <LinksSection />
    </>
  );
}
