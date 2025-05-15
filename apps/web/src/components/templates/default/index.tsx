'use client';

import React from 'react';
import { TemplateProps } from '@/types/template.type';
import { TemplateOptions } from '../templates';
import './style.css';

export const templateOptions: TemplateOptions = {
  color: 'black',
  fontSize: 14,
  sectionSpacing: 8,
  fontFamily: 'Arial',
};

export function DefaultTemplate({ resumeJson }: TemplateProps) {
  const {
    firstName,
    lastName,
    jobTitle,
    email,
    phone,
    city,
    province,
    postalCode,
    professionalSummary,
    skills,
    languages,
    links,
    workExperiences,
    educations,
  } = resumeJson;

  const renderOrPlaceholder = (value: string | number, placeholder: string) =>
    value ? value : <span className="placeholder">{placeholder}</span>;

  const formatYearMonth = (ym?: { year: number; month: number }) =>
    ym ? `${String(ym.year)}-${String(ym.month).padStart(2, '0')}` : 'N/A';

  return (
    <div id="resume-template" className="template-default">
      {/* Header */}
      <header className="header">
        <div>
          <h1 className="name">
            {renderOrPlaceholder(firstName, 'First Name')}{' '}
            {renderOrPlaceholder(lastName, 'Last Name')}
          </h1>
          <h2 className="job-title">{renderOrPlaceholder(jobTitle, 'Job Title')}</h2>
        </div>
        <div className="personal-info">
          <p>
            {renderOrPlaceholder(city, 'City')}, {renderOrPlaceholder(province, 'Province')}{' '}
            {renderOrPlaceholder(postalCode, 'Postal Code')} |{' '}
            {renderOrPlaceholder(phone, 'Phone Number')}
          </p>
          <p>{renderOrPlaceholder(email, 'youremail@mail.com')}</p>
          <div className="links">
            {links?.length ? (
              links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              ))
            ) : (
              <p className="placeholder">Links</p>
            )}
          </div>
        </div>
      </header>
      <hr />
      {/* Professional Summary */}
      <section className="section">
        <h2 className="section-title">Professional Summary</h2>
        <div className="section-text">
          {professionalSummary ? (
            <div dangerouslySetInnerHTML={{ __html: professionalSummary }} />
          ) : (
            <span className="placeholder">
              A brief summary about your professional background and core skills.
            </span>
          )}
        </div>
      </section>

      {/* Skills */}
      <section className="section">
        <h2 className="section-title">Skills</h2>
        {skills?.length && skills.length > 0 ? (
          <ul className="grid-3-col">
            {skills.map((skill, i) => (
              <li key={i}>{skill.name}</li>
            ))}
          </ul>
        ) : (
          <p className="placeholder">List your relevant technical or soft skills here.</p>
        )}
      </section>

      {/* Work Experience */}
      <section className="section">
        <h2 className="section-title">Work Experience</h2>
        <div className="section-group">
          {workExperiences?.length > 0 ? (
            workExperiences.map((job, i) => (
              <div key={i}>
                <div className="item-title">
                  {renderOrPlaceholder(job.jobTitle, 'Your Position Title')} at{' '}
                  {renderOrPlaceholder(job.companyName, 'Company')}
                </div>
                <div className="item-sub">
                  {renderOrPlaceholder(job.city, 'City')},{' '}
                  {renderOrPlaceholder(job.province, 'Province')} |{' '}
                  {formatYearMonth(job.startYearMonth)} -{' '}
                  {job.isCurrent ? 'Present' : formatYearMonth(job.endYearMonth)}
                </div>
                <div
                  className="item-description"
                  dangerouslySetInnerHTML={{ __html: job.achievements }}
                />
              </div>
            ))
          ) : (
            <p className="placeholder">Add your previous work experiences here.</p>
          )}
        </div>
      </section>

      {/* Education */}
      <section className="section">
        <h2 className="section-title">Education</h2>
        <div className="section-group">
          {educations?.length > 0 ? (
            educations.map((edu, i) => (
              <div key={i}>
                <div className="item-title">
                  {renderOrPlaceholder(edu.degree, 'Degree')} in{' '}
                  {renderOrPlaceholder(edu.fieldOfStudy, 'Field of Study')}
                </div>
                <div className="item-sub">
                  {renderOrPlaceholder(edu.schoolName, 'School Name')},{' '}
                  {renderOrPlaceholder(edu.schoolLocation, 'Location')} |{' '}
                  {edu.isCurrent ? 'Present' : formatYearMonth(edu.graduationYearMonth)}
                </div>
              </div>
            ))
          ) : (
            <p className="placeholder">Add your education details here.</p>
          )}
        </div>
      </section>

      {/* Languages */}
      <section className="section">
        <h2 className="section-title">Languages</h2>
        {languages?.length && languages.length > 0 ? (
          <ul className="skills-list">
            {languages.map((lang, i) => (
              <li key={i}>
                {lang.name} {lang.level !== 'none' && `(${lang.level})`}
              </li>
            ))}
          </ul>
        ) : (
          <p className="placeholder">List the languages you speak and your fluency level.</p>
        )}
      </section>
    </div>
  );
}
