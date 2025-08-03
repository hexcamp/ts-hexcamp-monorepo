import { expect, test } from 'vitest'
import { ehidToH3Hex, h3HexToEhid, ehidToDnsExploded, dnsExplodedToEhid } from './hex.js'

test('ehid to h3 hex', () => {
  expect(ehidToH3Hex('6kgvdnw3nwza')).toBe('8f28d51b6db6db2')
})

test('h3 hex to ehid', () => {
  expect(h3HexToEhid('8f28d51b6db6db2')).toBe('6kgvdnw3nwza')
})

test('ehid to dns exploded', () => {
  expect(ehidToDnsExploded('6kgvdnw3nwza')).toBe('2.6.6.6.6.6.6.6.6.6.6.0.5.2.3.20')
})

test('dns exploded to ehid', () => {
  expect(dnsExplodedToEhid('2.6.6.6.6.6.6.6.6.6.6.0.5.2.3.20')).toBe('6kgvdnw3nwza')
})