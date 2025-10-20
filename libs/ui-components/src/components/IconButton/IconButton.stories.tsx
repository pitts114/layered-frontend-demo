import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from './IconButton';

const meta = {
  title: 'Interactive/IconButton',
  component: IconButton,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof IconButton>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = { args: { children: '✕' } };
export const Primary: Story = { args: { variant: 'primary', children: '✓' } };
export const Danger: Story = { args: { variant: 'danger', children: '🗑' } };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <IconButton size="sm">✕</IconButton>
      <IconButton size="md">✕</IconButton>
      <IconButton size="lg">✕</IconButton>
    </div>
  ),
};
