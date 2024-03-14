import { Component, Input } from '@angular/core';
import { CurrencyPipePipe } from "../../pipes/currency-pipe.pipe";
import { Journey } from '../../models/journey,model';

@Component({
    selector: 'app-journey',
    standalone: true,
    templateUrl: './journey.component.html',
    styleUrl: './journey.component.css',
    imports: [CurrencyPipePipe]
})
export class JourneyComponent {
  @Input() journey!: Journey;
}
