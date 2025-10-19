import type { Meta, StoryObj } from '@storybook/react';
import { Select } from './Select';

const meta = {
  title: 'Forms/Select',
  component: Select,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

const countries = [
  { value: 'us', label: 'United States' },
  { value: 'ca', label: 'Canada' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'au', label: 'Australia' },
];

export const Default: Story = {
  args: {
    options: countries,
  },
};

export const WithLabel: Story = {
  args: {
    label: 'Country',
    options: countries,
  },
};

export const WithPlaceholder: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: countries,
  },
};

export const Required: Story = {
  args: {
    label: 'Country',
    required: true,
    placeholder: 'Select a country',
    options: countries,
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Country',
    helperText: 'Choose your country of residence',
    options: countries,
  },
};

export const WithError: Story = {
  args: {
    label: 'Country',
    error: 'Please select a country',
    options: countries,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Country',
    disabled: true,
    value: 'us',
    options: countries,
  },
};

export const WithDisabledOptions: Story = {
  args: {
    label: 'Country',
    placeholder: 'Select a country',
    options: [
      { value: 'us', label: 'United States' },
      { value: 'ca', label: 'Canada', disabled: true },
      { value: 'uk', label: 'United Kingdom' },
      { value: 'au', label: 'Australia', disabled: true },
    ],
  },
};

export const ManyOptions: Story = {
  args: {
    label: 'State',
    placeholder: 'Select a state',
    options: [
      { value: 'al', label: 'Alabama' },
      { value: 'ak', label: 'Alaska' },
      { value: 'az', label: 'Arizona' },
      { value: 'ar', label: 'Arkansas' },
      { value: 'ca', label: 'California' },
      { value: 'co', label: 'Colorado' },
      { value: 'ct', label: 'Connecticut' },
      { value: 'de', label: 'Delaware' },
      { value: 'fl', label: 'Florida' },
      { value: 'ga', label: 'Georgia' },
    ],
  },
};
