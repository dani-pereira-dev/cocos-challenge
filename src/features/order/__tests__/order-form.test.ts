import { computeUseAllValue, isUseAllAvailable } from '../utils/order-form';

// Precio de referencia para los cálculos: AR$ 50 por acción
const LAST_PRICE = 50;

// ─────────────────────────────────────────────
// computeUseAllValue
// ─────────────────────────────────────────────

describe('computeUseAllValue', () => {
  // ── BUY ──────────────────────────────────
  describe('BUY + Por monto (amount)', () => {
    it('retorna el floor del cash disponible como string', () => {
      expect(
        computeUseAllValue({ side: 'BUY', quantityMode: 'amount', cash: 1000.75, lastPrice: LAST_PRICE }),
      ).toBe('1000');
    });

    it('devuelve el cash exacto cuando es entero', () => {
      expect(
        computeUseAllValue({ side: 'BUY', quantityMode: 'amount', cash: 5000, lastPrice: LAST_PRICE }),
      ).toBe('5000');
    });

    it('retorna null cuando cash es undefined', () => {
      expect(
        computeUseAllValue({ side: 'BUY', quantityMode: 'amount', cash: undefined, lastPrice: LAST_PRICE }),
      ).toBeNull();
    });
  });

  describe('BUY + Cantidad de títulos (shares)', () => {
    it('calcula cuántas acciones enteras se pueden comprar con todo el cash', () => {
      // 500 / 50 = 10 acciones exactas
      expect(
        computeUseAllValue({ side: 'BUY', quantityMode: 'shares', cash: 500, lastPrice: LAST_PRICE }),
      ).toBe('10');
    });

    it('trunca hacia abajo cuando el cash no alcanza para una acción más', () => {
      // 549 / 50 = 10.98 → 10 acciones
      expect(
        computeUseAllValue({ side: 'BUY', quantityMode: 'shares', cash: 549, lastPrice: LAST_PRICE }),
      ).toBe('10');
    });

    it('retorna "0" cuando el cash es menor al precio de una acción', () => {
      expect(
        computeUseAllValue({ side: 'BUY', quantityMode: 'shares', cash: 10, lastPrice: LAST_PRICE }),
      ).toBe('0');
    });

    it('retorna null cuando cash es undefined', () => {
      expect(
        computeUseAllValue({ side: 'BUY', quantityMode: 'shares', cash: undefined, lastPrice: LAST_PRICE }),
      ).toBeNull();
    });
  });

  // ── SELL ─────────────────────────────────
  describe('SELL + Cantidad de títulos (shares)', () => {
    it('retorna la cantidad exacta de acciones en cartera', () => {
      expect(
        computeUseAllValue({ side: 'SELL', quantityMode: 'shares', ownedShares: 5, lastPrice: LAST_PRICE }),
      ).toBe('5');
    });

    it('retorna "1" cuando solo hay una acción en cartera', () => {
      expect(
        computeUseAllValue({ side: 'SELL', quantityMode: 'shares', ownedShares: 1, lastPrice: LAST_PRICE }),
      ).toBe('1');
    });

    it('retorna null cuando ownedShares es undefined (instrumento abierto desde mercado)', () => {
      expect(
        computeUseAllValue({ side: 'SELL', quantityMode: 'shares', ownedShares: undefined, lastPrice: LAST_PRICE }),
      ).toBeNull();
    });
  });

  describe('SELL + Por monto (amount)', () => {
    it('retorna el valor de mercado total (floor) de todas las acciones', () => {
      // 3 acciones × AR$ 50 = AR$ 150
      expect(
        computeUseAllValue({ side: 'SELL', quantityMode: 'amount', ownedShares: 3, lastPrice: LAST_PRICE }),
      ).toBe('150');
    });

    it('aplica floor cuando el resultado tiene decimales', () => {
      // 3 acciones × AR$ 45.72 = AR$ 137.16 → floor = 137
      expect(
        computeUseAllValue({ side: 'SELL', quantityMode: 'amount', ownedShares: 3, lastPrice: 45.72 }),
      ).toBe('137');
    });

    it('retorna "0" cuando ownedShares es 0', () => {
      expect(
        computeUseAllValue({ side: 'SELL', quantityMode: 'amount', ownedShares: 0, lastPrice: LAST_PRICE }),
      ).toBe('0');
    });

    it('retorna null cuando ownedShares es undefined', () => {
      expect(
        computeUseAllValue({ side: 'SELL', quantityMode: 'amount', ownedShares: undefined, lastPrice: LAST_PRICE }),
      ).toBeNull();
    });
  });
});

// ─────────────────────────────────────────────
// isUseAllAvailable
// ─────────────────────────────────────────────

describe('isUseAllAvailable', () => {
  describe('BUY', () => {
    it('es true cuando hay cash disponible', () => {
      expect(isUseAllAvailable({ side: 'BUY', cash: 1000, ownedShares: undefined })).toBe(true);
    });

    it('es false cuando cash es undefined', () => {
      expect(isUseAllAvailable({ side: 'BUY', cash: undefined, ownedShares: 5 })).toBe(false);
    });

    it('es true con cash = 0', () => {
      expect(isUseAllAvailable({ side: 'BUY', cash: 0 })).toBe(true);
    });
  });

  describe('SELL', () => {
    it('es true cuando hay acciones en cartera', () => {
      expect(isUseAllAvailable({ side: 'SELL', ownedShares: 2, cash: undefined })).toBe(true);
    });

    it('es false cuando ownedShares es undefined (instrumento desde mercado)', () => {
      expect(isUseAllAvailable({ side: 'SELL', ownedShares: undefined, cash: 1000 })).toBe(false);
    });

    it('es true con ownedShares = 0', () => {
      expect(isUseAllAvailable({ side: 'SELL', ownedShares: 0 })).toBe(true);
    });
  });
});
