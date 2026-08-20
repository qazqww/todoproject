import { describe, it, expect } from 'vitest';
import { DdayType } from './DdayType';

describe('DdayType', () => {
  it('exposes the three expected keys with matching string values', () => {
    expect(DdayType).toEqual({
      NONE: 'NONE',
      DATE_ONLY: 'DATE_ONLY',
      DATE_TIME: 'DATE_TIME',
    });
  });

  it('has exactly three enum members (no unexpected additions)', () => {
    expect(Object.keys(DdayType)).toHaveLength(3);
  });

  it('each key equals its own value (self-mapping enum convention)', () => {
    Object.entries(DdayType).forEach(([key, value]) => {
      expect(key).toBe(value);
    });
  });
});
