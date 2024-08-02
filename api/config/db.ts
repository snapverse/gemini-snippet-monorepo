import path from 'node:path';
import sqlite3 from 'sqlite3';

import env from '@/env';

const { DB_MEMORY, NODE_ENV } = env;

const filename = path.join(__dirname, '..', 'database', DB_MEMORY);

if (NODE_ENV === 'testing' || NODE_ENV === 'development') sqlite3.verbose();

const DB = new sqlite3.Database(
  filename,
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE | sqlite3.OPEN_FULLMUTEX
);

export default DB;
