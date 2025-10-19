import React from 'react';
import type { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { vi } from 'vitest';

import { setupStore } from '@obm/domain';
import type { AppStore, RootState, Services } from '@obm/domain';

// use mocking library to create a mock API client
const createMockApiClient = () => ({
  login: vi.fn(),
  register: vi.fn(),
  logout: vi.fn(),
  get: vi.fn(),
  post: vi.fn(),
  put: vi.fn(),
  delete: vi.fn(),
});

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
  services?: Services;
  initialRoutes?: string[];
  withRouter?: boolean;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    services,
    store = setupStore(
      services || ({ apiClient: createMockApiClient() } as Services),
      preloadedState
    ),
    initialRoutes = ['/'],
    withRouter = true,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper = ({ children }: PropsWithChildren) => {
    const content = withRouter ? (
      <MemoryRouter initialEntries={initialRoutes}>{children}</MemoryRouter>
    ) : (
      children
    );

    return <Provider store={store}>{content}</Provider>;
  };

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}
