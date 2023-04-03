import { HealthController } from '~/domain/health/controller';
import { SendMessageController } from '~/domain/whatsapp/controllers/send-message';

import { Route } from './types';

export const ROUTES: Route[] = [
  {
    path: '/health',
    method: 'GET',
    useCase: HealthController.create(),
  },
  {
    path: '/message',
    method: 'GET',
    useCase: SendMessageController.create(),
  },
];
