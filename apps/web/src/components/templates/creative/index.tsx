import React from 'react';
import { TemplateProps } from '@/types/template.type';
import { StyleVars } from '../templates';
import './style.css';

export const styleVars: StyleVars = {
  color: 'blue',
  fontSize: 14,
  sectionSpacing: 32,
  fontFamily: 'Arial',
};

export default function CreativeTemplate({ data }: TemplateProps) {
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
        </section>

        <section>
          <div className="heading">Education</div>
          {educations.length > 0 ? (
            educations.map((edu, i) => (
              <div key={i} className="item">
                <div>
                  {renderOrPlaceholder(edu.graduationYear, 'Year')} -{' '}
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
                <li key={i}>{skill}</li>
              ))}
            </ul>
          ) : (
            <div className="placeholder">List your skills here</div>
          )}
        </section>

        <section>
          <div className="heading">Languages</div>
          <div className="placeholder">Add languages here</div>
        </section>
      </div>

      {/* Right column */}
      <div className="right">
        <header className="header">
          <h1>
            {renderOrPlaceholder(firstName, 'First Name')}{' '}
            {renderOrPlaceholder(lastName, 'Last Name')}
          </h1>
          <h2>Marketing Manager</h2>
        </header>

        <section className="summary">
          <div className="heading">Profile Summary</div>
          <p>
            {professionalSummary || (
              <span className="placeholder">Write a professional summary here.</span>
            )}
          </p>
        </section>

        <section className="work">
          <div className="heading">Work Experience</div>
          {workExperiences.length > 0 ? (
            workExperiences.map((job, i) => (
              <div key={i} className="item">
                <div>
                  {renderOrPlaceholder(job.employer, 'Company')} –{' '}
                  {renderOrPlaceholder(job.jobTitle, 'Title')}
                </div>
                <div className="meta">
                  {renderOrPlaceholder(job.startDate, 'Start')} –{' '}
                  {renderOrPlaceholder(job.endDate, 'End')}
                </div>
                <div className="item-description">
                  {job.achievements.split('\n').map((line, i) => (
                    <p key={i}>{line}</p>
                  ))}
                </div>
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
