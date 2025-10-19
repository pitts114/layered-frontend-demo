import type { Meta, StoryObj } from '@storybook/react'
import { RegisterForm } from './RegisterForm'

const meta = {
  title: 'Components/RegisterForm',
  component: RegisterForm,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof RegisterForm>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    onSubmit: (email, password, passwordConfirmation) => {
      console.log('Register submitted:', { email, password, passwordConfirmation })
      alert(`Registration attempt with email: ${email}`)
    },
  },
}

export const WithError: Story = {
  args: {
    onSubmit: (email, password, passwordConfirmation) => {
      console.log('Register submitted:', { email, password, passwordConfirmation })
    },
    error: 'Email already exists. Please use a different email or login.',
  },
}

export const Loading: Story = {
  args: {
    onSubmit: (email, password, passwordConfirmation) => {
      console.log('Register submitted:', { email, password, passwordConfirmation })
    },
    isLoading: true,
  },
}

export const LoadingWithError: Story = {
  args: {
    onSubmit: (email, password, passwordConfirmation) => {
      console.log('Register submitted:', { email, password, passwordConfirmation })
    },
    error: 'Server error. Please try again later.',
    isLoading: true,
  },
}
