import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterForm, Flex, Box, Text } from '@obm/ui-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  registerUser,
  selectAuthLoading,
  selectAuthError,
  selectIsAuthenticated,
  clearError,
} from '@obm/domain';

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (email: string, password: string, passwordConfirmation: string) => {
    await dispatch(registerUser({ email, password, passwordConfirmation }));
  };

  return (
    <Flex align="center" justify="center" className="p-4 pt-24">
      <Box className="w-full max-w-md">
        <RegisterForm onSubmit={handleSubmit} error={error || undefined} isLoading={isLoading} />
        <Box className="mt-4 text-center">
          <Text variant="body2" color="muted" as="span">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
            >
              Login here
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};
