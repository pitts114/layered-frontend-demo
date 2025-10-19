import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './Switch';

const meta = {
  title: 'Forms/Switch',
  component: Switch,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Switch>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { label: 'Enable notifications' },
};

export const Checked: Story = {
  args: { label: 'Enabled feature', defaultChecked: true },
};

export const WithHelperText: Story = {
  args: { label: 'Dark mode', helperText: 'Toggle dark mode theme' },
};

export const Disabled: Story = {
  args: { label: 'Disabled switch', disabled: true },
};

export const DisabledChecked: Story = {
  args: { label: 'Disabled and checked', disabled: true, defaultChecked: true },
};

export const WithoutLabel: Story = {
  args: {},
};

export const MultipleSwitches: Story = {
  render: () => (
    <div className="space-y-4">
      <Switch label="Email notifications" defaultChecked helperText="Receive emails about your account" />
      <Switch label="Push notifications" helperText="Receive push notifications on your device" />
      <Switch label="SMS notifications" defaultChecked />
      <Switch label="Marketing emails (disabled)" disabled />
    </div>
  ),
};
