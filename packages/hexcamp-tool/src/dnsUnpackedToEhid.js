import { command, string, positional } from "cmd-ts";
import { dnsUnpackedToEhid } from "@hexcamp/hex-utils";

export const dnsUnpackedToEhidCmd = command({
  name: "dns-unpacked-to-ehid",
  args: {
    dnsUnpacked: positional({
      type: string,
      displayName: "DNS string with unpacked H3 digits",
    }),
  },
  handler: ({ dnsUnpacked }) => {
    console.log(dnsUnpackedToEhid(dnsUnpacked));
  },
});
