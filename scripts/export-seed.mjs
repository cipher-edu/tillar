import { writeFileSync, mkdirSync } from 'fs';
import { pathToFileURL } from 'url';
import { createRequire } from 'module';
import { register } from 'node:module';
import { pathToFileURL as p } from 'node:url';

// Use dynamic import via tsx loader when run with: npx tsx scripts/export-seed.ts
console.error('Use: npx tsx scripts/export-seed.ts');
process.exit(1);
