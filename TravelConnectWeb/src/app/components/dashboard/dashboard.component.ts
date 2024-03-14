import { Component, ElementRef, ViewChild } from '@angular/core';
import { JourneyService } from '../../services/journey/journey.service';
import {  FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Journey } from '../../models/journey,model';
import { JourneyComponent } from "../journey/journey.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: [ReactiveFormsModule, JourneyComponent]
})
export class DashboardComponent {
  @ViewChild('errorModal') modalError!: ElementRef;

  journey: Journey = new Journey();
  formSearch: FormGroup;
  isLoading: boolean = false;
  errorJourney!: string;
  messageErrors: { origin: string, destination: string } = { origin: '', destination: '' };

  constructor(private journeyService: JourneyService, private formBuilder: FormBuilder) {
    this.formSearch = this.formBuilder.group({
      origin: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    }, {validators: this.originDestinationValidator});
  }

  originDestinationValidator(formGroup: FormGroup) {
    const origin = formGroup.get('origin')!.value;
    const destination = formGroup.get('destination')!.value;
  
    if (origin === destination) {
      return { originDestinationMismatch: true };
    } else {
      return null;
    }
  }
  searchJourney() {
    if (this.formSearch.valid) {
      this.isLoading = true;
      const origin = this.formSearch.get("origin")?.value.toUpperCase();
      const destination = this.formSearch.get("destination")?.value.toUpperCase();
      this.journeyService.getData(origin, destination).subscribe(
        (data) => {
          this.journey = data;
          this.isLoading = false;
        },
        (error) => {
          this.journey= new Journey();
          this.isLoading = false;
          this.errorJourney = error.error;
          this.openModal();
        }
      );
    } else {
      this.validateInput();
    }
  }

  validateInput() {
    const regex = /^[A-Za-z]+$/;
    var origin = this.formSearch.get("origin")?.value;
    var destination = this.formSearch.get("destination")?.value;
    if (!regex.test(origin) || !regex.test(destination)) {
        origin = origin.replace(/[^A-Za-z]/g, '');
        destination = destination.replace(/[^A-Za-z]/g, '');
    }
    this.formSearch.setValue({
      origin: origin.toUpperCase(),
      destination: destination.toUpperCase()
    });

    this.messageErrors.origin = this.getErrorMessage(origin, 'origin');
    this.messageErrors.destination = this.getErrorMessage(destination, 'destination');
  }

  getErrorMessage(value: string, field: string) {
    if (!value) return "Please enter a " + field;
    if (value.length < 3) return "The " + field + " must have exactly 3 letters";
    if (/[0-9\W]/.test(value)) return "Only letters are allowed";
    if (field == 'destination' && value.length ==3 ){
      const origin = this.formSearch.get("origin")?.value.toUpperCase();
      const destination = this.formSearch.get("destination")?.value.toUpperCase();
      if (origin == destination) return  "the destination must be different from origin"
    }
    return "";
  }

  openModal() {
    this.modalError.nativeElement.classList.add('show');
    this.modalError.nativeElement.style.display = 'block';
  }

  closeModal() {
    this.modalError.nativeElement.classList.remove('show');
    this.modalError.nativeElement.style.display = 'none';
  }
}
