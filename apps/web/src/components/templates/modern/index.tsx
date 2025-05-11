import React from 'react';
import { TemplateProps } from '@/types/template.type';
import { TemplateOptions } from '../templates';
import modernCss from '!!raw-loader!@/components/templates/modern/style.css';
export const templateOptions: TemplateOptions = {
  color: 'black',
  fontSize: 14,
  sectionSpacing: 32,
  fontFamily: 'Georgia',
};

export default function ModernTemplate({ resumeJson }: TemplateProps) {
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
    jobTitle,
  } = resumeJson;

  const renderOrPlaceholder = (value: string, placeholder: string) =>
    value ? value : <span className="placeholder">{placeholder}</span>;

  return (
    <>
      <style>{modernCss}</style>
      <div id="resume-template" className="template-modern">
        {/* Header */}
        <header className="template-heading">
          <h1 className="template-name">
            {renderOrPlaceholder(firstName, 'FIRST NAME')}{' '}
            {renderOrPlaceholder(lastName, 'LAST NAME')}
          </h1>
          <h2 className="template-role">{renderOrPlaceholder(jobTitle, 'Job Title')}</h2>
        </header>
        <div className="template-summary">
          {professionalSummary || (
            <span className="placeholder">
              A brief summary about your professional background and core skills.
            </span>
          )}
        </div>

        <div className="template-grid">
          {/* Left Column */}
          <div className="template-sidebar">
            <section className="section">
              <h3 className="section-heading">Contact</h3>
              <ul className="contact-list">
                <li>{renderOrPlaceholder(email, 'your@email.com')}</li>
                <li>{renderOrPlaceholder(phone, '(123) 456-7890')}</li>
                <li>{renderOrPlaceholder(`${city}, ${province}`, 'City, Province')}</li>
                <li className="placeholder">LinkedIn</li>
                <li className="placeholder">Github</li>
              </ul>
            </section>

            <section className="section">
              <h3 className="section-heading">Education</h3>
              {educations.map((edu, i) => (
                <div key={i} className="section-block">
                  <div className="section-subtitle">
                    {renderOrPlaceholder(edu.degree, 'Degree')}
                  </div>
                  <div>
                    {renderOrPlaceholder(edu.schoolName, 'School')},{' '}
                    {renderOrPlaceholder(edu.schoolLocation, 'Location')}
                  </div>
                  <div>{renderOrPlaceholder(edu.graduationYear, 'Year')}</div>
                </div>
              ))}
            </section>

            <section className="section">
              <h3 className="section-heading">Skills</h3>
              <ul className="skills-list">
                {skills.length > 0 ? (
                  skills.map((skill, i) => <li key={i}>{skill}</li>)
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
                    {renderOrPlaceholder(job.startDate, 'Start')} -{' '}
                    {renderOrPlaceholder(job.endDate, 'End')} /{' '}
                    {renderOrPlaceholder(`${job.city}, ${job.province}`, 'City, Province')}
                  </div>
                  <div
                    className="section-description"
                    dangerouslySetInnerHTML={{ __html: job.achievements }}
                  />
                  {/* <ul className="description-list">
                  {job.descriptions.length > 0
                    ? job.descriptions.map((desc, j) => <li key={j}>{desc}</li>)
                    : <li className="placeholder">Add a description of your responsibilities and achievements.</li>}
                </ul> */}
                </div>
              ))}
            </section>
          </div>
        </div>
      </div>
    </>
  );
}
