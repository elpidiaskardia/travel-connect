import { CurrencyPipePipe } from './currency-pipe.pipe';
import { CurrencyService } from '../services/currency/currency.service';
import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';

describe('CurrencyPipePipe', () => {
  let pipe: CurrencyPipePipe;
  let currencyService: CurrencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CurrencyPipePipe, CurrencyService]
    });
    pipe = TestBed.inject(CurrencyPipePipe);
    currencyService = TestBed.inject(CurrencyService);
  });

  afterEach(() => {
    pipe.ngOnDestroy();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform price correctly', () => {
    const mockPrice = 100;
    const mockCurrency = 'USD';

    spyOn(currencyService, 'convert').and.returnValue(1000);

    const transformedValue = pipe.transform(mockPrice);

    expect(transformedValue).toBe(`1000 ${mockCurrency}`);
  });

});