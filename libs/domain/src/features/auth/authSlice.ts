import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { LoginResponse, RegisterResponse, UserResponse } from '@obm/api-client';
import type { RootState } from '../../store';
import type { Services } from '../../services';

export interface User {
  id: number;
  email: string;
  created_at?: string;
}

export interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
  error: null,
  isAuthenticated: false,
};

// Async thunks
export const loginUser = createAsyncThunk<
  LoginResponse,
  { email: string; password: string },
  { rejectValue: string; extra: Services }
>('auth/login', async ({ email, password }, { rejectWithValue, extra }) => {
  const result = await extra.apiClient.login(email, password);

  if (result.error) {
    return rejectWithValue(result.error);
  }

  return result.data!;
});

export const registerUser = createAsyncThunk<
  RegisterResponse,
  { email: string; password: string; passwordConfirmation: string },
  { rejectValue: string; extra: Services }
>(
  'auth/register',
  async ({ email, password, passwordConfirmation }, { rejectWithValue, extra }) => {
    const result = await extra.apiClient.register(email, password, passwordConfirmation);

    if (result.error) {
      return rejectWithValue(result.error);
    }

    return result.data!;
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string; extra: Services }>(
  'auth/logout',
  async (_, { rejectWithValue, extra }) => {
    const result = await extra.apiClient.logout();

    if (result.error) {
      return rejectWithValue(result.error);
    }

    return;
  }
);

export const checkAuth = createAsyncThunk<
  UserResponse,
  void,
  { rejectValue: string; extra: Services }
>('auth/checkAuth', async (_, { rejectWithValue, extra }) => {
  const result = await extra.apiClient.getCurrentUser();

  if (result.error) {
    return rejectWithValue(result.error);
  }

  return result.data!;
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: state => {
      state.error = null;
    },
    logout: state => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    login: (state, action: { payload: User }) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    // Login
    builder
      .addCase(loginUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
        state.isAuthenticated = false;
      });

    // Register
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Registration failed';
        state.isAuthenticated = false;
      });

    // Logout
    builder
      .addCase(logoutUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Logout failed';
      });

    // Check Auth
    builder
      .addCase(checkAuth.pending, state => {
        state.isLoading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = {
          id: action.payload.id,
          email: action.payload.email,
          created_at: action.payload.created_at,
        };
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(checkAuth.rejected, state => {
        state.isLoading = false;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

// Selectors
export const selectUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated;
export const selectAuthLoading = (state: RootState) => state.auth.isLoading;
export const selectAuthError = (state: RootState) => state.auth.error;

export const { clearError, logout, login } = authSlice.actions;

export default authSlice.reducer;
