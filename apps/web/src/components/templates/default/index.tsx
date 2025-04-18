import React from 'react';
import { ResumeJson } from '@ai-resume/types';
import './style.css';

export const css = `
.default-template {
  padding: 2rem;
  font-family: sans-serif;
  font-size: 14px;
  color: #000;
}
.header {
  margin-bottom: 2rem;
}
.name {
  font-size: 24px;
  font-weight: bold;
  color: #111;
}
.section {
  margin-bottom: 2rem;
}
.section-title {
  font-size: 18px;
  font-weight: 600;
  color: #2563eb;
}
.section-text {
  margin-top: 0.5rem;
  line-height: 1.5;
}
.skills-list {
  list-style-type: disc;
  padding-left: 1rem;
  margin-top: 0.5rem;
}
.section-group {
  margin-top: 0.5rem;
}
.item-title {
  font-weight: 500;
}
.item-sub {
  font-size: 12px;
  color: #666;
}

`;

export default function DefaultTemplate({ data }: { data: ResumeJson }) {
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
