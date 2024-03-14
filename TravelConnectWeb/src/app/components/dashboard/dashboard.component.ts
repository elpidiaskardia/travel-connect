import { Component } from '@angular/core';
import { JourneyService } from '../../services/journey/journey.service';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  journey: Journey = new Journey;
  origin: string = '';
  destination:string = '';
  formSearch: FormGroup;
  buttonPressed: boolean = false;
  isLoading: boolean = false;
  messageErrorOrigin:string = "";
  messageErrorDestination:string = "";
  constructor(private journeyService: JourneyService,private formBuilder: FormBuilder) {
    this.formSearch = this.formBuilder.group({
      origin: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]],
      destination: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    }, { validator: this.originDestinationValidator });
  }

  originDestinationValidator(control: AbstractControl) {
    const origin = control.get('origin');
    const destination = control.get('destination');

    if (origin && destination && origin.value == destination.value) {
      return { originDestinationValidator: true };
    } else {

      return null;
    }
  }
  onInputChange(): void {
    if (this.buttonPressed){
      this.errosInput();

    }
  }
  searchJourney() {
    this.buttonPressed = true;
    if (this.formSearch.valid) {
      this.isLoading = true;
      this.journeyService.getData(this.formSearch.get("origin")?.value, this.formSearch.get("destination")?.value).subscribe(
        (data) => {
        this.journey = data;
        this.isLoading = false;
      }, (error) => {
        this.isLoading = false;
      
      });
    }else{
      this.errosInput();
    }
  }

  
  errosInput(){
    this.messageErrorDestination="";
    this.messageErrorOrigin="";
    if (this.origin.length<3 && this.origin.length!=0){
      this.messageErrorOrigin+="The origin must have exactly 3 letters  ";
    }
    if (this.origin.length==0){
      this.messageErrorOrigin+="Please enter an origin  ";
    }
    if (this.destination.length<3 && this.destination.length!=0){
      this.messageErrorDestination+="The destination must have exactly 3 letters  ";
    }
    if (this.destination.length==0){
      this.messageErrorDestination+="Please enter an destination  ";
    }
    if (this.destination==this.origin && this.destination.length!=0){
      this.messageErrorDestination+="The destination must be different from the origin  ";
    }
    if (/[0-9\W]/.test(this.destination) ){
      this.messageErrorDestination+="Only letters  ";
    }
    if (/[0-9\W]/.test(this.origin)){
      this.messageErrorOrigin+="Only letters  ";
    }
  }
  containNumbers(inputString: string): boolean {
    for (const char of inputString) {
      if (/\d/.test(char)) {
        return true;
      }
    }
    return false;
  }
}
