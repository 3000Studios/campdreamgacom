import dotenv from 'dotenv';

import { createApp } from './app.js';
import { readServerEnv } from './config.js';

dotenv.config();

const env = readServerEnv(process.env);
const app = createApp(env);

app.listen(env.PORT, () => {
  console.log(`Camp Dream GA server listening on http://localhost:${env.PORT}`);
});
