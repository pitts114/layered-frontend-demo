import type { Meta, StoryObj } from '@storybook/react';
import { Link } from './Link';

const meta = {
  title: 'Typography/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    href: '#',
    children: 'This is a default link',
  },
};

export const Primary: Story = {
  args: {
    href: '#',
    variant: 'primary',
    children: 'This is a primary link',
  },
};

export const Muted: Story = {
  args: {
    href: '#',
    variant: 'muted',
    children: 'This is a muted link',
  },
};

export const UnderlineNone: Story = {
  args: {
    href: '#',
    underline: 'none',
    children: 'Link with no underline',
  },
};

export const UnderlineHover: Story = {
  args: {
    href: '#',
    underline: 'hover',
    children: 'Link underlines on hover (default)',
  },
};

export const UnderlineAlways: Story = {
  args: {
    href: '#',
    underline: 'always',
    children: 'Link always underlined',
  },
};

export const ExternalLink: Story = {
  args: {
    href: 'https://example.com',
    target: '_blank',
    rel: 'noopener noreferrer',
    children: 'External link (opens in new tab)',
  },
};

export const InParagraph: Story = {
  render: () => (
    <p className="text-gray-700">
      This is a paragraph with a <Link href="#">link in the middle</Link> of the text content.
    </p>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <div>
        <Link href="#" variant="default">
          Default link
        </Link>
      </div>
      <div>
        <Link href="#" variant="primary">
          Primary link
        </Link>
      </div>
      <div>
        <Link href="#" variant="muted">
          Muted link
        </Link>
      </div>
    </div>
  ),
};
