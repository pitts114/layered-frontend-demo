import type { Meta, StoryObj } from '@storybook/react';
import { Avatar } from './Avatar';

const meta = {
  title: 'Data Display/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  args: { src: 'https://i.pravatar.cc/150?img=1', alt: 'John Doe' },
};
export const Fallback: Story = { args: { alt: 'John Doe' } };
export const CustomFallback: Story = { args: { fallback: 'JD' } };
export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar size="sm" alt="Small" />
      <Avatar size="md" alt="Medium" />
      <Avatar size="lg" alt="Large" />
      <Avatar size="xl" alt="Extra Large" />
    </div>
  ),
};
