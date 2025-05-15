'use client';
import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { DefaultTemplate } from '@/components/templates/default';
import mockResumeJson from './mockResumeJson';

const meta: Meta<typeof DefaultTemplate> = {
  title: 'Templates/DefaultTemplate',
  component: DefaultTemplate,
};

export default meta;
type Story = StoryObj<typeof DefaultTemplate>;

export const FilledData: Story = {
  args: {
    resumeJson: mockResumeJson,
  },
};
