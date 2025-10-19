// Store exports
export { store, setupStore } from './store';
export type { RootState, AppStore, AppDispatch } from './store';

// Counter feature exports
export { increment, decrement, selectCount } from './features/counter/counterSlice';
export { default as counterReducer } from './features/counter/counterSlice';
