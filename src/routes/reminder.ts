import { Router } from 'express';

import { ListRemindersController } from '@controllers/reminder';
import { CreateReminderController } from '@controllers/reminder/create';

export { routes as reminderRoutes };

const routes = Router();

routes.get('/', (req, res) => ListRemindersController.handle(req, res));
routes.post('/', (req, res) => CreateReminderController.handle(req, res));
