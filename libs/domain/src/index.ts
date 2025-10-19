export { store, setupStore } from './store';
export type { RootState, AppStore, AppDispatch } from './store';
export type { Services } from './services';
export { increment, decrement, selectCount } from './features/counter/counterSlice';
export { default as counterReducer } from './features/counter/counterSlice';
export {
  loginUser,
  registerUser,
  logoutUser,
  checkAuth,
  clearError,
  logout,
  login,
  selectUser,
  selectIsAuthenticated,
  selectAuthLoading,
  selectAuthError,
} from './features/auth/authSlice';
export type { User, AuthState } from './features/auth/authSlice';
export { default as authReducer } from './features/auth/authSlice';
