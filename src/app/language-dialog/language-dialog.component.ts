import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-language-dialog",
  templateUrl: "./language-dialog.component.html",
  styleUrls: ["./language-dialog.component.css"]
})
export class LanguageDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<LanguageDialogComponent>,
    public translate: TranslateService
  ) {}

  ngOnInit() {}

  dialogOff(): void {
    this.dialogRef.close();
  }
}
