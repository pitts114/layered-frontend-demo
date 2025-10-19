import type { Meta, StoryObj } from '@storybook/react';
import { FormGroup } from './FormGroup';
import { Radio } from '../Radio';
import { Checkbox } from '../Checkbox';

const meta = {
  title: 'Forms/FormGroup',
  component: FormGroup,
  parameters: { layout: 'centered' },
  tags: ['autodocs'],
} satisfies Meta<typeof FormGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithRadios: Story = {
  args: {
    legend: 'Choose a size',
    children: (
      <>
        <Radio name="size" label="Small" />
        <Radio name="size" label="Medium" defaultChecked />
        <Radio name="size" label="Large" />
      </>
    ),
  },
};

export const WithCheckboxes: Story = {
  args: {
    legend: 'Select your interests',
    children: (
      <>
        <Checkbox label="Technology" defaultChecked />
        <Checkbox label="Sports" />
        <Checkbox label="Music" defaultChecked />
        <Checkbox label="Travel" />
      </>
    ),
  },
};
