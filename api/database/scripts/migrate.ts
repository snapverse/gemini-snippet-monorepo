import fs from 'node:fs/promises';
import path from 'node:path';

import DB from '@/config/db';

(async () => {
  const migrationDir = path.join(__dirname, '..', 'migrations');
  const migrations = await fs.readdir(migrationDir);

  for (const fileName of migrations) {
    const file = path.join(migrationDir, fileName);
    const sql = await fs.readFile(file, { encoding: 'utf-8' });

    DB.run(sql, (err) => {
      console.info(`[RUNNING]: ${fileName} migration`);
      if (err) {
        console.error(`[FAILED]: ${fileName} migration failed`, err.message);
      } else {
        console.info(`[DONE]: ${fileName} migrated`);
      }
    });
  }
})();
