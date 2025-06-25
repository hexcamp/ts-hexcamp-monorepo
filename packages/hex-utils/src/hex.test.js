import { expect, test } from 'vitest'
import { ehidToH3Hex } from './hex.js'

test('ehid to h3 hex', () => {
  expect(ehidToH3Hex('6kgvdnw3nwza')).toBe('8f28d51b6db6db2')
})
