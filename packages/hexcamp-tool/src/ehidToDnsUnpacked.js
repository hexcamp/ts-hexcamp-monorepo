import { command, string, positional } from "cmd-ts";
import { ehidToDnsUnpacked } from "@hexcamp/hex-utils";

export const ehidToDnsUnpackedCmd = command({
  name: "ehid-to-dns-unpacked",
  args: {
    ehid: positional({ type: string, displayName: "Encoded Hexagon ID" }),
  },
  handler: ({ ehid }) => {
    console.log(ehidToDnsUnpacked(ehid));
  },
});
