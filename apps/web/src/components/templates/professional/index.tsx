import React from 'react';
import { TemplateProps } from '@/types/template.type';
import { TemplateOptions } from '../templates';
import './style.css';

export const templateOptions: TemplateOptions = {
  color: 'blue',
  fontSize: 14,
  sectionSpacing: 20,
  fontFamily: 'Times New Roman',
};

export default function ProfessionalTemplate({ resumeJson }: TemplateProps) {
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
  } = resumeJson;

  return (
    <div id="resume-template" className="template-professional">
      <div className="template-header">
        <h1 className="template-name">
          {firstName} {lastName}
        </h1>
        <p className="template-contact">
          {email} | {phone}
        </p>
        <p className="template-location">
          {city}, {province} {postalCode}
        </p>
      </div>

      <div className="template-body">
        <div className="template-section">
          <h2 className="template-title">Summary</h2>
          <p className="template-text">{professionalSummary}</p>
        </div>

        <div className="template-section">
          <h2 className="template-title">Skills</h2>
          <ul className="template-list">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="template-section">
          <h2 className="template-title">Work Experience</h2>
          <div className="template-group">
            {workExperiences.map((job, i) => (
              <div key={i} className="template-item">
                <div className="template-item-title">
                  {job.jobTitle} at {job.companyName}
                </div>
                <div className="template-item-sub">
                  {job.city}, {job.province} | {job.startDate} - {job.endDate}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="template-section">
          <h2 className="template-title">Education</h2>
          <div className="template-group">
            {educations.map((edu, i) => (
              <div key={i} className="template-item">
                <div className="template-item-title">
                  {edu.degree} in {edu.fieldOfStudy}
                </div>
                <div className="template-item-sub">
                  {edu.schoolName}, {edu.schoolLocation} | {edu.graduationMonth}{' '}
                  {edu.graduationYear}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
