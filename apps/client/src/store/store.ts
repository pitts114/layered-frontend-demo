import { setupStore } from '@layered-frontend-demo/domain';
import type { Services } from '@layered-frontend-demo/domain';
import { apiClient } from '../services/apiClient';

const services: Services = {
  apiClient,
};

export const store = setupStore(services);
