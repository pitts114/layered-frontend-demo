import type { Meta, StoryObj } from '@storybook/react';
import { Skeleton } from './Skeleton';

const meta = {
  title: 'Feedback/Skeleton',
  component: Skeleton,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = { args: { variant: 'text' } };
export const Circular: Story = { args: { variant: 'circular' } };
export const Rectangular: Story = { args: { variant: 'rectangular', height: 200 } };

export const CardLoading: Story = {
  render: () => (
    <div className="w-80 p-6 bg-white rounded-lg shadow-md space-y-4">
      <Skeleton variant="circular" width={64} height={64} />
      <Skeleton variant="text" height={24} />
      <Skeleton variant="text" width="80%" />
      <Skeleton variant="text" width="60%" />
      <Skeleton variant="rectangular" height={100} className="mt-4" />
    </div>
  ),
};

export const ListLoading: Story = {
  render: () => (
    <div className="w-96 space-y-3">
      {[1, 2, 3].map(i => (
        <div key={i} className="flex gap-3 items-center">
          <Skeleton variant="circular" width={40} height={40} />
          <div className="flex-1 space-y-2">
            <Skeleton variant="text" width="70%" />
            <Skeleton variant="text" width="40%" />
          </div>
        </div>
      ))}
    </div>
  ),
};
