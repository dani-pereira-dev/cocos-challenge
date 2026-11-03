import { render, screen, fireEvent } from '@testing-library/react-native';
import { QuantityInputCard } from '../components/QuantityInputCard/QuantityInputCard';
import { PortfolioAssetWithMetrics } from '@/domain/entities/portfolio';

const holding: PortfolioAssetWithMetrics = {
  instrument_id: 1,
  ticker: 'GGAL',
  quantity: 10,
  last_price: 150,
  close_price: 145,
  avg_cost_price: 140,
  market_value: 1500,
  gain_amount: 100,
  gain_percent: 0.07,
};

const baseProps = {
  holding,
  quantityInput: '',
  exceedsHolding: false,
  onChangeText: jest.fn(),
  onUseAll: jest.fn(),
  onSubmit: jest.fn(),
};

beforeEach(() => {
  jest.clearAllMocks();
});

describe('QuantityInputCard', () => {
  it('shows available quantity label', async () => {
    await render(<QuantityInputCard {...baseProps} />);

    expect(screen.getByText('10 disponible')).toBeTruthy();
  });

  it('shows "Usar todo" button when holding is provided', async () => {
    await render(<QuantityInputCard {...baseProps} />);

    expect(screen.getByText('Usar todo')).toBeTruthy();
  });

  it('pressing "Usar todo" calls onUseAll', async () => {
    await render(<QuantityInputCard {...baseProps} />);

    fireEvent.press(screen.getByText('Usar todo'));
    expect(baseProps.onUseAll).toHaveBeenCalled();
  });

  it('shows error message when exceedsHolding is true', async () => {
    await render(<QuantityInputCard {...baseProps} exceedsHolding={true} />);

    expect(screen.getByText('Superás tu posición disponible (10)')).toBeTruthy();
  });

  it('shows price hint when not exceeding holding', async () => {
    await render(<QuantityInputCard {...baseProps} exceedsHolding={false} />);

    expect(screen.getByText(/150/)).toBeTruthy();
  });

  it('does not show available quantity when holding is undefined', async () => {
    await render(<QuantityInputCard {...baseProps} holding={undefined} />);

    expect(screen.queryByText(/disponible/)).toBeNull();
    expect(screen.queryByText('Usar todo')).toBeNull();
  });
});
