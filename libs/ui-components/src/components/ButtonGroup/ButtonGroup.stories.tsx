import type { Meta, StoryObj } from '@storybook/react';
import { ButtonGroup } from './ButtonGroup';
import { Button } from '../Button';

const meta = {
  title: 'Interactive/ButtonGroup',
  component: ButtonGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof ButtonGroup>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    children: (
      <>
        <Button>Left</Button>
        <Button>Middle</Button>
        <Button>Right</Button>
      </>
    ),
  },
};

export const Vertical: Story = {
  args: {
    orientation: 'vertical',
    children: (
      <>
        <Button>Top</Button>
        <Button>Middle</Button>
        <Button>Bottom</Button>
      </>
    ),
  },
};
