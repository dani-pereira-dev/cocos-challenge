import { render, screen, fireEvent } from '@testing-library/react-native';
import { WalletAssetList } from '../components/WalletAssetList/WalletAssetList';
import { EnrichedAllocation } from '../hooks/useWalletDetail';

jest.mock('expo-router', () => ({ router: { push: jest.fn() } }));

const { router } = jest.requireMock('expo-router') as { router: { push: jest.Mock } };

jest.mock('react-native-gesture-handler/ReanimatedSwipeable', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const { View } = require('react-native');
  return {
    __esModule: true,
    default: ({ children }: { children: React.ReactNode }) =>
      React.createElement(View, null, children),
  };
});

const allocations: EnrichedAllocation[] = [
  { ticker: 'GGAL', quantity: 5, currentValue: 750, holding: null },
  { ticker: 'BMA', quantity: 3, currentValue: 1200, holding: null },
];

beforeEach(() => {
  jest.clearAllMocks();
});

describe('WalletAssetList', () => {
  it('renders total valorizado label and value', async () => {
    await render(
      <WalletAssetList
        allocations={allocations}
        totalValue={1950}
        walletId="w-1"
        onDeleteAllocation={jest.fn()}
      />,
    );

    expect(screen.getByText('Total valorizado')).toBeTruthy();
    expect(screen.getByText('AR$ 1.950,00')).toBeTruthy();
  });

  it('renders all allocation tickers', async () => {
    await render(
      <WalletAssetList
        allocations={allocations}
        totalValue={1950}
        walletId="w-1"
        onDeleteAllocation={jest.fn()}
      />,
    );

    expect(screen.getByText('GGAL')).toBeTruthy();
    expect(screen.getByText('BMA')).toBeTruthy();
  });

  it('pressing add asset navigates to add-asset screen', async () => {
    await render(
      <WalletAssetList
        allocations={allocations}
        totalValue={1950}
        walletId="w-99"
        onDeleteAllocation={jest.fn()}
      />,
    );

    fireEvent.press(screen.getByText('Agregar activo'));
    expect(router.push).toHaveBeenCalledWith('/wallets/w-99/add-asset');
  });
});
