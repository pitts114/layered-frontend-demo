import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const meta = {
  title: 'Components/ThemeToggle',
  component: ThemeToggle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ThemeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LightMode: Story = {
  args: {
    isDark: false,
    onToggle: () => {},
  },
};

export const DarkMode: Story = {
  args: {
    isDark: true,
    onToggle: () => {},
  },
};

export const Interactive: Story = {
  render: () => {
    const [isDark, setIsDark] = useState(false);
    return (
      <div>
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        <p style={{ marginTop: '1rem', fontSize: '0.875rem' }}>
          Current mode: {isDark ? 'Dark' : 'Light'}
        </p>
      </div>
    );
  },
};
