import type { Meta, StoryObj } from '@storybook/react';
import { Textarea } from './Textarea';

const meta = {
  title: 'Forms/Textarea',
  component: Textarea,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Message',
    placeholder: 'Type your message here...',
  },
};

export const Required: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Comments',
    helperText: 'Maximum 500 characters',
    placeholder: 'Enter your comments...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Message',
    error: 'This field is required',
    placeholder: 'Enter your message...',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Textarea',
    disabled: true,
    value: 'This textarea is disabled',
  },
};

export const ResizeOptions: Story = {
  render: () => (
    <div className="space-y-6 w-96">
      <Textarea label="Resize Vertical (default)" resize="vertical" placeholder="Resize vertically" rows={3} />
      <Textarea label="Resize None" resize="none" placeholder="Cannot resize" rows={3} />
      <Textarea label="Resize Both" resize="both" placeholder="Resize both directions" rows={3} />
    </div>
  ),
};

export const WithRows: Story = {
  args: {
    label: 'Large Textarea',
    rows: 6,
    placeholder: 'Enter a longer message...',
  },
};
