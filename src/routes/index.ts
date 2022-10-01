import { Router } from 'express';

export { routes as allRoutes };

const routes = Router();

routes.get('/', (req, res) =>
  res.json({ message: 'Fullstack Challenge 🏅 - SVA TECH' }),
);
