'use client';
import type { Meta, StoryObj } from '@storybook/react';
import mockResumeJson from './mockResumeJson';
// @ts-ignore
import { CreativeTemplate } from '@/components/templates/creative';

const meta: Meta<typeof CreativeTemplate> = {
  title: 'Templates/CreativeTemplate',
  component: CreativeTemplate,
};

export default meta;
type Story = StoryObj<typeof CreativeTemplate>;

export const FilledData: Story = {
  args: {
    resumeJson: mockResumeJson,
  },
};
