import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Navbar } from './Navbar';
import { ThemeToggle } from '../ThemeToggle';
import { Button } from '../Button';

const meta = {
  title: 'Components/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Navbar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    left: <div className="font-semibold text-lg">My App</div>,
    right: <div>Right content</div>,
  },
};

export const WithCenterContent: Story = {
  args: {
    left: <div className="font-semibold text-lg">My App</div>,
    center: (
      <div className="flex gap-4">
        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          Home
        </a>
        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          About
        </a>
        <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
          Contact
        </a>
      </div>
    ),
    right: <div>User menu</div>,
  },
};

export const WithThemeToggle: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false);
    return (
      <Navbar
        left={<div className="font-semibold text-lg">My App</div>}
        right={<ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />}
      />
    );
  },
};

export const WithButtons: Story = {
  args: {
    left: <div className="font-semibold text-lg">My App</div>,
    right: (
      <div className="flex gap-2">
        <Button variant="outline" size="small">
          Login
        </Button>
        <Button size="small">Sign Up</Button>
      </div>
    ),
  },
};

export const Complex: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false);
    return (
      <Navbar
        left={<div className="font-semibold text-lg text-blue-600 dark:text-blue-400">My App</div>}
        center={
          <div className="flex gap-6">
            <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Dashboard
            </a>
            <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Projects
            </a>
            <a href="#" className="text-sm text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400">
              Team
            </a>
          </div>
        }
        right={
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 dark:text-gray-400">user@example.com</span>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
          </div>
        }
      />
    );
  },
};
