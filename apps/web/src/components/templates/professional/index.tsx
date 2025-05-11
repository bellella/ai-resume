import React from 'react';
import { TemplateProps } from '@/types/template.type';
import { TemplateOptions } from '../templates';
import professionalCss from '!!raw-loader!@/components/templates/professional/style.css';

export const templateOptions: TemplateOptions = {
  color: 'black',
  fontSize: 14,
  sectionSpacing: 18,
  fontFamily: 'Arial',
};

export default function ProfessionalTemplate({ resumeJson }: TemplateProps) {
  const {
    firstName,
    lastName,
    email,
    phone,
    city,
    province,
    profileImage,
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
      <style>{professionalCss}</style>
      <div id="resume-template" className="professional-template">
        <div className="left-column">
          <div
            className="profile-pic"
            style={{ backgroundImage: `url(${profileImage || '/placeholder.svg'})` }}
          />
          <div className="contact-section">
            <div>{renderOrPlaceholder(email, 'youremail@mail.com')}</div>
            <div>{renderOrPlaceholder(phone, '+00 0 0000 0000')}</div>
            <div>
              {renderOrPlaceholder(city, 'City')}, {renderOrPlaceholder(province, 'Province')}
            </div>
          </div>

          <div className="subsection">
            <h3>Tools & Technologies</h3>
            <ul className="skills-list">
              {skills.length > 0 ? (
                skills.map((skill, i) => <li key={i}>{skill}</li>)
              ) : (
                <li className="placeholder">Add your skills here</li>
              )}
            </ul>
          </div>
        </div>

        <div className="right-column">
          <h1 className="name">
            {renderOrPlaceholder(firstName, 'Your')} {renderOrPlaceholder(lastName, 'Name')}
          </h1>
          <p className="position">{renderOrPlaceholder(jobTitle, 'Job Title')}</p>

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

          <section className="section">
            <h2 className="section-title">Experience</h2>
            <div className="section-group">
              {workExperiences.map((job, i) => (
                <div key={i}>
                  <div className="item-title">{renderOrPlaceholder(job.jobTitle, 'Role')}</div>
                  <div className="item-sub">
                    {renderOrPlaceholder(job.companyName, 'Company')} —{' '}
                    {renderOrPlaceholder(job.startDate, 'Start')} -{' '}
                    {renderOrPlaceholder(job.endDate, 'End')},{' '}
                    {renderOrPlaceholder(job.city, 'City')}
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
                    {renderOrPlaceholder(edu.graduationMonth, 'Month')}{' '}
                    {renderOrPlaceholder(edu.graduationYear, 'Year')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
