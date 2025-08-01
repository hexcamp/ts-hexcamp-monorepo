import { expect, test } from 'vitest'
import { ehidToH3Hex, ehidToDnsExploded } from './hex.js'

test('ehid to h3 hex', () => {
  expect(ehidToH3Hex('6kgvdnw3nwza')).toBe('8f28d51b6db6db2')
})

test('ehid to dns exploded', () => {
  expect(ehidToDnsExploded('6kgvdnw3nwza')).toBe('2.6.6.6.6.6.6.6.6.6.6.0.5.2.3.20')
})