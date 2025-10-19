import type { Meta, StoryObj } from '@storybook/react';
import { Container } from './Container';

const meta = {
  title: 'Components/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl', 'full'],
    },
    padding: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg'],
    },
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoContent = () => (
  <div className="bg-blue-100 border-2 border-blue-500 rounded p-4">
    <h2 className="text-xl font-bold text-blue-900 mb-2">Container Content</h2>
    <p className="text-blue-700">
      This is demo content inside the container. The container controls max-width, padding, and
      centering.
    </p>
  </div>
);

export const Default: Story = {
  args: {
    children: <DemoContent />,
  },
};

export const Small: Story = {
  args: {
    maxWidth: 'sm',
    children: <DemoContent />,
  },
};

export const Medium: Story = {
  args: {
    maxWidth: 'md',
    children: <DemoContent />,
  },
};

export const Large: Story = {
  args: {
    maxWidth: 'lg',
    children: <DemoContent />,
  },
};

export const ExtraLarge: Story = {
  args: {
    maxWidth: 'xl',
    children: <DemoContent />,
  },
};

export const FullWidth: Story = {
  args: {
    maxWidth: 'full',
    children: <DemoContent />,
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    children: <DemoContent />,
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'sm',
    children: <DemoContent />,
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'lg',
    children: <DemoContent />,
  },
};

export const NotCentered: Story = {
  args: {
    centered: false,
    children: <DemoContent />,
  },
};

export const WithMultipleElements: Story = {
  args: {
    children: (
      <>
        <DemoContent />
        <div className="mt-4">
          <DemoContent />
        </div>
        <div className="mt-4">
          <DemoContent />
        </div>
      </>
    ),
  },
};
