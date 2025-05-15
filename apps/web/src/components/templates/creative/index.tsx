import React from 'react';
import { TemplateProps } from '@/types/template.type';
import { TemplateOptions } from '../templates';
import './style.css';

export const templateOptions: TemplateOptions = {
  color: 'blue',
  fontSize: 14,
  sectionSpacing: 32,
  fontFamily: 'Arial',
};

export function CreativeTemplate({ resumeJson }: TemplateProps) {
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
    skills = [],
    workExperiences = [],
    educations = [],
    links = [],
    languages = [],
  } = resumeJson;

  const renderOrPlaceholder = (value: string, placeholder: string) =>
    value ? value : <span className="placeholder">{placeholder}</span>;

  return (
    <div id="resume-template" className="template-creative">
      {/* Left column */}
      <div className="left">
        <section>
          <div className="heading">Contact</div>
          <div>{renderOrPlaceholder(phone, '+123-456-7890')}</div>
          <div>{renderOrPlaceholder(email, 'hello@email.com')}</div>
          <div>
            {renderOrPlaceholder(city, 'City')}, {renderOrPlaceholder(province, 'Province')}
          </div>
          <div>{renderOrPlaceholder(postalCode, 'Postal Code')}</div>
          <div className="links">
            {links.length > 0 &&
              links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              ))}
          </div>
        </section>

        <section>
          <div className="heading">Education</div>
          {educations.length > 0 ? (
            educations.map((edu, i) => (
              <div key={i} className="item">
                <div>
                  {renderOrPlaceholder(`${edu.graduationYearMonth?.year}`, 'Year')} –{' '}
                  {renderOrPlaceholder(edu.schoolName, 'School Name')}
                </div>
                <div className="meta">
                  {renderOrPlaceholder(edu.degree, 'Degree')} in{' '}
                  {renderOrPlaceholder(edu.fieldOfStudy, 'Field')}
                </div>
              </div>
            ))
          ) : (
            <div className="placeholder">Add your education history here</div>
          )}
        </section>

        <section>
          <div className="heading">Skills</div>
          {skills.length > 0 ? (
            <ul>
              {skills.map((skill, i) => (
                <li key={i}>{skill.name}</li>
              ))}
            </ul>
          ) : (
            <div className="placeholder">List your skills here</div>
          )}
        </section>

        <section>
          <div className="heading">Languages</div>
          {languages.length > 0 ? (
            <ul>
              {languages.map((lang, i) => (
                <li key={i}>
                  {lang.name} {lang.level && lang.level !== 'none' ? `(${lang.level})` : ''}
                </li>
              ))}
            </ul>
          ) : (
            <div className="placeholder">Add languages here</div>
          )}
        </section>
      </div>

      {/* Right column */}
      <div className="right">
        <header className="header">
          <h1>
            {renderOrPlaceholder(firstName, 'First Name')}{' '}
            {renderOrPlaceholder(lastName, 'Last Name')}
          </h1>
          <h2>{renderOrPlaceholder(jobTitle, 'Job Title')}</h2>
        </header>

        <section className="summary">
          <div className="heading">Profile Summary</div>
          <div>
            {professionalSummary ? (
              <div dangerouslySetInnerHTML={{ __html: professionalSummary }} />
            ) : (
              <span className="placeholder">Write a professional summary here.</span>
            )}
          </div>
        </section>

        <section className="work">
          <div className="heading">Work Experience</div>
          {workExperiences.length > 0 ? (
            workExperiences.map((job, i) => (
              <div key={i} className="item">
                <div>
                  {renderOrPlaceholder(job.companyName, 'Company')} –{' '}
                  {renderOrPlaceholder(job.jobTitle, 'Title')}
                </div>
                <div className="meta">
                  {renderOrPlaceholder(
                    `${job.startYearMonth?.year}.${job.startYearMonth?.month}`,
                    'Start'
                  )}{' '}
                  –{' '}
                  {job.isCurrent
                    ? 'Present'
                    : renderOrPlaceholder(
                        `${job.endYearMonth?.year}.${job.endYearMonth?.month}`,
                        'End'
                      )}
                </div>
                <div
                  className="item-description"
                  dangerouslySetInnerHTML={{ __html: job.achievements }}
                />
              </div>
            ))
          ) : (
            <div className="placeholder">Add your work experience here</div>
          )}
        </section>
      </div>
    </div>
  );
}
