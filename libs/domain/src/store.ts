import { combineReducers, configureStore } from '@reduxjs/toolkit';
import counterReducer from './features/counter/counterSlice';

const rootReducer = combineReducers({
  counter: counterReducer,
});

export function setupStore(preloadedState?: Partial<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
