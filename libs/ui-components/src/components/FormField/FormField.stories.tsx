import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

const meta = {
  title: 'Forms/FormField',
  component: FormField,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithInput: Story = {
  args: {
    label: 'Email',
    required: true,
    children: <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Password',
    error: 'Password must be at least 8 characters',
    children: (
      <input type="password" className="w-full px-3 py-2 border border-red-300 rounded-md" />
    ),
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    helperText: 'Choose a unique username',
    children: <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md" />,
  },
};
