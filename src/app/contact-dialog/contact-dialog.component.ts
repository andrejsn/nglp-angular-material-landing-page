import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroup, FormGroupDirective, NgForm, FormControl, Validators } from '@angular/forms';
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

export interface DialogData {
  animal: string;
  name: string;
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

  matcher = new NgLpErrorStateMatcher();

  contact: Contact;

  constructor(
    private contactService: ContactService,
    public dialogRef: MatDialogRef<ContactDialogComponent>,
    private snotifyService: SnotifyService,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {

    this.contact = new Contact();

    this.contactService.hello()
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);

          this.contact.csrf = data['csrf_token'];
        },
        error => { }
      )

  }

  dialogOff(): void {
    this.dialogRef.close();
  }

  onSubmit() {

    console.log("FORM SEND");

    this.snotifyService.info('send form')



    this.contactService.contact()
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
        },
        error => {
          console.log(error);
        }
      )

  }

}
