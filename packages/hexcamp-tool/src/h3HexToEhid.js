import { command, string, positional } from 'cmd-ts';
import { h3HexToEhid } from '@hexcamp/hex-utils';

export const h3HexToEhidCmd = command({
  name: 'h3-hex-to-ehid',
  args: {
    h3Hex: positional({ type: string, displayName: 'H3 Cell ID' }),
  },
  handler: ({ h3Hex }) => {
    console.log(h3HexToEhid(h3Hex));
  },
});