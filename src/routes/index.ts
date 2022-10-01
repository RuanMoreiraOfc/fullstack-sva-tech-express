import { Router } from 'express';

import { reminderRoutes } from '@routes/reminder';

export { routes as allRoutes };

const routes = Router();

routes.get('/', (req, res) =>
  res.json({ message: 'Fullstack Challenge 🏅 - SVA TECH' }),
);

routes.use('/reminder', reminderRoutes);
