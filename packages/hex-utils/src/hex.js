import base32 from 'base32.js'
import { Buffer } from 'buffer'
import { getBaseCellNumber, getResolution, h3IndexToSplitLong } from "h3-js";

export function ehidToH3Hex(ehid) {
  const decoder = new base32.Decoder({ type: 'rfc4648', lc: true })
  const bytes = decoder.write(ehid).finalize()
  const encodedHex = '8' + Buffer.from(bytes).toString('hex')
  const padded = encodedHex.padEnd(15, 'f')
  return padded
}

export function ehidToDnsExploded(ehid) {
  const h3Hex = ehidToH3Hex(ehid)
  const res = getResolution(h3Hex);
  const base = getBaseCellNumber(h3Hex);
  const digits = getDigits(h3Hex, res);
  return digits.reverse().join('.') + '.' + base;
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
    return (upper >> UPPER_SPLIT_RES + (
      (MAX_H3_RES - UPPER_RES_OFFSET - res) * H3_PER_DIGIT_OFFSET
    )) & H3_DIGIT_MASK;
  }
  // res > 5 is in the lower bits
  if (res > 5) {
    return (lower >> ((MAX_H3_RES - res) * H3_PER_DIGIT_OFFSET)) & H3_DIGIT_MASK;
  }
  // res 5 is annoyingly split across upper and lower
  return ((upper & 1) << 2) + (lower >>> 30);
}

function getDigits(h3Str, resolution) {
  const [lower, upper] = h3IndexToSplitLong(h3Str);
  const digits = [];
  for (let i = 1; i <= resolution; i++) {
    digits.push(
      getIndexDigit(lower, upper, i)
    )
  }
  return digits;
}