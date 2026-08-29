import { cpSync, existsSync, rmSync } from 'node:fs';

const from = 'build';

if (!existsSync(from)) {
  console.error('Vite did not create the build folder');
  process.exit(1);
}

function copyTo(dest) {
  rmSync(dest, { recursive: true, force: true });
  cpSync(from, dest, { recursive: true });
  console.log(`Copied output to ${dest}`);
}

copyTo('dist');

for (const dest of ['../build', '../dist']) {
  try {
    copyTo(dest);
  } catch (error) {
    console.warn(`Could not copy to ${dest}:`, error instanceof Error ? error.message : error);
  }
}
