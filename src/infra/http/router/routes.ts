import { CreateGuestController } from '~/domain/guest/controllers/create-guest';
import { DeleteGuestController } from '~/domain/guest/controllers/delete-guest';
import { GetGuestController } from '~/domain/guest/controllers/get-guest';
import { ListGuestsController } from '~/domain/guest/controllers/list-guests';
import { UpdateGuestController } from '~/domain/guest/controllers/update-guest';
import { HealthController } from '~/domain/health/controller';
import { CreateInviteController } from '~/domain/invite/controllers/create-invite';
import { DeleteInviteController } from '~/domain/invite/controllers/delete-invite';
import { GetInviteController } from '~/domain/invite/controllers/get-invite';
import { ListInvitesController } from '~/domain/invite/controllers/list-invites';
import { UpdateInviteController } from '~/domain/invite/controllers/update-invite';
import { GetMeController } from '~/domain/user/controllers/get-me';
import { LoginController } from '~/domain/user/controllers/login';
import { SendMessageController } from '~/domain/whatsapp/controllers/send-message';

import { AuthMiddleware } from '../middlewares/auth';
import { Route } from './types';

export const ROUTES: Route[] = [
  { path: ['/', '/health'], method: 'GET', useCase: HealthController.create() },
  { path: '/message', method: 'GET', useCase: SendMessageController.create() },
  { path: '/login', method: 'POST', useCase: LoginController.create() },
  {
    path: '/user/me',
    method: 'GET',
    useCase: GetMeController.create(),
    middlewares: [AuthMiddleware.create()],
  },
  {
    path: '/guest',
    method: 'GET',
    useCase: ListGuestsController.create(),
    middlewares: [AuthMiddleware.create()],
  },
  { path: '/guest/:id', method: 'GET', useCase: GetGuestController.create() },
  { path: '/guest', method: 'POST', useCase: CreateGuestController.create() },
  { path: '/guest/:id', method: 'PUT', useCase: UpdateGuestController.create() },
  { path: '/guest/:id', method: 'DELETE', useCase: DeleteGuestController.create() },
  { path: '/invite', method: 'GET', useCase: ListInvitesController.create() },
  { path: '/invite/:id', method: 'GET', useCase: GetInviteController.create() },
  { path: '/invite', method: 'POST', useCase: CreateInviteController.create() },
  { path: '/invite/:id', method: 'PUT', useCase: UpdateInviteController.create() },
  { path: '/invite/:id', method: 'DELETE', useCase: DeleteInviteController.create() },
];
