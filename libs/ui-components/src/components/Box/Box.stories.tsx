import type { Meta, StoryObj } from '@storybook/react';
import { Box } from './Box';

const meta = {
  title: 'Layout/Box',
  component: Box,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'This is a basic box with no styling',
  },
};

export const WithPadding: Story = {
  args: {
    padding: 6,
    bg: 'gray',
    children: 'Box with padding',
  },
};

export const Card: Story = {
  args: {
    padding: 6,
    bg: 'white',
    rounded: 'lg',
    shadow: 'md',
    border: true,
    children: (
      <div>
        <h3 className="text-xl font-bold mb-2">Card Title</h3>
        <p className="text-gray-600">This box looks like a card with shadow, border, and rounded corners.</p>
      </div>
    ),
  },
};

export const WithShadow: Story = {
  render: () => (
    <div className="space-y-6">
      <Box padding={4} bg="white" shadow="sm">
        Shadow: Small
      </Box>
      <Box padding={4} bg="white" shadow="md">
        Shadow: Medium
      </Box>
      <Box padding={4} bg="white" shadow="lg">
        Shadow: Large
      </Box>
      <Box padding={4} bg="white" shadow="xl">
        Shadow: Extra Large
      </Box>
    </div>
  ),
};

export const RoundedVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Box padding={4} bg="gray" rounded="none">
        Rounded: None
      </Box>
      <Box padding={4} bg="gray" rounded="sm">
        Rounded: Small
      </Box>
      <Box padding={4} bg="gray" rounded="md">
        Rounded: Medium
      </Box>
      <Box padding={4} bg="gray" rounded="lg">
        Rounded: Large
      </Box>
      <Box padding={4} bg="gray" rounded="full" className="w-32 h-32 flex items-center justify-center">
        Full
      </Box>
    </div>
  ),
};

export const BackgroundVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Box padding={4} bg="white" border>
        Background: White
      </Box>
      <Box padding={4} bg="gray">
        Background: Gray
      </Box>
      <Box padding={4} bg="transparent" border>
        Background: Transparent
      </Box>
    </div>
  ),
};

export const AsSection: Story = {
  args: {
    as: 'section',
    padding: 8,
    bg: 'gray',
    children: 'This box renders as a <section> element',
  },
};

export const ComplexExample: Story = {
  render: () => (
    <Box padding={8} bg="white" rounded="lg" shadow="xl" border className="max-w-md">
      <h2 className="text-2xl font-bold mb-4">Profile Card</h2>
      <Box padding={4} bg="gray" rounded="md" margin={0} className="mb-4">
        <p className="text-sm text-gray-600">Name: John Doe</p>
        <p className="text-sm text-gray-600">Email: john@example.com</p>
      </Box>
      <div className="flex gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Edit</button>
        <button className="px-4 py-2 bg-gray-600 text-white rounded">Delete</button>
      </div>
    </Box>
  ),
};
