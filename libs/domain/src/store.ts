import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';
import authReducer from './features/auth/authSlice';
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

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
