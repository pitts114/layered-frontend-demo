import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';

const meta = { title: 'Data Display/Card', component: Card, parameters: { layout: 'padded' }, tags: ['autodocs'] } satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: <div><h3 className="text-xl font-bold mb-2">Card Title</h3><p className="text-gray-600">Card content goes here.</p></div> },
};

export const WithBorder: Story = {
  args: { border: true, children: <p>Card with border</p> },
};

export const Paddings: Story = {
  render: () => (
    <div className="space-y-4">
      <Card padding="sm" border><p>Small padding</p></Card>
      <Card padding="md" border><p>Medium padding</p></Card>
      <Card padding="lg" border><p>Large padding</p></Card>
    </div>
  ),
};
