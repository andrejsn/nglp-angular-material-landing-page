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


    console.log(this.dialogRef.getState());
    

    this.dialogRef.close();

    console.log(this.dialogRef.getState());
    
  }

  submit() {

    if((this.dialogRef.getState() === 0) && ( this.nameFormControl.errors || this.phoneFormControl.errors || this.emailFormControl.errors )){
      this.snotifyService.error('ERROR !');

      return;
    }
    
    console.log("FORM SEND");
    console.log(this.nameFormControl.value);
    console.log(this.phoneFormControl.value);
    console.log(this.emailFormControl.value);
    console.log(this.contact.csrf);
   
    



    this.snotifyService.info('OK')



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


  private shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
 }
   
 



}
