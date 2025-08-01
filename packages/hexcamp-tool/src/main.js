#!/usr/bin/env node

import { subcommands, run } from 'cmd-ts';
import { ehidToH3HexCmd } from './ehidToH3Hex.js'
import { ehidToDnsExplodedCmd } from './ehidToDnsExploded.js'

const hexcampTool = subcommands({
  name: 'hexcamp-tool',
  cmds: { 
    'ehid-to-h3-hex': ehidToH3HexCmd,
    'ehid-to-dns-exploded': ehidToDnsExplodedCmd
  },
});

run(hexcampTool, process.argv.slice(2));
