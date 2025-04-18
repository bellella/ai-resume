import React from 'react';
import { ResumeJson } from '@ai-resume/types';
import './style.css';

export const css = `
/* modern-template.css */
.modern-template {
  padding: 40px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2a2a2a;
  background-color: #fdfdfd;
  line-height: 1.6;
  font-size: 14px;
}

.modern-header {
  text-align: center;
  margin-bottom: 30px;
}

.modern-name {
  font-size: 32px;
  font-weight: bold;
  color: #1e40af;
}

.modern-contact {
  font-size: 13px;
  color: #555;
}

.modern-section {
  margin-top: 32px;
}

.modern-section-title {
  font-size: 18px;
  font-weight: bold;
  color: #1e3a8a;
  margin-bottom: 8px;
  border-bottom: 1px solid #cbd5e1;
  padding-bottom: 4px;
}

.modern-list {
  list-style-type: disc;
  padding-left: 20px;
  margin-top: 10px;
}

.modern-item-title {
  font-weight: 600;
}

.modern-item-sub {
  font-size: 12px;
  color: #6b7280;
}

.modern-group {
  margin-top: 12px;
}
`;

export default function ModernTemplate({ data }: { data: ResumeJson }) {
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
    <div className="modern-template">
      {/* Header */}
      <header className="modern-header">
        <div className="modern-name">
          {firstName} {lastName}
        </div>
        <div className="modern-contact">
          <span>{email}</span> | <span>{phone}</span>
          <br />
          <span>
            {city}, {province} {postalCode}
          </span>
        </div>
      </header>

      {/* Summary */}
      <section className="modern-section">
        <h2 className="modern-section-title">Summary</h2>
        <p className="modern-section-text">{professionalSummary}</p>
      </section>

      {/* Skills */}
      <section className="modern-section">
        <h2 className="modern-section-title">Skills</h2>
        <ul className="modern-skills">
          {skills.map((skill, i) => (
            <li key={i}>{skill}</li>
          ))}
        </ul>
      </section>

      {/* Experience */}
      <section className="modern-section">
        <h2 className="modern-section-title">Experience</h2>
        <div className="modern-group">
          {workExperiences.map((job, i) => (
            <div key={i} className="modern-item">
              <div className="modern-job-title">
                {job.jobTitle} @ {job.employer}
              </div>
              <div className="modern-job-details">
                {job.city}, {job.province} | {job.startDate} - {job.endDate}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="modern-section">
        <h2 className="modern-section-title">Education</h2>
        <div className="modern-group">
          {educations.map((edu, i) => (
            <div key={i} className="modern-item">
              <div className="modern-job-title">
                {edu.degree} in {edu.fieldOfStudy}
              </div>
              <div className="modern-job-details">
                {edu.schoolName}, {edu.schoolLocation} | {edu.graduationMonth} {edu.graduationYear}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
