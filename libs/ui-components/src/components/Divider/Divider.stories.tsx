import type { Meta, StoryObj } from '@storybook/react';
import { Divider } from './Divider';

const meta = {
  title: 'Layout/Divider',
  component: Divider,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};

export const HorizontalWithContent: Story = {
  render: () => (
    <div>
      <p className="text-gray-700">Content above the divider</p>
      <Divider />
      <p className="text-gray-700">Content below the divider</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-20 items-center">
      <span className="text-gray-700">Left</span>
      <Divider orientation="vertical" />
      <span className="text-gray-700">Middle</span>
      <Divider orientation="vertical" />
      <span className="text-gray-700">Right</span>
    </div>
  ),
};

export const SpacingVariations: Story = {
  render: () => (
    <div>
      <p className="text-gray-700">Spacing: None</p>
      <Divider spacing="none" />
      <p className="text-gray-700">Spacing: Small</p>
      <Divider spacing="sm" />
      <p className="text-gray-700">Spacing: Medium (default)</p>
      <Divider spacing="md" />
      <p className="text-gray-700">Spacing: Large</p>
      <Divider spacing="lg" />
      <p className="text-gray-700">End</p>
    </div>
  ),
};

export const InCard: Story = {
  render: () => (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md">
      <h3 className="text-xl font-bold text-gray-800">Card Title</h3>
      <Divider spacing="sm" />
      <p className="text-gray-600">
        This is some content in a card, separated by a divider from the title.
      </p>
      <Divider spacing="sm" />
      <div className="flex justify-end">
        <button className="px-4 py-2 bg-blue-600 text-white rounded">Action</button>
      </div>
    </div>
  ),
};
