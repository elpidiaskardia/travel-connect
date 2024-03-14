import { TestBed } from '@angular/core/testing';
import { CurrencyService } from './currency.service';

describe('CurrencyService', () => {
  let service: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyService]
    });
    service = TestBed.inject(CurrencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set and get currency correctly', () => {
    const mockCurrency = 'EUR';

    service.setCurrency(mockCurrency);

    expect(service.selectedCurrency).toEqual(mockCurrency);
  });

  it('should convert amount correctly', () => {
    const mockAmount = 100;
    const mockCurrency = 'EUR';

    service.setCurrency(mockCurrency);

    const convertedAmount = service.convert(mockAmount);
    expect(convertedAmount).toEqual(94);

  });
});
