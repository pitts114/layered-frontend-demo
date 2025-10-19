import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';

const meta = {
  title: 'Components/LoginForm',
  component: LoginForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onSubmit: (email, password) => {
      console.log('Login submitted:', { email, password });
      alert(`Login attempt with email: ${email}`);
    },
  },
};

export const WithError: Story = {
  args: {
    onSubmit: (email, password) => {
      console.log('Login submitted:', { email, password });
    },
    error: 'Invalid email or password. Please try again.',
  },
};

export const Loading: Story = {
  args: {
    onSubmit: (email, password) => {
      console.log('Login submitted:', { email, password });
    },
    isLoading: true,
  },
};

export const LoadingWithError: Story = {
  args: {
    onSubmit: (email, password) => {
      console.log('Login submitted:', { email, password });
    },
    error: 'Invalid email or password. Please try again.',
    isLoading: true,
  },
};
