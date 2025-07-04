import { config } from 'dotenv';
import { resolve } from 'path';

// Load correct .env file
const envFile = process.env.NODE_ENV === 'production' ? '.env' : '.env.dev';
config({ path: resolve(__dirname, '..', envFile) });

import app from './app';

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV} at http://localhost:${PORT}`);
});
