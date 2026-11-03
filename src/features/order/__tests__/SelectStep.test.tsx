import { render, screen, fireEvent } from '@testing-library/react-native';
import { SelectStep } from '../components/steps/SelectStep/SelectStep';
import { useOrderFormContext } from '../contexts/OrderFormContext';

jest.mock('../contexts/OrderFormContext');

const mockGoToForm = jest.fn();
const mockCloseOrder = jest.fn();

function buildContext(quantity: number | null | undefined) {
  return {
    instrument: { ticker: 'GGAL', name: 'Grupo Galicia', last_price: 100, quantity },
    goToForm: mockGoToForm,
    closeOrder: mockCloseOrder,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('SelectStep', () => {
  it('renders buy, sell and cancel buttons', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext(10));
    await render(<SelectStep />);

    expect(screen.getByText('Comprar')).toBeTruthy();
    expect(screen.getByText('Vender')).toBeTruthy();
    expect(screen.getByText('Cancelar')).toBeTruthy();
  });

  it('sell button does not trigger action when quantity is null', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext(null));
    await render(<SelectStep />);

    fireEvent.press(screen.getByText('Vender'));
    expect(mockGoToForm).not.toHaveBeenCalled();
  });

  it('sell button is disabled when quantity is 0', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext(0));
    await render(<SelectStep />);

    fireEvent.press(screen.getByText('Vender'));
    expect(mockGoToForm).not.toHaveBeenCalled();
  });

  it('pressing buy calls goToForm with BUY', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext(5));
    await render(<SelectStep />);

    fireEvent.press(screen.getByText('Comprar'));
    expect(mockGoToForm).toHaveBeenCalledWith('BUY');
  });

  it('pressing sell calls goToForm with SELL when quantity > 0', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext(5));
    await render(<SelectStep />);

    fireEvent.press(screen.getByText('Vender'));
    expect(mockGoToForm).toHaveBeenCalledWith('SELL');
  });

  it('pressing cancel calls closeOrder', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext(5));
    await render(<SelectStep />);

    fireEvent.press(screen.getByText('Cancelar'));
    expect(mockCloseOrder).toHaveBeenCalled();
  });
});
