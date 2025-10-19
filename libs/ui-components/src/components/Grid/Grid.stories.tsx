import type { Meta, StoryObj } from '@storybook/react';
import { Grid } from './Grid';

const meta = {
  title: 'Layout/Grid',
  component: Grid,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof meta>;

const GridItem = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-blue-100 border border-blue-300 rounded p-4 text-center">{children}</div>
);

export const TwoColumns: Story = {
  args: {
    cols: 2,
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
      </>
    ),
  },
};

export const ThreeColumns: Story = {
  args: {
    cols: 3,
    children: (
      <>
        <GridItem>Item 1</GridItem>
        <GridItem>Item 2</GridItem>
        <GridItem>Item 3</GridItem>
        <GridItem>Item 4</GridItem>
        <GridItem>Item 5</GridItem>
        <GridItem>Item 6</GridItem>
      </>
    ),
  },
};

export const FourColumns: Story = {
  args: {
    cols: 4,
    gap: 6,
    children: (
      <>
        <GridItem>1</GridItem>
        <GridItem>2</GridItem>
        <GridItem>3</GridItem>
        <GridItem>4</GridItem>
        <GridItem>5</GridItem>
        <GridItem>6</GridItem>
        <GridItem>7</GridItem>
        <GridItem>8</GridItem>
      </>
    ),
  },
};

export const GapVariations: Story = {
  render: () => (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-2">Gap 0</h3>
        <Grid cols={3} gap={0}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Gap 2</h3>
        <Grid cols={3} gap={2}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">Gap 8</h3>
        <Grid cols={3} gap={8}>
          <GridItem>1</GridItem>
          <GridItem>2</GridItem>
          <GridItem>3</GridItem>
        </Grid>
      </div>
    </div>
  ),
};

export const TwelveColumnLayout: Story = {
  args: {
    cols: 12,
    gap: 4,
    children: (
      <>
        <div className="col-span-12 bg-blue-100 border border-blue-300 rounded p-4 text-center">
          Full Width (12 columns)
        </div>
        <div className="col-span-8 bg-green-100 border border-green-300 rounded p-4 text-center">
          Main (8 columns)
        </div>
        <div className="col-span-4 bg-yellow-100 border border-yellow-300 rounded p-4 text-center">
          Sidebar (4 columns)
        </div>
        <div className="col-span-6 bg-purple-100 border border-purple-300 rounded p-4 text-center">
          Half (6 columns)
        </div>
        <div className="col-span-6 bg-purple-100 border border-purple-300 rounded p-4 text-center">
          Half (6 columns)
        </div>
      </>
    ),
  },
};
