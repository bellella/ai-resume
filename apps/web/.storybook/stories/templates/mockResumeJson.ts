import { ResumeJson } from '@ai-resume/types';

const mockResumeJson: ResumeJson = {
  firstName: 'John',
  lastName: 'Doe',
  profileImage: '/images/user-profile.png',
  jobTitle: 'Full Stack Developer',
  email: 'john.doe@example.com',
  phone: '+1 123-456-7890',
  city: 'Toronto',
  province: 'Ontario',
  postalCode: 'M4B 1B3',
  professionalSummary:
    '<p>Versatile and results-driven Full Stack Developer with 5+ years of experience building scalable web applications using modern frameworks like React, Next.js, and Node.js. Proven track record of delivering end-to-end solutions from front-end design to backend architecture in agile environments.</p>',
  skills: [
    { name: 'JavaScript', level: 'Expert' },
    { name: 'TypeScript', level: 'Advanced' },
    { name: 'React', level: 'Expert' },
    { name: 'Next.js', level: 'Advanced' },
    { name: 'Node.js', level: 'Advanced' },
    { name: 'Express.js', level: 'Intermediate' },
    { name: 'PostgreSQL', level: 'Intermediate' },
    { name: 'MongoDB', level: 'Intermediate' },
    { name: 'Docker', level: 'Beginner' },
    { name: 'Tailwind CSS', level: 'Advanced' },
    { name: 'AWS (EC2, S3)', level: 'Intermediate' },
    { name: 'Git', level: 'Advanced' },
    { name: 'Jest', level: 'Intermediate' },
  ],
  languages: [
    { name: 'English', level: 'Native' },
    { name: 'French', level: 'Intermediate' },
  ],
  links: [
    { name: 'GitHub', url: 'https://github.com/johndoe' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/johndoe' },
    { name: 'Portfolio', url: 'https://johndoe.dev' },
  ],
  workExperiences: [
    {
      jobTitle: 'Full Stack Developer',
      companyName: 'InnovateX Solutions',
      city: 'Toronto',
      province: 'Ontario',
      startYearMonth: { year: 2022, month: 1 },
      endYearMonth: { year: 2024, month: 5 },
      isCurrent: false,
      achievements:
        '<ul>' +
        '<li>Led the migration of legacy PHP systems to a modern React + Node.js stack, increasing dev velocity by 40%.</li>' +
        '<li>Implemented CI/CD pipelines with GitHub Actions and Docker for streamlined deployments.</li>' +
        '<li>Designed RESTful APIs and integrated 3rd-party services (Stripe, SendGrid).</li>' +
        '</ul>',
    },
    {
      jobTitle: 'Frontend Developer',
      companyName: 'BrightTech Ltd.',
      city: 'Vancouver',
      province: 'British Columbia',
      startYearMonth: { year: 2020, month: 4 },
      endYearMonth: { year: 2021, month: 12 },
      isCurrent: false,
      achievements:
        '<ul>' +
        '<li>Developed reusable UI components with React and Tailwind CSS in a design system context.</li>' +
        '<li>Worked closely with designers and backend engineers to deliver pixel-perfect, high-performance UIs.</li>' +
        '<li>Improved Lighthouse performance scores from 60 to 90+ across key pages.</li>' +
        '</ul>',
    },
  ],
  educations: [
    {
      degree: 'Bachelor of Science',
      fieldOfStudy: 'Computer Science',
      schoolName: 'University of Waterloo',
      schoolLocation: 'Waterloo, ON',
      graduationYearMonth: { year: 2019, month: 6 },
      isCurrent: false,
    },
  ],
};

export default mockResumeJson;
