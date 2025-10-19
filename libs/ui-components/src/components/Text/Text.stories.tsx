import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Typography/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Body1: Story = {
  args: {
    children: 'This is body1 text - the default variant for regular content.',
  },
};

export const Body2: Story = {
  args: {
    variant: 'body2',
    children: 'This is body2 text - slightly smaller for secondary content.',
  },
};

export const Caption: Story = {
  args: {
    variant: 'caption',
    children: 'This is caption text - small text for captions and labels.',
  },
};

export const Overline: Story = {
  args: {
    variant: 'overline',
    children: 'This is overline text',
  },
};

export const WeightVariations: Story = {
  render: () => (
    <div className="space-y-2">
      <Text weight="normal">Normal weight text</Text>
      <Text weight="medium">Medium weight text</Text>
      <Text weight="semibold">Semibold weight text</Text>
      <Text weight="bold">Bold weight text</Text>
    </div>
  ),
};

export const ColorVariations: Story = {
  render: () => (
    <div className="space-y-2">
      <Text color="primary">Primary color text</Text>
      <Text color="secondary">Secondary color text</Text>
      <Text color="muted">Muted color text</Text>
      <Text color="error">Error color text</Text>
      <Text color="success">Success color text</Text>
      <Text color="warning">Warning color text</Text>
    </div>
  ),
};

export const AlignmentVariations: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <Text align="left">Left aligned text - this is the default alignment</Text>
      <Text align="center">Center aligned text - centered in the container</Text>
      <Text align="right">Right aligned text - aligned to the right</Text>
      <Text align="justify">
        Justified text - this longer text will be justified across the full width of the container
        when it wraps to multiple lines.
      </Text>
    </div>
  ),
};

export const AsSpan: Story = {
  args: {
    as: 'span',
    children: 'This is rendered as a span element',
  },
};
