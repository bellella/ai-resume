import React from 'react';
import { TemplateProps } from '@/types/template.type';

export const css = `
.resume-container {
  --main-color: #2b6cb0;
  --base-font-size: 14px;
  --section-spacing: 32px;
  --font-family: 'Helvetica Neue', sans-serif;

  header {
  margin-bottom: var(--section-spacing);
}

header h1 {
  font-size: calc(2 * var(--base-font-size));
  font-weight: bold;
  color: var(--main-color);
  margin-bottom: calc(0.5 * var(--base-font-size));
}

header p {
  margin: 0;
  font-size: var(--base-font-size);
}

section {
  margin-bottom: var(--section-spacing);
}

section h2 {
  font-size: calc(1.3 * var(--base-font-size));
  font-weight: bold;
  color: var(--main-color);
  margin-bottom: calc(0.5 * var(--base-font-size));
}

section p,
section li,
section div {
  font-size: var(--base-font-size);
  margin-bottom: calc(0.3 * var(--base-font-size));
}

ul {
  list-style: disc;
  padding-left: 20px;
}

ul li {
  margin-bottom: calc(0.3 * var(--base-font-size));
}

.text-muted {
  color: #666;
  font-size: calc(0.85 * var(--base-font-size));
}
}

`;


export default function DefaultTemplate({ data }: TemplateProps) {
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    province,
    postalCode,
    professionalSummary,
    skills,
    workExperiences,
    educations,
  } = data;

  return (
    <div className="default-template">
      <style>{css}</style>
      {/* Header */}
      <header className="header">
        <h1 className="name">
          {firstName} {lastName}
        </h1>
        <p>
          {email} | {phone}
        </p>
        <p>
          {city}, {province} {postalCode}
        </p>
      </header>

      {/* Summary */}
      <section className="section">
        <h2 className="section-title">Professional Summary</h2>
        <p className="section-text">{professionalSummary}</p>
      </section>

      {/* Skills */}
      <section className="section">
        <h2 className="section-title">Skills</h2>
        <ul className="skills-list">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Work Experience */}
      <section className="section">
        <h2 className="section-title">Work Experience</h2>
        <div className="section-group">
          {workExperiences.map((job, i) => (
            <div key={i}>
              <div className="item-title">
                {job.jobTitle} at {job.employer}
              </div>
              <div className="item-sub">
                {job.city}, {job.province} | {job.startDate} - {job.endDate}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="section">
        <h2 className="section-title">Education</h2>
        <div className="section-group">
          {educations.map((edu, i) => (
            <div key={i}>
              <div className="item-title">
                {edu.degree} in {edu.fieldOfStudy}
              </div>
              <div className="item-sub">
                {edu.schoolName}, {edu.schoolLocation} | {edu.graduationMonth} {edu.graduationYear}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
