export interface WalletAllocation {
  ticker: string;
  quantity: number;
}

export interface CustomWallet {
  id: string;
  name: string;
  allocations: WalletAllocation[];
  createdAt: number;
}
