import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import {
  Background,
  Navbar,
  ThemeToggle,
  useDarkMode,
  Button,
  Flex,
  Text,
  Spinner,
} from '@obm/ui-components';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectIsAuthenticated, selectAuthLoading, logoutUser, checkAuth } from '@obm/domain';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isLoading = useAppSelector(selectAuthLoading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  if (isLoading) {
    return (
      <Background>
        <Flex align="center" justify="center" className="min-h-screen">
          <Spinner size="xl" />
        </Flex>
      </Background>
    );
  }

  return (
    <Background>
      <Navbar
        left={
          <Text
            variant="body1"
            weight="semibold"
            className="text-lg text-blue-600 dark:text-blue-400"
          >
            OBM
          </Text>
        }
        right={
          <Flex align="center" gap={3}>
            <ThemeToggle isDark={isDark} onToggle={toggleDarkMode} />
            {isAuthenticated && (
              <Button onClick={handleLogout} variant="secondary" size="small">
                Logout
              </Button>
            )}
          </Flex>
        }
      />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Background>
  );
}

export default App;
