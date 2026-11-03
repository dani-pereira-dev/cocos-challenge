export interface PortfolioAsset {
  instrument_id: number;
  ticker: string;
  type?: string;
  quantity: number;
  last_price: number;
  close_price: number;
  avg_cost_price: number;
}

export interface PortfolioAssetWithMetrics extends PortfolioAsset {
  market_value: number;
  gain_amount: number;
  gain_percent: number;
}

export interface PortfolioResponse {
  cash: number;
  holdings: PortfolioAsset[];
}
