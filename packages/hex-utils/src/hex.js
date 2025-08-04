import base32 from "base32.js";
import { Buffer } from "buffer";
import {
  cellToChildren,
  getBaseCellNumber,
  getResolution,
  getRes0Cells,
  h3IndexToSplitLong,
} from "h3-js";

export function ehidToH3Hex(ehid) {
  const decoder = new base32.Decoder({ type: "rfc4648", lc: true });
  const bytes = decoder.write(ehid).finalize();
  const encodedHex = "8" + Buffer.from(bytes).toString("hex");
  const padded = encodedHex.padEnd(15, "f");
  return padded;
}

export function h3HexToEhid(h3Hex) {
  if (!h3Hex) return "";
  let trimmed = h3Hex.replace(/f*$/, "");
  if (trimmed[0] !== "8") return "Error";
  if (trimmed.length % 2 === 0) {
    trimmed += "f";
  }
  const buf = Buffer.from(trimmed.slice(1), "hex");
  const encoder = new base32.Encoder({ type: "rfc4648", lc: true });
  const str = encoder.write(buf).finalize();
  return str;
}

export function ehidToDnsUnpacked(ehid) {
  const h3Hex = ehidToH3Hex(ehid);
  const res = getResolution(h3Hex);
  const base = getBaseCellNumber(h3Hex);
  const digits = getDigits(h3Hex, res);
  if (digits.length == 0) {
    return `${base}`;
  }
  return digits.reverse().join(".") + "." + base;
}

export function dnsUnpackedToEhid(dnsUnpacked) {
  const digits = dnsUnpacked.split(".").reverse();
  const base = digits.shift();
  let cell = getRes0Cells()[base];
  for (const digit of digits) {
    const res = getResolution(cell);
    cell = cellToChildren(cell, res + 1)[digit];
  }
  return h3HexToEhid(cell);
}

// From https://observablehq.com/@nrabinowitz/h3-index-bit-layout?collection=@nrabinowitz/h3
function getIndexDigit(lower, upper, res) {
  const H3_PER_DIGIT_OFFSET = 3;
  const H3_DIGIT_MASK = 7;
  const MAX_H3_RES = 15;
  const UPPER_RES_OFFSET = 11;
  const UPPER_SPLIT_RES = 1;
  // res < 5 is in the upper bits, with a one-bit offset
  if (res < 5) {
    return (
      (upper >>
        (UPPER_SPLIT_RES +
          (MAX_H3_RES - UPPER_RES_OFFSET - res) * H3_PER_DIGIT_OFFSET)) &
      H3_DIGIT_MASK
    );
  }
  // res > 5 is in the lower bits
  if (res > 5) {
    return (
      (lower >> ((MAX_H3_RES - res) * H3_PER_DIGIT_OFFSET)) & H3_DIGIT_MASK
    );
  }
  // res 5 is annoyingly split across upper and lower
  return ((upper & 1) << 2) + (lower >>> 30);
}

function getDigits(h3Str, resolution) {
  const [lower, upper] = h3IndexToSplitLong(h3Str);
  const digits = [];
  for (let i = 1; i <= resolution; i++) {
    digits.push(getIndexDigit(lower, upper, i));
  }
  return digits;
}
