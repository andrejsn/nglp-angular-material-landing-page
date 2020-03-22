/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, Inject, OnInit } from '@angular/core';
import { SE } from './directives/scroll.directive';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ContactDialogComponent } from './contact-dialog/contact-dialog.component';
import { LanguageDialogComponent} from './language-dialog/language-dialog.component';
import { DOCUMENT } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnDestroy {
  contactFabButton: any;
  languageFabButton: any;

  bodyelement: any;
  sidenavelement: any;

  isActive = false;
  isActivefadeInDown = true;
  fixedTolbar = true;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(
    @Inject(DOCUMENT) document,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public dialog: MatDialog,
    public translate: TranslateService
  ) {
    this.mobileQuery = media.matchMedia("(max-width: 600px)");
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    translate.addLangs(['en', 'de', 'lv', 'ru']);
    translate.setDefaultLang('en');
    const browserLang = translate.getBrowserLang();
    translate.use(browserLang.match(/en|de|lv|ru/) ? browserLang : 'en');
    translate.use('ru');
  }

  public detectScroll(event: SE) {
    if (event.header) {
      this.isActive = false;
      this.isActivefadeInDown = true;
      this.fixedTolbar = true;
    }

    if (event.bottom) {
      this.isActive = true;
      this.isActivefadeInDown = false;
      this.fixedTolbar = false;
    }
  }

  openContactDialog(): void {
    const dialogRef = this.dialog.open(ContactDialogComponent, {
      width: "250px"
    });
  }

  openLanguageDialog(): void {
    const dialogRef = this.dialog.open(LanguageDialogComponent, {
      width: "250px"
    });
  }

  // used for gallery display only
  setzIndex(z: string) {
    document.getElementById("navi").style.zIndex = z;
  }

  setToggleOn() {
    this.bodyelement = document.getElementById("nglpage");
    this.bodyelement.classList.add("scrollOff");
    this.contactFabButton = document.getElementById("contact-fab-button");
    this.contactFabButton.style.display = "none";
    this.languageFabButton = document.getElementById("language-fab-button");
    this.languageFabButton.style.display = "none";
  }

  setToggleOff() {
    this.bodyelement = document.getElementById("nglpage");
    this.bodyelement.classList.remove("scrollOff");
    this.contactFabButton = document.getElementById("contact-fab-button");
    this.contactFabButton.removeAttribute("style");
    this.languageFabButton = document.getElementById("language-fab-button");
    this.languageFabButton.removeAttribute("style");
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}