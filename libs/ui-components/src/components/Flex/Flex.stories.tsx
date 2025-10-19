import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';

const meta = {
  title: 'Layout/Flex',
  component: Flex,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof meta>;

const FlexItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 border border-blue-300 rounded p-4">{children}</div>
);

export const Row: Story = {
  args: {
    direction: 'row',
    gap: 4,
    children: (
      <>
        <FlexItem>Item 1</FlexItem>
        <FlexItem>Item 2</FlexItem>
        <FlexItem>Item 3</FlexItem>
      </>
    ),
  },
};

export const Column: Story = {
  args: {
    direction: 'col',
    gap: 4,
    children: (
      <>
        <FlexItem>Item 1</FlexItem>
        <FlexItem>Item 2</FlexItem>
        <FlexItem>Item 3</FlexItem>
      </>
    ),
  },
};

export const CenterBoth: Story = {
  args: {
    direction: 'row',
    align: 'center',
    justify: 'center',
    gap: 4,
    className: 'h-64 bg-gray-50',
    children: (
      <>
        <FlexItem>Centered</FlexItem>
        <FlexItem>Content</FlexItem>
      </>
    ),
  },
};

export const SpaceBetween: Story = {
  args: {
    direction: 'row',
    justify: 'between',
    align: 'center',
    className: 'w-full',
    children: (
      <>
        <FlexItem>Left</FlexItem>
        <FlexItem>Right</FlexItem>
      </>
    ),
  },
};

export const Wrap: Story = {
  args: {
    direction: 'row',
    wrap: true,
    gap: 4,
    className: 'w-64',
    children: (
      <>
        <FlexItem>Item 1</FlexItem>
        <FlexItem>Item 2</FlexItem>
        <FlexItem>Item 3</FlexItem>
        <FlexItem>Item 4</FlexItem>
        <FlexItem>Item 5</FlexItem>
      </>
    ),
  },
};

export const AlignmentVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Align Start</h3>
        <Flex align="start" gap={4} className="h-32 bg-gray-50">
          <FlexItem>Short</FlexItem>
          <FlexItem>
            Tall
            <br />
            Item
          </FlexItem>
          <FlexItem>Short</FlexItem>
        </Flex>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Align Center</h3>
        <Flex align="center" gap={4} className="h-32 bg-gray-50">
          <FlexItem>Short</FlexItem>
          <FlexItem>
            Tall
            <br />
            Item
          </FlexItem>
          <FlexItem>Short</FlexItem>
        </Flex>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Align Stretch</h3>
        <Flex align="stretch" gap={4} className="h-32 bg-gray-50">
          <FlexItem>Short</FlexItem>
          <FlexItem>Stretched</FlexItem>
          <FlexItem>Short</FlexItem>
        </Flex>
      </div>
    </div>
  ),
};
