import type { Meta, StoryObj } from '@storybook/react';
import { Toast } from './Toast';

const meta = {
  title: 'Feedback/Toast',
  component: Toast,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Toast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = { args: { variant: 'info', title: 'Info', children: 'This is an info toast.' } };
export const Success: Story = { args: { variant: 'success', title: 'Success', children: 'Operation completed!' } };
export const Warning: Story = { args: { variant: 'warning', title: 'Warning', children: 'Please be careful.' } };
export const Error: Story = { args: { variant: 'error', title: 'Error', children: 'Something went wrong.' } };

export const Dismissible: Story = {
  args: { variant: 'success', children: 'This toast can be dismissed.', onClose: () => alert('Closed') },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-3 w-80">
      <Toast variant="info" title="Information">New updates available</Toast>
      <Toast variant="success" title="Success">Changes saved</Toast>
      <Toast variant="warning" title="Warning">Low storage space</Toast>
      <Toast variant="error" title="Error">Failed to load</Toast>
    </div>
  ),
};
