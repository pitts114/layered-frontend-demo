import type { Meta, StoryObj } from '@storybook/react';
import { Radio } from './Radio';

const meta = {
  title: 'Forms/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Option',
    name: 'example',
  },
};

export const Checked: Story = {
  args: {
    label: 'Selected option',
    name: 'example',
    defaultChecked: true,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Premium Plan',
    helperText: '$29/month with unlimited features',
    name: 'plan',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled option',
    disabled: true,
    name: 'example',
  },
};

export const RadioGroup: Story = {
  render: () => (
    <div className="space-y-3">
      <Radio name="size" label="Small" defaultChecked />
      <Radio name="size" label="Medium" />
      <Radio name="size" label="Large" />
      <Radio name="size" label="Extra Large (disabled)" disabled />
    </div>
  ),
};

export const WithHelperTexts: Story = {
  render: () => (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Choose a plan</h3>
      <Radio
        name="plan"
        label="Free"
        helperText="Basic features, limited to 5 projects"
        defaultChecked
      />
      <Radio name="plan" label="Pro" helperText="All features, unlimited projects - $19/month" />
      <Radio name="plan" label="Enterprise" helperText="Custom solutions with dedicated support" />
    </div>
  ),
};
