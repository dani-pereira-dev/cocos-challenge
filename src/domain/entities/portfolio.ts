export interface PortfolioAsset {
  id: number;
  ticker: string;
  name: string;
  quantity: number;
  last_price: number;
  avg_cost_price: number;
  type?: string;
}

export interface PortfolioAssetWithMetrics extends PortfolioAsset {
  market_value: number;
  gain_amount: number;
  gain_percent: number;
}
