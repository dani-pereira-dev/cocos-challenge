import { render, screen, fireEvent } from '@testing-library/react-native';
import { WalletEmptyContent } from '../components/WalletEmptyContent/WalletEmptyContent';

jest.mock('expo-router', () => ({ router: { push: jest.fn() } }));

const { router } = jest.requireMock('expo-router') as { router: { push: jest.Mock } };

beforeEach(() => {
  jest.clearAllMocks();
});

describe('WalletEmptyContent', () => {
  it('renders empty state title and body', async () => {
    await render(<WalletEmptyContent walletId="wallet-1" />);

    expect(screen.getByText('Asigná activos a tu cartera')).toBeTruthy();
    expect(screen.getByText('Elegí los instrumentos de tu portfolio que querés asignar a esta cartera.')).toBeTruthy();
  });

  it('renders the add assets button', async () => {
    await render(<WalletEmptyContent walletId="wallet-1" />);

    expect(screen.getByText('Agregar activos')).toBeTruthy();
  });

  it('pressing add assets navigates to add-asset screen', async () => {
    await render(<WalletEmptyContent walletId="wallet-42" />);

    fireEvent.press(screen.getByText('Agregar activos'));
    expect(router.push).toHaveBeenCalledWith('/wallets/wallet-42/add-asset');
  });
});
