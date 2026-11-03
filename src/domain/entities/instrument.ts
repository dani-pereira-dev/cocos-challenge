export interface Instrument {
  id: number;
  ticker: string;
  name: string;
  last_price: number;
  close_price: number;
  type?: string;
}

export interface InstrumentWithReturn extends Instrument {
  return_rate: number;
}
