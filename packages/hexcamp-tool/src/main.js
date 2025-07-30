#!/usr/bin/env node

import { command, subcommands, run, string, positional } from 'cmd-ts';
import { ehidToH3Hex } from '@hexcamp/hex-utils';

const ehidToH3HexCmd = command({
  name: 'ehid-to-h3-hex',
  args: {
    ehid: positional({ type: string, displayName: 'Encoded Hexagon ID' }),
  },
  handler: ({ ehid }) => {
    console.log(ehidToH3Hex(ehid));
  },
});

const hexcampTool = subcommands({
  name: 'hexcamp-tool',
  cmds: { 
    'ehid-to-h3-hex': ehidToH3HexCmd
  },
});

run(hexcampTool, process.argv.slice(2));
