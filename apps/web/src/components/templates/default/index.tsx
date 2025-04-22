import React from 'react';
import { TemplateProps } from '@/types/template.type';
import { StyleVars } from '../templates';
import './style.css';

export const styleVars: StyleVars = {
  color: 'black',
  fontSize: 14,
  sectionSpacing: 32,
  fontFamily: 'Arial',
};

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

  const renderOrPlaceholder = (value: string, placeholder: string) =>
    value ? value : <span className="placeholder">{placeholder}</span>;

  return (
    <div id="resume-template" className="default-template">
      {/* Header */}
      <header className="header">
        <h1 className="name">
          {renderOrPlaceholder(firstName, 'First Name')}{' '}
          {renderOrPlaceholder(lastName, 'Last Name')}
        </h1>
        <p>
          {renderOrPlaceholder(email, 'youremail@mail.com')} |{' '}
          {renderOrPlaceholder(phone, 'Phone Number')}
        </p>
        <p>
          {renderOrPlaceholder(city, 'City')}, {renderOrPlaceholder(province, 'Province')}{' '}
          {renderOrPlaceholder(postalCode, 'Postal Code')}
        </p>
      </header>

      {/* Professional Summary */}
      <section className="section">
        <h2 className="section-title">Professional Summary</h2>
        <p className="section-text">
          {professionalSummary || (
            <span className="placeholder">
              A brief summary about your professional background and core skills.
            </span>
          )}
        </p>
      </section>

      {/* Skills */}
      <section className="section">
        <h2 className="section-title">Skills</h2>
        {skills && skills.length > 0 ? (
          <ul className="skills-list">
            {skills.map((skill, i) => (
              <li key={i}>{skill}</li>
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
          {workExperiences && workExperiences.length > 0 ? (
            workExperiences.map((job, i) => (
              <div key={i}>
                <div className="item-title">
                  {renderOrPlaceholder(job.jobTitle, 'Your Position Title')} at{' '}
                  {renderOrPlaceholder(job.employer, 'Company')}
                </div>
                <div className="item-sub">
                  {renderOrPlaceholder(job.city, 'City')},{' '}
                  {renderOrPlaceholder(job.province, 'Province')} |{' '}
                  {renderOrPlaceholder(job.startDate, 'Start')} -{' '}
                  {renderOrPlaceholder(job.endDate, 'End')}
                </div>
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
          {educations && educations.length > 0 ? (
            educations.map((edu, i) => (
              <div key={i}>
                <div className="item-title">
                  {renderOrPlaceholder(edu.degree, 'Degree')} in{' '}
                  {renderOrPlaceholder(edu.fieldOfStudy, 'Field of Study')}
                </div>
                <div className="item-sub">
                  {renderOrPlaceholder(edu.schoolName, 'School Name')},{' '}
                  {renderOrPlaceholder(edu.schoolLocation, 'Location')} |{' '}
                  {renderOrPlaceholder(edu.graduationMonth, 'Month')}{' '}
                  {renderOrPlaceholder(edu.graduationYear, 'Year')}
                </div>
              </div>
            ))
          ) : (
            <p className="placeholder">Add your education details here.</p>
          )}
        </div>
      </section>
    </div>
  );
}
