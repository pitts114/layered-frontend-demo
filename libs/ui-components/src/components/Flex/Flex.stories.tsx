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

const DemoItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 border border-blue-300 rounded p-4">{children}</div>
);

export const Row: Story = {
  args: {
    direction: 'row',
    gap: 4,
    children: (
      <>
        <DemoItem>Item 1</DemoItem>
        <DemoItem>Item 2</DemoItem>
        <DemoItem>Item 3</DemoItem>
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
        <DemoItem>Item 1</DemoItem>
        <DemoItem>Item 2</DemoItem>
        <DemoItem>Item 3</DemoItem>
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
        <DemoItem>Centered</DemoItem>
        <DemoItem>Content</DemoItem>
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
        <DemoItem>Left</DemoItem>
        <DemoItem>Right</DemoItem>
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
        <DemoItem>Item 1</DemoItem>
        <DemoItem>Item 2</DemoItem>
        <DemoItem>Item 3</DemoItem>
        <DemoItem>Item 4</DemoItem>
        <DemoItem>Item 5</DemoItem>
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
          <DemoItem>Short</DemoItem>
          <DemoItem>
            Tall
            <br />
            Item
          </DemoItem>
          <DemoItem>Short</DemoItem>
        </Flex>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Align Center</h3>
        <Flex align="center" gap={4} className="h-32 bg-gray-50">
          <DemoItem>Short</DemoItem>
          <DemoItem>
            Tall
            <br />
            Item
          </DemoItem>
          <DemoItem>Short</DemoItem>
        </Flex>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Align Stretch</h3>
        <Flex align="stretch" gap={4} className="h-32 bg-gray-50">
          <DemoItem>Short</DemoItem>
          <DemoItem>Stretched</DemoItem>
          <DemoItem>Short</DemoItem>
        </Flex>
      </div>
    </div>
  ),
};
