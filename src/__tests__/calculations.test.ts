import {
  calculateInstrumentReturn,
  calculateMarketValue,
  calculateGainAmount,
  calculateGainPercent,
  calculateSharesFromAmount,
} from '../domain/use-cases/calculations';

describe('calculateInstrumentReturn', () => {
  it('returns positive percentage when last_price > close_price', () => {
    expect(calculateInstrumentReturn(110, 100)).toBeCloseTo(10);
  });

  it('returns negative percentage when last_price < close_price', () => {
    expect(calculateInstrumentReturn(90, 100)).toBeCloseTo(-10);
  });

  it('returns 0 when last_price equals close_price', () => {
    expect(calculateInstrumentReturn(100, 100)).toBe(0);
  });

  it('returns 0 when close_price is 0 (avoids division by zero)', () => {
    expect(calculateInstrumentReturn(150, 0)).toBe(0);
  });

  it('handles fractional prices correctly', () => {
    expect(calculateInstrumentReturn(10830, 10399)).toBeCloseTo(4.144, 2);
  });
});

describe('calculateMarketValue', () => {
  it('returns quantity * last_price', () => {
    expect(calculateMarketValue(10, 1500)).toBe(15000);
  });

  it('returns 0 when quantity is 0', () => {
    expect(calculateMarketValue(0, 1500)).toBe(0);
  });

  it('returns 0 when last_price is 0', () => {
    expect(calculateMarketValue(10, 0)).toBe(0);
  });

  it('handles large portfolio values', () => {
    expect(calculateMarketValue(1000, 10830)).toBe(10_830_000);
  });
});

describe('calculateGainAmount', () => {
  it('returns positive gain when last_price > avg_cost_price', () => {
    expect(calculateGainAmount(1200, 1000, 10)).toBe(2000);
  });

  it('returns negative gain (loss) when last_price < avg_cost_price', () => {
    expect(calculateGainAmount(800, 1000, 10)).toBe(-2000);
  });

  it('returns 0 when last_price equals avg_cost_price', () => {
    expect(calculateGainAmount(1000, 1000, 10)).toBe(0);
  });

  it('returns 0 when quantity is 0', () => {
    expect(calculateGainAmount(1200, 1000, 0)).toBe(0);
  });

  it('handles fractional prices correctly', () => {
    expect(calculateGainAmount(10830, 10000, 5)).toBeCloseTo(4150);
  });
});

describe('calculateGainPercent', () => {
  it('returns positive percentage when last_price > avg_cost_price', () => {
    expect(calculateGainPercent(1100, 1000)).toBeCloseTo(10);
  });

  it('returns negative percentage when last_price < avg_cost_price', () => {
    expect(calculateGainPercent(900, 1000)).toBeCloseTo(-10);
  });

  it('returns 0 when last_price equals avg_cost_price', () => {
    expect(calculateGainPercent(1000, 1000)).toBe(0);
  });

  it('returns 0 when avg_cost_price is 0 (avoids division by zero)', () => {
    expect(calculateGainPercent(1000, 0)).toBe(0);
  });

  it('handles large gains correctly', () => {
    expect(calculateGainPercent(2000, 1000)).toBeCloseTo(100);
  });
});

describe('calculateSharesFromAmount', () => {
  it('returns floored number of shares from a peso amount', () => {
    expect(calculateSharesFromAmount(10000, 3000)).toBe(3);
  });

  it('floors fractional result (no partial shares allowed)', () => {
    expect(calculateSharesFromAmount(10000, 3001)).toBe(3);
  });

  it('returns 0 when amount is less than price', () => {
    expect(calculateSharesFromAmount(500, 1000)).toBe(0);
  });

  it('returns 0 when last_price is 0 (avoids division by zero)', () => {
    expect(calculateSharesFromAmount(10000, 0)).toBe(0);
  });

  it('returns 0 when last_price is negative', () => {
    expect(calculateSharesFromAmount(10000, -100)).toBe(0);
  });

  it('returns exact count when amount is a perfect multiple of price', () => {
    expect(calculateSharesFromAmount(10000, 1000)).toBe(10);
  });

  it('handles realistic fintech values', () => {
    // AR$ 50.000 / AR$ 10.830 per share → 4 shares
    expect(calculateSharesFromAmount(50000, 10830)).toBe(4);
  });
});
