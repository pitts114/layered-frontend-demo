import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './Flex';
import { FlexItem } from './FlexItem';

const meta = {
  title: 'Layout/FlexItem',
  component: FlexItem,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof FlexItem>;

export default meta;
type Story = StoryObj<typeof meta>;

const DemoBox = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`bg-blue-100 border border-blue-300 rounded p-4 ${className}`}>{children}</div>
);

export const Flex1: Story = {
  render: () => (
    <Flex gap={4} className="bg-gray-50 p-4">
      <FlexItem flex="1">
        <DemoBox>Flex 1 (grows and shrinks)</DemoBox>
      </FlexItem>
      <FlexItem flex="1">
        <DemoBox>Flex 1 (grows and shrinks)</DemoBox>
      </FlexItem>
      <FlexItem flex="1">
        <DemoBox>Flex 1 (grows and shrinks)</DemoBox>
      </FlexItem>
    </Flex>
  ),
};

export const FlexAuto: Story = {
  render: () => (
    <Flex gap={4} className="bg-gray-50 p-4">
      <FlexItem flex="auto">
        <DemoBox>Flex auto (grows and shrinks based on content)</DemoBox>
      </FlexItem>
      <FlexItem flex="auto">
        <DemoBox>Short</DemoBox>
      </FlexItem>
      <FlexItem flex="auto">
        <DemoBox>Medium text</DemoBox>
      </FlexItem>
    </Flex>
  ),
};

export const FlexNone: Story = {
  render: () => (
    <Flex gap={4} className="bg-gray-50 p-4">
      <FlexItem flex="1">
        <DemoBox>Flex 1 (fills available space)</DemoBox>
      </FlexItem>
      <FlexItem flex="none">
        <DemoBox>Flex none (fixed size)</DemoBox>
      </FlexItem>
      <FlexItem flex="1">
        <DemoBox>Flex 1 (fills available space)</DemoBox>
      </FlexItem>
    </Flex>
  ),
};

export const GrowVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">With Grow</h3>
        <Flex gap={4} className="bg-gray-50 p-4">
          <FlexItem grow>
            <DemoBox>Grows to fill space</DemoBox>
          </FlexItem>
          <FlexItem>
            <DemoBox>Fixed size</DemoBox>
          </FlexItem>
          <FlexItem>
            <DemoBox>Fixed size</DemoBox>
          </FlexItem>
        </Flex>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Multiple Grow</h3>
        <Flex gap={4} className="bg-gray-50 p-4">
          <FlexItem grow>
            <DemoBox>Grows</DemoBox>
          </FlexItem>
          <FlexItem grow>
            <DemoBox>Grows</DemoBox>
          </FlexItem>
          <FlexItem>
            <DemoBox>Fixed</DemoBox>
          </FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

export const ShrinkVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">All Shrink (Default)</h3>
        <Flex gap={4} className="bg-gray-50 p-4 w-96">
          <FlexItem>
            <DemoBox>This is a very long text that will shrink</DemoBox>
          </FlexItem>
          <FlexItem>
            <DemoBox>This is another long text that will shrink</DemoBox>
          </FlexItem>
        </Flex>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">No Shrink on First</h3>
        <Flex gap={4} className="bg-gray-50 p-4 w-96">
          <FlexItem shrink={false}>
            <DemoBox>Won't shrink</DemoBox>
          </FlexItem>
          <FlexItem>
            <DemoBox>This will shrink to accommodate the first item</DemoBox>
          </FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

export const BasisVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Basis Full</h3>
        <Flex wrap gap={4} className="bg-gray-50 p-4">
          <FlexItem basis="full">
            <DemoBox>Takes full width, forces wrap</DemoBox>
          </FlexItem>
          <FlexItem basis="1/2">
            <DemoBox>Basis 1/2</DemoBox>
          </FlexItem>
          <FlexItem basis="1/2">
            <DemoBox>Basis 1/2</DemoBox>
          </FlexItem>
        </Flex>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Basis Fractions</h3>
        <Flex gap={4} className="bg-gray-50 p-4">
          <FlexItem basis="1/4">
            <DemoBox>1/4</DemoBox>
          </FlexItem>
          <FlexItem basis="3/4">
            <DemoBox>3/4</DemoBox>
          </FlexItem>
        </Flex>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Thirds</h3>
        <Flex gap={4} className="bg-gray-50 p-4">
          <FlexItem basis="1/3">
            <DemoBox>1/3</DemoBox>
          </FlexItem>
          <FlexItem basis="2/3">
            <DemoBox>2/3</DemoBox>
          </FlexItem>
        </Flex>
      </div>
    </div>
  ),
};

export const CombinedProperties: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2">Basis + Grow</h3>
        <Flex gap={4} className="bg-gray-50 p-4">
          <FlexItem basis="1/4" grow>
            <DemoBox>Starts at 1/4, can grow</DemoBox>
          </FlexItem>
          <FlexItem basis="1/4">
            <DemoBox>Fixed at 1/4</DemoBox>
          </FlexItem>
          <FlexItem basis="1/4">
            <DemoBox>Fixed at 1/4</DemoBox>
          </FlexItem>
        </Flex>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Basis + No Shrink</h3>
        <Flex gap={4} className="bg-gray-50 p-4 w-96">
          <FlexItem basis="1/2" shrink={false}>
            <DemoBox>Always 1/2, won't shrink</DemoBox>
          </FlexItem>
          <FlexItem basis="1/2">
            <DemoBox>Can shrink if needed</DemoBox>
          </FlexItem>
        </Flex>
      </div>
    </div>
  ),
};
