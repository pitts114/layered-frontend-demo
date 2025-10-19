import { setupStore } from '@obm/domain';
import type { Services } from '@obm/domain';
import { apiClient } from '../services/apiClient';

const services: Services = {
  apiClient,
};

export const store = setupStore(services);
