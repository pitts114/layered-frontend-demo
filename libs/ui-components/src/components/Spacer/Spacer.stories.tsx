import type { Meta, StoryObj } from '@storybook/react';
import { Spacer } from './Spacer';

const meta = {
  title: 'Layout/Spacer',
  component: Spacer,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Spacer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const VerticalSpacing: Story = {
  render: () => (
    <div>
      <div className="bg-blue-100 p-4 rounded">First Block</div>
      <Spacer size={8} />
      <div className="bg-green-100 p-4 rounded">Second Block</div>
    </div>
  ),
};

export const HorizontalSpacing: Story = {
  render: () => (
    <div className="flex">
      <div className="bg-blue-100 p-4 rounded">Left</div>
      <Spacer size={8} axis="horizontal" />
      <div className="bg-green-100 p-4 rounded">Right</div>
    </div>
  ),
};

export const SizeVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Size 2 (0.5rem)</h3>
        <div className="bg-blue-100 p-2 rounded">Block</div>
        <Spacer size={2} />
        <div className="bg-blue-100 p-2 rounded">Block</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Size 4 (1rem - default)</h3>
        <div className="bg-blue-100 p-2 rounded">Block</div>
        <Spacer size={4} />
        <div className="bg-blue-100 p-2 rounded">Block</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Size 8 (2rem)</h3>
        <div className="bg-blue-100 p-2 rounded">Block</div>
        <Spacer size={8} />
        <div className="bg-blue-100 p-2 rounded">Block</div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Size 16 (4rem)</h3>
        <div className="bg-blue-100 p-2 rounded">Block</div>
        <Spacer size={16} />
        <div className="bg-blue-100 p-2 rounded">Block</div>
      </div>
    </div>
  ),
};

export const InFlexLayout: Story = {
  render: () => (
    <div className="flex items-center">
      <button className="px-4 py-2 bg-blue-600 text-white rounded">Button 1</button>
      <Spacer size={4} axis="horizontal" />
      <button className="px-4 py-2 bg-green-600 text-white rounded">Button 2</button>
      <Spacer size={4} axis="horizontal" />
      <button className="px-4 py-2 bg-purple-600 text-white rounded">Button 3</button>
    </div>
  ),
};
