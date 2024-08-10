import CleanCSS from 'clean-css';
import { minify as HTMLMinify } from 'html-minifier';
import { exec } from 'node:child_process';
import fs from 'node:fs/promises';
import path from 'node:path';

const start_at = performance.now();

let step = 0;
const TOTAL_STEPS = '6';

function* info(...messages: string[]) {
  while (true) {
    step++;
    console.info(`[${step} / ${TOTAL_STEPS}] `, ...messages);
    yield step;
  }
}

enum AcceptedExt {
  TypeScript = '.ts',
  HTML = '.html',
  CSS = '.css'
}

const buildProcessFolder = async (dir: string = '/dist') => {
  info('Checking for /dist folder existance...').next();

  const distUrl = path.join(__dirname, ...dir.split('/'));

  try {
    const directory = await fs.readdir(distUrl, { encoding: 'utf-8' });

    info('Cleaning the previous build...').next();

    await Promise.all(
      directory.map(async (file) => {
        const uri = path.join(distUrl, file);
        await fs.unlink(uri);
      })
    );
  } catch (reason) {
    info('Creating /dist folder ').next();

    await fs.mkdir('./dist', { recursive: true });
  }
};

const buildSpecificList = async (options: { list: string[]; dist: string }) => {
  info(`Copying files from list: ${options.list.join(', ').trim()}`).next();

  await Promise.all(
    options.list.map(async (fileOrDir) => {
      const { ext, dir, base } = path.parse(fileOrDir);

      const targetFileOrDir = path.join('./', ...dir.split('/'), base);
      const outDir = path.join(options.dist, dir);
      const isDirectory = ext.length === 0;

      await fs.mkdir(outDir, { recursive: true });

      if (isDirectory) {
        const directory = await fs.readdir(targetFileOrDir, {
          recursive: true,
          encoding: 'utf-8'
        });

        await Promise.all(
          directory.map(async (file) => {
            await fs.copyFile(
              path.join(targetFileOrDir, file),
              path.join('dist', file)
            );
          })
        );
      } else {
        await fs.copyFile(targetFileOrDir, path.join('dist', base));
      }
    })
  );
};

const buildFileExtensions = async (options: {
  src: string[];
  dist: string;
}) => {
  info('Building files from /src folder').next();

  await Promise.all(
    options.src.map(async (file) => {
      const { ext, base, dir } = path.parse(file);

      const targetFile = path.join('src', ...dir.split('/'), base);
      const outDir = path.join(options.dist, dir);
      const outFile = path.join(outDir, base);

      await fs.mkdir(outDir, { recursive: true });

      switch (ext) {
        case AcceptedExt.TypeScript: {
          await new Promise((resolve, reject) => {
            exec(
              `pnpm exec tsc ${targetFile} --outDir ${outDir}`,
              (err, stdout) => (err ? reject(err) : resolve(stdout))
            );
          });

          break;
        }
        case AcceptedExt.HTML: {
          const html = await fs.readFile(targetFile, { encoding: 'utf-8' });
          const minifiedHtml = HTMLMinify(html);
          await fs.writeFile(outFile, minifiedHtml);

          break;
        }
        case AcceptedExt.CSS: {
          const css = await fs.readFile(targetFile, { encoding: 'utf-8' });
          const minifiedCss = new CleanCSS().minify(css);
          await fs.writeFile(outFile, minifiedCss.styles);

          break;
        }
        default: {
          // ignore

          break;
        }
      }
    })
  );
};

const main = async () => {
  try {
    const distUrl = path.join(__dirname, 'dist');

    await buildProcessFolder(distUrl);

    info('Looking for files to build...').next();

    const srcDirectory = await fs.readdir('src', {
      recursive: true,
      encoding: 'utf-8'
    });

    info('Preparing folders to receive the build files').next();

    await Promise.all([
      buildFileExtensions({ src: srcDirectory, dist: distUrl }),
      buildSpecificList({ list: ['manifest.json', 'public'], dist: distUrl })
    ]);

    const end_at = performance.now();
    const buildTime = (end_at - start_at) / 1000;

    console.info(`\nDone in ${buildTime.toFixed(3)}s ✨`);
    process.exit(0);
  } catch (reason) {
    console.error((reason as Error)?.message || 'Generic error message');
    process.exit(1);
  }
};

main();
