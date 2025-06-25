#!/usr/bin/env node

import { ehidToH3Hex } from '@hexcamp/hex-utils';

const ehid = process.argv[2];
if (!ehid) {
  console.error('Need ehid')
  process.exit(1);
}
console.log(ehidToH3Hex(ehid));
