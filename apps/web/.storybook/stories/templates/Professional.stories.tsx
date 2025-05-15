'use client';
import type { Meta, StoryObj } from '@storybook/react';
import mockResumeJson from './mockResumeJson';
// @ts-ignore
import ProfessionalTemplate from '@/components/templates/professional';

const meta: Meta<typeof ProfessionalTemplate> = {
  title: 'Templates/ProfessionalTemplate',
  component: ProfessionalTemplate,
};

export default meta;
type Story = StoryObj<typeof ProfessionalTemplate>;

export const FilledData: Story = {
  args: {
    resumeJson: mockResumeJson,
  },
};
