import { useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Background, Navbar, ThemeToggle, Button, Flex, Text, Spinner } from '@obm/ui-components';
import { useAppSelector, useAppDispatch } from './store/hooks';
import { selectIsAuthenticated, selectAuthInitializing, logoutUser, checkAuth } from '@obm/domain';
import { useDarkMode } from './hooks';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { HomePage } from './pages/HomePage';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  const { isDark, toggleDarkMode } = useDarkMode();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const isInitializing = useAppSelector(selectAuthInitializing);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const authCheckInitiated = useRef(false);

  useEffect(() => {
    if (!authCheckInitiated.current) {
      authCheckInitiated.current = true;
      dispatch(checkAuth());
    }
  }, [dispatch]);

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate('/login');
  };

  if (isInitializing) {
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
