import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CurrencyService } from '../../services/currency/currency.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  selectedCurrency: string = 'USD';

  constructor(private currencyService: CurrencyService) {}

  setCurrency() {
    this.currencyService.setCurrency(this.selectedCurrency);
  }
}
