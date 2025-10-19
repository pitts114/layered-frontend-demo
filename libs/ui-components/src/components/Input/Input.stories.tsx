import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: 'Email',
    type: 'email',
    placeholder: 'Enter your email',
  },
};

export const WithValue: Story = {
  args: {
    label: 'Username',
    type: 'text',
    value: 'johndoe',
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    type: 'password',
    required: true,
    placeholder: 'Enter your password',
  },
};

export const WithError: Story = {
  args: {
    label: 'Email',
    type: 'email',
    value: 'invalid-email',
    error: 'Please enter a valid email address',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Username',
    type: 'text',
    helperText: 'Choose a unique username between 3-20 characters',
    placeholder: 'johndoe',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    type: 'text',
    value: 'Cannot edit this',
    disabled: true,
  },
};

export const NoLabel: Story = {
  args: {
    type: 'text',
    placeholder: 'Input without label',
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    required: true,
  },
};
