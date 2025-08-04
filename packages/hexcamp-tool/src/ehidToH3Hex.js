import { command, string, positional } from "cmd-ts";
import { ehidToH3Hex } from "@hexcamp/hex-utils";

export const ehidToH3HexCmd = command({
  name: "ehid-to-h3-hex",
  args: {
    ehid: positional({ type: string, displayName: "Encoded Hexagon ID" }),
  },
  handler: ({ ehid }) => {
    console.log(ehidToH3Hex(ehid));
  },
});
