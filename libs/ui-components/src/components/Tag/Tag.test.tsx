import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders children correctly', () => {
    render(<Tag>Test Tag</Tag>);
    expect(screen.getByText('Test Tag')).toBeInTheDocument();
  });

  it('shows remove button when onRemove is provided', () => {
    render(<Tag onRemove={() => {}}>Tag</Tag>);
    expect(screen.getByLabelText('Remove')).toBeInTheDocument();
  });

  it('calls onRemove when remove button is clicked', async () => {
    const handleRemove = vi.fn();
    const user = userEvent.setup();
    render(<Tag onRemove={handleRemove}>Tag</Tag>);
    await user.click(screen.getByLabelText('Remove'));
    expect(handleRemove).toHaveBeenCalled();
  });
});
