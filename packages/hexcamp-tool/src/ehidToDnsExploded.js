import { command, string, positional } from 'cmd-ts';
import { ehidToDnsExploded } from '@hexcamp/hex-utils';

export const ehidToDnsExplodedCmd = command({
  name: 'ehid-to-dns-exploded',
  args: {
    ehid: positional({ type: string, displayName: 'Encoded Hexagon ID' }),
  },
  handler: ({ ehid }) => {
    console.log(ehidToDnsExploded(ehid));
  },
});