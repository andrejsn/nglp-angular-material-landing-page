import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Contact } from './contact';
import { SnotifyService } from 'ng-snotify';
import { MatCheckboxChange } from '@angular/material/checkbox';

/** Error when invalid control is dirty, touched, or submitted. */
export class NgLpErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  @ViewChild("contactForm") contactForm: NgForm;

  isRobot = true;
  isSubmitDisabled = false;

  contactFormGroup = new FormGroup(
    {
      nameFormControl: new FormControl('', [
        Validators.required
      ]),
      phoneFormControl: new FormControl('', [
        Validators.required
      ]),
      emailFormControl: new FormControl('', [
        Validators.required,
        Validators.email,
      ]),
      messageFormControl: new FormControl('', []),
      robotFormControl: new FormControl()
    }
  );

  matcher = new NgLpErrorStateMatcher();

  contact = new Contact();


  constructor(private snotifyService: SnotifyService) { }

  ngOnInit() { }

  onSubmit() {

    console.log(this.contactFormGroup.get('robotFormControl').value);



    if (this.contactFormGroup.get('nameFormControl').errors ||
      this.contactFormGroup.get('phoneFormControl').errors ||
      this.contactFormGroup.get('emailFormControl').errors) {
      this.snotifyService.error('ERROR !');
      return;
    }


    if (this.isRobot) {
      this.isRobot = false;
      this.isSubmitDisabled = true;
      return;
    }


    console.log("FORM SEND");

    this.snotifyService.info('OK');

    this.reset();
  }

  setSubmitButton(event: MatCheckboxChange) {
    this.isSubmitDisabled = !event.checked;
  }

  private reset() {
    // reset robot
    this.isRobot = true;

    // reset form
    this.contactFormGroup.reset();
    this.contactForm.resetForm();
  }

}
