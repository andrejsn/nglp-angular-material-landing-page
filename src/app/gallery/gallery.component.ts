import { Component, OnInit, Inject } from "@angular/core";
import { AppComponent } from "../app.component";

@Component({
  selector: "app-gallery",
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent implements OnInit {
  constructor(private navi: AppComponent) {}

  ngOnInit(): void {}

  f(event) {    
    if(event){
      // hide navi menu
      this.navi.setzIndex('0')
    }else {
      // show navi menu
      this.navi.setzIndex('2')
    }
    
  }
}
