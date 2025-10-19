import React from 'react';
import type { PropsWithChildren } from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { mockDeep } from 'vitest-mock-extended';

import { setupStore } from '@obm/domain';
import type { AppStore, RootState, Services } from '@obm/domain';
import type { ApiClient } from '@obm/api-client';

// use vitest-mock-extended to create a type-safe mock API client
const createMockApiClient = () => mockDeep<ApiClient>();

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
    store = setupStore(services || { apiClient: createMockApiClient() }, preloadedState),
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
