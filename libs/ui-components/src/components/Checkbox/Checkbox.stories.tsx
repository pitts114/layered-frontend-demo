import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Forms/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Accept terms and conditions',
  },
};

export const Checked: Story = {
  args: {
    label: 'Checked checkbox',
    defaultChecked: true,
  },
};

export const WithoutLabel: Story = {
  args: {},
};

export const WithHelperText: Story = {
  args: {
    label: 'Subscribe to newsletter',
    helperText: 'You can unsubscribe at any time',
  },
};

export const WithError: Story = {
  args: {
    label: 'I agree to the terms',
    error: 'You must accept the terms to continue',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled and checked',
    disabled: true,
    defaultChecked: true,
  },
};

export const MultipleCheckboxes: Story = {
  render: () => (
    <div className="space-y-3">
      <Checkbox label="Option 1" defaultChecked />
      <Checkbox label="Option 2" />
      <Checkbox label="Option 3" defaultChecked />
      <Checkbox label="Option 4 (disabled)" disabled />
    </div>
  ),
};

export const InForm: Story = {
  render: () => (
    <form className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-md">
      <h3 className="text-lg font-semibold mb-4">Preferences</h3>
      <Checkbox label="Email notifications" defaultChecked helperText="Receive updates via email" />
      <Checkbox label="SMS notifications" helperText="Receive updates via text message" />
      <Checkbox label="Push notifications" defaultChecked />
      <div className="pt-4">
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
          Save Preferences
        </button>
      </div>
    </form>
  ),
};
