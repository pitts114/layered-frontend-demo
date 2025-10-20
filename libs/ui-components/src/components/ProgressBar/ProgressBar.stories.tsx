import type { Meta, StoryObj } from '@storybook/react';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Feedback/ProgressBar',
  component: ProgressBar,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { value: 50 } };
export const WithLabel: Story = { args: { value: 75, showLabel: true } };
export const Success: Story = { args: { value: 100, variant: 'success', showLabel: true } };
export const Warning: Story = { args: { value: 60, variant: 'warning' } };
export const Error: Story = { args: { value: 20, variant: 'error' } };

export const Sizes: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <div>
        <p className="text-sm mb-1">Small</p>
        <ProgressBar value={60} size="sm" />
      </div>
      <div>
        <p className="text-sm mb-1">Medium</p>
        <ProgressBar value={60} size="md" />
      </div>
      <div>
        <p className="text-sm mb-1">Large</p>
        <ProgressBar value={60} size="lg" />
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <ProgressBar value={75} variant="primary" showLabel />
      <ProgressBar value={90} variant="success" showLabel />
      <ProgressBar value={50} variant="warning" showLabel />
      <ProgressBar value={25} variant="error" showLabel />
    </div>
  ),
};
