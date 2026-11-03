import { CustomWallet, WalletAllocation } from '@/domain/entities/wallet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Crypto from 'expo-crypto';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface WalletsState {
  wallets: CustomWallet[];
  createWallet: (name: string) => CustomWallet;
  renameWallet: (id: string, name: string) => void;
  deleteWallet: (id: string) => void;
  upsertAllocation: (walletId: string, allocation: WalletAllocation) => void;
  removeAllocations: (walletId: string, tickers: string[]) => void;
}

export const useWalletsStore = create<WalletsState>()(
  persist(
    (set) => ({
      wallets: [],

      createWallet: (name) => {
        const wallet: CustomWallet = {
          id: Crypto.randomUUID(),
          name,
          allocations: [],
          createdAt: Date.now(),
        };
        set((state) => ({ wallets: [...state.wallets, wallet] }));
        return wallet;
      },

      renameWallet: (id, name) =>
        set((state) => ({
          wallets: state.wallets.map((wallet) => (wallet.id === id ? { ...wallet, name } : wallet)),
        })),

      deleteWallet: (id) =>
        set((state) => ({ wallets: state.wallets.filter((wallet) => wallet.id !== id) })),

      upsertAllocation: (walletId, allocation) =>
        set((state) => ({
          wallets: state.wallets.map((wallet) => {
            if (wallet.id !== walletId) return wallet;
            const exists = wallet.allocations.some((alloc) => alloc.ticker === allocation.ticker);
            const allocations = exists
              ? wallet.allocations.map((alloc) =>
                  alloc.ticker === allocation.ticker ? allocation : alloc,
                )
              : [...wallet.allocations, allocation];
            return { ...wallet, allocations };
          }),
        })),

      removeAllocations: (walletId, tickers) =>
        set((state) => ({
          wallets: state.wallets.map((wallet) =>
            wallet.id !== walletId
              ? wallet
              : {
                  ...wallet,
                  allocations: wallet.allocations.filter(
                    (alloc) => !tickers.includes(alloc.ticker),
                  ),
                },
          ),
        })),
    }),
    {
      name: 'cocos-wallets',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
