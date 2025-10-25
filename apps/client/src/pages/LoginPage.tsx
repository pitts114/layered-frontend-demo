import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginForm, Flex, Box, Text } from '@layered-frontend-demo/ui-components';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loginUser, selectAuthLoading, selectAuthError, selectIsAuthenticated } from '@layered-frontend-demo/domain';

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isLoading = useAppSelector(selectAuthLoading);
  const error = useAppSelector(selectAuthError);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (email: string, password: string) => {
    await dispatch(loginUser({ email, password }));
  };

  return (
    <Flex align="center" justify="center" className="p-4 pt-24">
      <Box className="w-full max-w-md">
        <LoginForm onSubmit={handleSubmit} error={error || undefined} isLoading={isLoading} />
        <Box className="mt-4 text-center">
          <Text variant="body2" color="muted" as="span">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-semibold transition-colors"
            >
              Register here
            </Link>
          </Text>
        </Box>
      </Box>
    </Flex>
  );
};
