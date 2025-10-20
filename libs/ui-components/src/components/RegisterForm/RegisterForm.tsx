import React, { FormEvent, useState } from 'react';
import { Input } from '../Input';

export interface RegisterFormProps {
  onSubmit: (email: string, password: string, passwordConfirmation: string) => void;
  error?: string;
  isLoading?: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  error,
  isLoading = false,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    // Basic client-side check that passwords match
    if (password !== passwordConfirmation) {
      setPasswordMismatch(true);
      return;
    }

    setPasswordMismatch(false);
    onSubmit(email, password, passwordConfirmation);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 pt-6 pb-8"
      >
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-6 text-center">
          Register
        </h2>

        {error && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </div>
        )}

        {passwordMismatch && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">Passwords do not match.</p>
          </div>
        )}

        <div className="mb-4">
          <Input
            id="email"
            label="Email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="mb-4">
          <Input
            id="password"
            label="Password"
            type="password"
            value={password}
            onChange={e => {
              setPassword(e.target.value);
              setPasswordMismatch(false);
            }}
            disabled={isLoading}
            required
          />
        </div>

        <div className="mb-6">
          <Input
            id="passwordConfirmation"
            label="Confirm Password"
            type="password"
            value={passwordConfirmation}
            onChange={e => {
              setPasswordConfirmation(e.target.value);
              setPasswordMismatch(false);
            }}
            disabled={isLoading}
            required
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 dark:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 disabled:bg-blue-300 dark:disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};
