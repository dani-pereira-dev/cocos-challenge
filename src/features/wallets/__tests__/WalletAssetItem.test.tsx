import { render, screen } from '@testing-library/react-native';
import { WalletAssetItem } from '../components/WalletAssetItem/WalletAssetItem';
import { EnrichedAllocation } from '../hooks/useWalletDetail';

jest.mock('react-native-gesture-handler/ReanimatedSwipeable', () => {
  const React = require('react');
  const { View } = require('react-native');
  return { __esModule: true, default: ({ children }: { children: React.ReactNode }) => React.createElement(View, null, children) };
});

const baseAllocation: EnrichedAllocation = {
  ticker: 'GGAL',
  quantity: 10,
  currentValue: 1500,
  holding: null,
};

describe('WalletAssetItem', () => {
  it('renders ticker and quantity', async () => {
    await render(<WalletAssetItem allocation={baseAllocation} />);

    expect(screen.getByText('GGAL')).toBeTruthy();
    expect(screen.getByText('10 cuotapartes')).toBeTruthy();
  });

  it('renders formatted current value', async () => {
    await render(<WalletAssetItem allocation={baseAllocation} />);

    expect(screen.getByText('AR$ 1.500,00')).toBeTruthy();
  });

  it('renders holding last price when available', async () => {
    const allocation: EnrichedAllocation = {
      ...baseAllocation,
      holding: {
        instrument_id: 1,
        ticker: 'GGAL',
        quantity: 10,
        last_price: 150,
        close_price: 145,
        avg_cost_price: 140,
        market_value: 1500,
        gain_amount: 100,
        gain_percent: 0.07,
      },
    };
    await render(<WalletAssetItem allocation={allocation} />);

    expect(screen.getByText('AR$ 150,00')).toBeTruthy();
  });

  it('does not render holding price when holding is null', async () => {
    await render(<WalletAssetItem allocation={baseAllocation} />);

    expect(screen.queryByText('AR$ 150,00')).toBeNull();
  });

  it('renders singular cuotaparte for quantity 1', async () => {
    await render(<WalletAssetItem allocation={{ ...baseAllocation, quantity: 1 }} />);

    expect(screen.getByText('1 cuotaparte')).toBeTruthy();
  });
});
