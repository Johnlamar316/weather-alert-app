import { formatToLocal } from 'utils/index';

test('formats ISO date to local time string', () => {
  const input = '2025-04-01T16:00:00Z';
  const result = formatToLocal(input);
  expect(typeof result).toBe('string');
  expect(result).toMatch(/\d{4}/);
});
