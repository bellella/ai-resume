import React from 'react';
import { TemplateProps } from '@/types/template.type';
import { TemplateOptions } from '../templates';
import './style.css';

export const templateOptions: TemplateOptions = {
  color: 'slate',
  fontSize: 14,
  sectionSpacing: 18,
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
    profileImage,
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
    <div id="resume-template" className="professional-template">
      <div className="left-column">
        <div className="profile-pic" style={{ backgroundImage: `url(${profileImage})` }} />
        <div className="contact-section">
          {[email, phone, `${city}, ${province}`, postalCode]
            .filter(Boolean)
            .map((item, i, arr) => (
              <div key={i}>{item}</div>
            ))}
          <div className="links">
            {links.length > 0 &&
              links.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.name}
                </a>
              ))}
          </div>
        </div>

        <div className="subsection">
          <h3>Tools & Technologies</h3>
          <ul className="skills-list">
            {skills.length > 0 ? (
              skills.map((skill, i) => <li key={i}>{skill.name}</li>)
            ) : (
              <li className="placeholder">Add your skills here</li>
            )}
          </ul>
        </div>
      </div>

      <div className="right-column">
        <header>
          <h1 className="name">
            {renderOrPlaceholder(firstName, 'Your')} {renderOrPlaceholder(lastName, 'Name')}
          </h1>
          <p className="position">{renderOrPlaceholder(jobTitle, 'Job Title')}</p>
        </header>

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

        <section className="section">
          <h2 className="section-title">Experience</h2>
          <div className="section-group">
            {workExperiences.map((job, i) => (
              <div key={i}>
                <div className="item-title">{renderOrPlaceholder(job.jobTitle, 'Role')}</div>
                <div className="item-sub">
                  {renderOrPlaceholder(job.companyName, 'Company')} —{' '}
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
                      )}
                  , {renderOrPlaceholder(job.city, 'City')}
                </div>
                <div
                  className="item-description"
                  dangerouslySetInnerHTML={{ __html: job.achievements }}
                />
              </div>
            ))}
          </div>
        </section>

        <section className="section">
          <h2 className="section-title">Education</h2>
          <div className="section-group">
            {educations.map((edu, i) => (
              <div key={i}>
                <div className="item-title">
                  {renderOrPlaceholder(edu.degree, 'Degree')} in{' '}
                  {renderOrPlaceholder(edu.fieldOfStudy, 'Field of Study')}
                </div>
                <div className="item-sub">
                  {renderOrPlaceholder(edu.schoolName, 'School Name')},{' '}
                  {renderOrPlaceholder(edu.schoolLocation, 'Location')} |{' '}
                  {renderOrPlaceholder(`${edu.graduationYearMonth?.month}`, 'Month')}{' '}
                  {renderOrPlaceholder(`${edu.graduationYearMonth?.year}`, 'Year')}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
