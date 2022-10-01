import { Router } from 'express';

import { ListRemindersController } from '@controllers/reminder';

export { routes as reminderRoutes };

const routes = Router();

routes.get('/', (req, res) => ListRemindersController.handle(req, res));
