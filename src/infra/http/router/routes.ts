import { HealthController } from '~/domain/health/controller';

import { Route } from './types';

export const ROUTES: Route[] = [
  {
    path: '/health',
    method: 'GET',
    useCase: new HealthController().create(),
  },
];
