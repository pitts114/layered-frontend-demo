import type { Meta, StoryObj } from '@storybook/react';
import { Alert } from './Alert';

const meta = {
  title: 'Feedback/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
  tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Info: Story = {
  args: { variant: 'info', children: 'This is an informational message.' },
};

export const Success: Story = {
  args: { variant: 'success', children: 'Your changes have been saved successfully!' },
};

export const Warning: Story = {
  args: { variant: 'warning', children: 'Please review your input before submitting.' },
};

export const Error: Story = {
  args: { variant: 'error', children: 'An error occurred while processing your request.' },
};

export const WithTitle: Story = {
  args: { variant: 'info', title: 'Information', children: 'This alert has a title for extra context.' },
};

export const Dismissible: Story = {
  args: {
    variant: 'success',
    title: 'Success',
    children: 'This alert can be dismissed.',
    onClose: () => alert('Alert closed'),
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Alert variant="info" title="Information">This is an info alert with a title</Alert>
      <Alert variant="success" title="Success">Operation completed successfully</Alert>
      <Alert variant="warning" title="Warning">Please be careful with this action</Alert>
      <Alert variant="error" title="Error">Something went wrong</Alert>
    </div>
  ),
};
