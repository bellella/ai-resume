import React from 'react';
import { TemplateProps } from '@/types/template.type';
import { TemplateOptions } from '../templates';
import './style.css';

export const templateOptions: TemplateOptions = {
  color: 'blue',
  fontSize: 14,
  sectionSpacing: 28,
  fontFamily: 'Georgia',
};

export function ModernTemplate({ resumeJson }: TemplateProps) {
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    province,
    postalCode,
    professionalSummary,
    skills = [],
    workExperiences = [],
    educations = [],
    jobTitle,
    links = [],
  } = resumeJson;

  const renderOrPlaceholder = (value: string, placeholder: string) =>
    value ? value : <span className="placeholder">{placeholder}</span>;

  return (
    <div id="resume-template" className="template-modern">
      {/* Header */}
      <header className="template-heading">
        <h1 className="template-name">
          {renderOrPlaceholder(firstName, 'FIRST NAME')}{' '}
          {renderOrPlaceholder(lastName, 'LAST NAME')}
        </h1>
        <h2 className="template-role">{renderOrPlaceholder(jobTitle, 'Job Title')}</h2>
        {[email, phone, city && `${city}, ${province}`, postalCode]
          .filter(Boolean)
          .map((item, i, arr) => (
            <span key={i}>
              {item}
              {i < arr.length - 1 && ' | '}
            </span>
          ))}
        <div className="links">
          {links.map((link, i, arr) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
              {link.name}
              {i < arr.length - 1 && ' | '}
            </a>
          ))}
        </div>
      </header>

      <section className="template-summary">
        {professionalSummary ? (
          <div dangerouslySetInnerHTML={{ __html: professionalSummary }} />
        ) : (
          <span className="placeholder">
            A brief summary about your professional background and core skills.
          </span>
        )}
      </section>

      <div className="template-grid">
        {/* Left Column */}
        <div className="template-sidebar">
          <section className="section">
            <h3 className="section-heading">Education</h3>
            {educations.map((edu, i) => (
              <div key={i} className="section-block">
                <div className="section-subtitle">{renderOrPlaceholder(edu.degree, 'Degree')}</div>
                <div>
                  {renderOrPlaceholder(edu.schoolName, 'School')},
                  {renderOrPlaceholder(edu.schoolLocation, 'Location')}
                </div>
                <div>{renderOrPlaceholder(`${edu.graduationYearMonth?.year}`, 'Year')}</div>
              </div>
            ))}
          </section>

          <section className="section">
            <h3 className="section-heading">Skills</h3>
            <ul className="skills-list">
              {skills.length > 0 ? (
                skills.map((skill, i) => <li key={i}>{skill.name}</li>)
              ) : (
                <li className="placeholder">Add your skills here</li>
              )}
            </ul>
          </section>
        </div>

        {/* Right Column */}
        <div className="template-content">
          <section className="section">
            <h3 className="section-heading">Work Experience</h3>
            {workExperiences.map((job, i) => (
              <div key={i} className="section-block">
                <div className="section-subtitle">
                  {renderOrPlaceholder(job.jobTitle, 'Job Title')} –{' '}
                  {renderOrPlaceholder(job.companyName, 'Company')}
                </div>
                <div className="section-submeta">
                  {renderOrPlaceholder(
                    `${job.startYearMonth?.year}.${job.startYearMonth?.month}`,
                    'Start'
                  )}{' '}
                  -{' '}
                  {job.isCurrent
                    ? 'Present'
                    : renderOrPlaceholder(
                        `${job.endYearMonth?.year}.${job.endYearMonth?.month}`,
                        'End'
                      )}{' '}
                  / {renderOrPlaceholder(`${job.city}, ${job.province}`, 'City, Province')}
                </div>
                <div
                  className="section-description"
                  dangerouslySetInnerHTML={{ __html: job.achievements }}
                />
              </div>
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
