import getEnv from '@utils/getEnv';

import { app } from './app';

const PORT = getEnv('PORT', 'number', 3333);

app.listen(PORT, () =>
  console.log(`Server opened at http://localhost:${PORT}`),
);
