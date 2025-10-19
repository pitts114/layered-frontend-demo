import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import authReducer from './features/auth/authSlice';
import { ApiClient } from '@obm/api-client';
import type { Services } from './services';

const rootReducer = combineReducers({
  counter: counterReducer,
  auth: authReducer,
});

export function setupStore(services: Services, preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: services,
        },
      }),
  });
}

// Create default store with services from environment variables
const defaultServices: Services = {
  apiClient: new ApiClient({
    hostname: import.meta.env.VITE_API_HOSTNAME || 'localhost',
    port: import.meta.env.VITE_API_PORT ? parseInt(import.meta.env.VITE_API_PORT, 10) : 3000,
    protocol: (import.meta.env.VITE_API_PROTOCOL as 'http' | 'https') || 'http',
  }),
};

export const store = setupStore(defaultServices);

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
