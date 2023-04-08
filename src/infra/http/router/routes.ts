import { CreateGuestController } from '~/domain/guest/controllers/create-guest';
import { DeleteGuestController } from '~/domain/guest/controllers/delete-guest';
import { GetGuestController } from '~/domain/guest/controllers/get-guest';
import { ListGuestController } from '~/domain/guest/controllers/list-guests';
import { UpdateGuestController } from '~/domain/guest/controllers/update-guest';
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
  {
    path: '/guest',
    method: 'GET',
    useCase: ListGuestController.create(),
  },
  {
    path: '/guest/:id',
    method: 'GET',
    useCase: GetGuestController.create(),
  },
  {
    path: '/guest',
    method: 'POST',
    useCase: CreateGuestController.create(),
  },
  {
    path: '/guest/:id',
    method: 'PUT',
    useCase: UpdateGuestController.create(),
  },
  {
    path: '/guest/:id',
    method: 'DELETE',
    useCase: DeleteGuestController.create(),
  },
];
