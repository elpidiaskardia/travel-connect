import { Pipe, PipeTransform } from '@angular/core';
import { Subscription } from 'rxjs';
import { CurrencyService } from '../services/currency/currency.service';

@Pipe({
  name: 'currencyPipe',
  standalone: true,
  pure: false
})
export class CurrencyPipePipe implements PipeTransform {
  public value: string = ''
  private listen$: Array<Subscription> = []

  constructor(private currencyService: CurrencyService) {

  }

  transform(price: number): any  {
    const observer$ = this.currencyService.currency$
    .subscribe((currency) => {
      this.value = `${this.currencyService.convert(price)} ${currency}`;

    })
    this.listen$ = [observer$];
    return this.value;
  }
  ngOnDestroy(): void {
    this.listen$.forEach(a => a.unsubscribe())
  }

}