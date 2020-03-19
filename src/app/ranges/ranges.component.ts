import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-ranges",
  templateUrl: "./ranges.component.html",
  styleUrls: ["./ranges.component.css"]
})
export class RangesComponent implements OnInit {
  support = 0;
  support_ = 20;

  testing = 0;
  testing_ = 45;

  development = 0;
  development_ = 35;

  constructor() {}

  ngOnInit() {
    this.resetRanges();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  resetRanges() {
    this.support = 0;
    this.testing = 0;
    this.development = 0;

    (async () => {
      do {
        this.support++;
        this.testing++;
        this.development++;
        await this.delay(50);
      } while (this.support < this.support_);

      do {
        this.testing++;
        this.development++;
        await this.delay(50);
      } while (this.development < this.development_);

      do {
        this.testing++;
        await this.delay(50);
      } while (this.testing < this.testing_);
    })();
  }
}
