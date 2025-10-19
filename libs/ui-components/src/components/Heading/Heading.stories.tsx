import type { Meta, StoryObj } from '@storybook/react';
import { Heading } from './Heading';

const meta = {
  title: 'Typography/Heading',
  component: Heading,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const H1: Story = {
  args: {
    level: 1,
    children: 'Heading Level 1',
  },
};

export const H2: Story = {
  args: {
    level: 2,
    children: 'Heading Level 2',
  },
};

export const H3: Story = {
  args: {
    level: 3,
    children: 'Heading Level 3',
  },
};

export const H4: Story = {
  args: {
    level: 4,
    children: 'Heading Level 4',
  },
};

export const H5: Story = {
  args: {
    level: 5,
    children: 'Heading Level 5',
  },
};

export const H6: Story = {
  args: {
    level: 6,
    children: 'Heading Level 6',
  },
};

export const AllLevels: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1}>Heading Level 1</Heading>
      <Heading level={2}>Heading Level 2</Heading>
      <Heading level={3}>Heading Level 3</Heading>
      <Heading level={4}>Heading Level 4</Heading>
      <Heading level={5}>Heading Level 5</Heading>
      <Heading level={6}>Heading Level 6</Heading>
    </div>
  ),
};

export const WeightVariations: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={2} weight="normal">
        Normal Weight Heading
      </Heading>
      <Heading level={2} weight="medium">
        Medium Weight Heading
      </Heading>
      <Heading level={2} weight="semibold">
        Semibold Weight Heading
      </Heading>
      <Heading level={2} weight="bold">
        Bold Weight Heading
      </Heading>
    </div>
  ),
};

export const AlignmentVariations: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Heading level={3} align="left">
        Left Aligned Heading
      </Heading>
      <Heading level={3} align="center">
        Center Aligned Heading
      </Heading>
      <Heading level={3} align="right">
        Right Aligned Heading
      </Heading>
    </div>
  ),
};

export const Centered: Story = {
  args: {
    level: 1,
    align: 'center',
    children: 'Centered Page Title',
  },
};
