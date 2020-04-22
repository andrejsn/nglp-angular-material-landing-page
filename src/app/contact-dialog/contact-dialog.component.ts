import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Contact } from '../contact/contact';

import { first } from "rxjs/operators";
import { ContactService } from '../contact.service';
import { SnotifyService } from 'ng-snotify';

/** Error when invalid control is dirty, touched, or submitted. */
export class NgLpErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-contact-dialog',
  templateUrl: './contact-dialog.component.html',
  styleUrls: ['./contact-dialog.component.css']
})
export class ContactDialogComponent implements OnInit {

  nameFormControl = new FormControl('', [
    Validators.required
  ]);

  phoneFormControl = new FormControl('', [
    Validators.required
  ]);

  emailFormControl = new FormControl('', [
    Validators.required,
    Validators.email,
  ]);

  checkFormControl = new FormControl();

  matcher = new NgLpErrorStateMatcher();

  contact: Contact;

  constructor(
    private contactService: ContactService,
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    private snotifyService: SnotifyService
  ) { }

  ngOnInit(): void {
    this.contact = new Contact();

    // first get ip
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
                this.dialogOff();
              }
            )
        },
        error => {
          this.contact.ip = 'an error occurred: ' + error;
        }
      )
  }

  /**
   * send contact form to  server
   */
  submit() {

    if (
      (this.dialogRef.getState() === 0) &&
      (
        this.nameFormControl.errors ||
        this.phoneFormControl.errors ||
        this.emailFormControl.errors
      )
    ) {
      this.snotifyService.error('');

      return;
    }

    this.contact.name = this.nameFormControl.value;
    this.contact.phone = this.phoneFormControl.value;
    this.contact.email = this.emailFormControl.value;

    //console.log("FORM SEND");

    this.contactService.contact(this.contact)
      .pipe(first())
      .subscribe(
        data => {
          // console.log(data);
          if (data['error']) {
            this.snotifyService.error(data['error']);
          } else {
            this.snotifyService.success('');
            // close dialog
            this.dialogOff();
          }
        },
        error => {
          // console.log(error);
          this.snotifyService.error('');
        }
      )
  }

  /**
   * close contact dialog
   */
  dialogOff(): void {
    this.dialogRef.close();
  }
}
