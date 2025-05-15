'use client';
import type { Meta, StoryObj } from '@storybook/react';
// @ts-ignore
import { ModernTemplate } from '@/components/templates/modern';
import mockResumeJson from './mockResumeJson';

const meta: Meta<typeof ModernTemplate> = {
  title: 'Templates/ModernTemplate',
  component: ModernTemplate,
};

export default meta;
type Story = StoryObj<typeof ModernTemplate>;

export const FilledData: Story = {
  args: {
    resumeJson: mockResumeJson,
  },
};
