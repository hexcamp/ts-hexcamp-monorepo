import base32 from 'base32.js'
import { Buffer } from 'buffer'

export function ehidToH3Hex(url) {
  const decoder = new base32.Decoder({ type: 'rfc4648', lc: true })
  const bytes = decoder.write(url).finalize()
  const encodedHex = '8' + Buffer.from(bytes).toString('hex')
  const padded = encodedHex.padEnd(15, 'f')
  return padded
}