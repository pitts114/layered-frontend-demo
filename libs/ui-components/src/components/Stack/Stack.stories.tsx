import type { Meta, StoryObj } from '@storybook/react';
import { Stack } from './Stack';

const meta = {
  title: 'Components/Stack',
  component: Stack,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
  argTypes: {
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
    },
    spacing: {
      control: 'select',
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16],
    },
    align: {
      control: 'select',
      options: ['start', 'center', 'end', 'stretch'],
    },
    justify: {
      control: 'select',
      options: ['start', 'center', 'end', 'between', 'around', 'evenly'],
    },
  },
} satisfies Meta<typeof Stack>;

export default meta;
type Story = StoryObj<typeof meta>;

const Box = ({ children, color = 'blue' }: { children: React.ReactNode; color?: string }) => (
  <div className={`bg-${color}-100 border-2 border-${color}-500 rounded p-4`}>{children}</div>
);

export const VerticalDefault: Story = {
  args: {
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const Horizontal: Story = {
  args: {
    direction: 'horizontal',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const NoSpacing: Story = {
  args: {
    spacing: 0,
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const LargeSpacing: Story = {
  args: {
    spacing: 12,
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const CenteredItems: Story = {
  args: {
    direction: 'horizontal',
    align: 'center',
    children: (
      <>
        <Box>Short</Box>
        <Box>
          Tall
          <br />
          Item
          <br />
          Here
        </Box>
        <Box>Short</Box>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  args: {
    direction: 'horizontal',
    justify: 'between',
    className: 'w-full',
    children: (
      <>
        <Box>Left</Box>
        <Box>Center</Box>
        <Box>Right</Box>
      </>
    ),
  },
};

export const VerticalCentered: Story = {
  args: {
    align: 'center',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Wider Item 2 with more content</Box>
        <Box>Item 3</Box>
      </>
    ),
  },
};

export const HorizontalWrapped: Story = {
  args: {
    direction: 'horizontal',
    wrap: true,
    spacing: 4,
    className: 'w-96',
    children: (
      <>
        <Box>Item 1</Box>
        <Box>Item 2</Box>
        <Box>Item 3</Box>
        <Box>Item 4</Box>
        <Box>Item 5</Box>
        <Box>Item 6</Box>
      </>
    ),
  },
};

export const MixedContent: Story = {
  args: {
    spacing: 6,
    children: (
      <>
        <div className="bg-purple-100 border-2 border-purple-500 rounded p-4">
          <h3 className="font-bold text-lg">Title</h3>
          <p className="text-gray-600">Some descriptive text here</p>
        </div>
        <div className="bg-green-100 border-2 border-green-500 rounded p-4">
          <button className="bg-green-600 text-white px-4 py-2 rounded">Action Button</button>
        </div>
        <div className="bg-yellow-100 border-2 border-yellow-500 rounded p-4">
          <span className="text-yellow-900">Status: Active</span>
        </div>
      </>
    ),
  },
};
