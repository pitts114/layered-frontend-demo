import type { Meta, StoryObj } from '@storybook/react';
import { Label } from './Label';

const meta = {
  title: 'Forms/Label',
  component: Label,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: 'Email Address', htmlFor: 'email' },
};

export const Required: Story = {
  args: { children: 'Password', required: true, htmlFor: 'password' },
};

export const WithInput: Story = {
  render: () => (
    <div className="w-64">
      <Label htmlFor="name" required>
        Full Name
      </Label>
      <input id="name" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />
    </div>
  ),
};
