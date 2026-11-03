import { render, screen, fireEvent } from '@testing-library/react-native';
import { FormStep } from '../components/steps/FormStep/FormStep';
import { useOrderFormContext } from '../contexts/OrderFormContext';

jest.mock('../contexts/OrderFormContext');
jest.mock('../components/steps/FormStep/SubSheet/SubSheet', () => ({ SubSheet: () => null }));

const mockHandleUseAll = jest.fn();
const mockSetStep = jest.fn();
const mockSetAmountInput = jest.fn();
const mockSetValidationError = jest.fn();

function buildContext(overrides: Record<string, unknown> = {}) {
  return {
    instrument: { ticker: 'GGAL', name: 'Grupo Galicia', last_price: 100, quantity: 5 },
    side: 'BUY',
    orderType: 'MARKET',
    setOrderType: jest.fn(),
    quantityMode: 'amount',
    setQuantityMode: jest.fn(),
    amountInput: '',
    setAmountInput: mockSetAmountInput,
    limitPriceInput: '',
    setLimitPriceInput: jest.fn(),
    validationError: null,
    setValidationError: mockSetValidationError,
    submitBlockReason: null,
    estimatedValid: false,
    isSubmitDisabled: true,
    showUseAll: false,
    cash: 5000,
    derivedTotal: 0,
    subSheet: null,
    setSubSheet: jest.fn(),
    goBack: jest.fn(),
    closeOrder: jest.fn(),
    handleUseAll: mockHandleUseAll,
    setStep: mockSetStep,
    ...overrides,
  };
}

beforeEach(() => {
  jest.clearAllMocks();
});

describe('FormStep', () => {
  it('submit button is disabled when isSubmitDisabled is true', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext({ isSubmitDisabled: true }));
    await render(<FormStep />);

    const button = screen.getByText('Siguiente');
    fireEvent.press(button);
    expect(mockSetStep).not.toHaveBeenCalled();
  });

  it('submit button advances to confirm when enabled', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext({ isSubmitDisabled: false }));
    await render(<FormStep />);

    fireEvent.press(screen.getByText('Siguiente'));
    expect(mockSetStep).toHaveBeenCalledWith('confirm');
  });

  it('shows "Usar todo" when showUseAll is true', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext({ showUseAll: true }));
    await render(<FormStep />);

    expect(screen.getByText('Usar todo')).toBeTruthy();
  });

  it('"Usar todo" calls handleUseAll', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext({ showUseAll: true }));
    await render(<FormStep />);

    fireEvent.press(screen.getByText('Usar todo'));
    expect(mockHandleUseAll).toHaveBeenCalled();
  });

  it('does not show "Usar todo" when showUseAll is false', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(buildContext({ showUseAll: false }));
    await render(<FormStep />);

    expect(screen.queryByText('Usar todo')).toBeNull();
  });

  it('shows validation error text', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(
      buildContext({ validationError: 'Ingresá una cantidad válida (mínimo 1 acción)' }),
    );
    await render(<FormStep />);

    expect(screen.getByText('Ingresá una cantidad válida (mínimo 1 acción)')).toBeTruthy();
  });

  it('shows submitBlockReason when exceeds cash', async () => {
    (useOrderFormContext as jest.Mock).mockReturnValue(
      buildContext({ submitBlockReason: 'El monto supera el efectivo disponible' }),
    );
    await render(<FormStep />);

    expect(screen.getByText('El monto supera el efectivo disponible')).toBeTruthy();
  });
});
