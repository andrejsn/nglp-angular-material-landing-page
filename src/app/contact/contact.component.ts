import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Contact } from './contact';
import { SnotifyService } from 'ng-snotify';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ContactService } from '../contact.service';
import { first } from 'rxjs/operators';

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
  contact: Contact;

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

  constructor(
    private contactService: ContactService,
    private snotifyService: SnotifyService) { }

  ngOnInit() { }

  onSubmit() {
    // if errors - return
    if (this.contactFormGroup.get('nameFormControl').errors ||
      this.contactFormGroup.get('phoneFormControl').errors ||
      this.contactFormGroup.get('emailFormControl').errors) {
      this.snotifyService.error('');
      return;//~
    }

    // check: i am not robot
    if (this.isRobot) {
      this.isRobot = false;
      // create get ip & create token
      this.contact = new Contact();
      this.contactService.ip()
        .pipe(first())
        .subscribe(
          data => {
            // console.log(data);
            this.contact.ip = data['ip'];
            // get csrf
            this.contactService.hello(this.contact.ip)
              .pipe(first())
              .subscribe(
                data => {
                  // console.log(data);
                  this.contact.csrf = data['csrf'];
                },
                error => {
                  this.contact.csrf = 'an error occurred: ' + error;
                  this.snotifyService.error('');
                }
              )
          },
          error => {
            this.contact.ip = 'an error occurred: ' + error;
          }
        )

      // enabled send form & return
      this.isSubmitDisabled = true;
      return;//~
    }

    console.log("FORM SEND");
    this.contact.name = this.contactFormGroup.get('nameFormControl').value;
    this.contact.phone = this.contactFormGroup.get('phoneFormControl').value;
    this.contact.email = this.contactFormGroup.get('emailFormControl').value;
    this.contact.message = this.contactFormGroup.get('messageFormControl').value;

    this.contactService.contact(this.contact)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          if (data['error']) {
            this.snotifyService.error(data['error']);
          } else {
            this.snotifyService.success('');
          }
        },
        error => {
          // console.log(error);
          this.snotifyService.error('');
        }
      )

    // reset form
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
