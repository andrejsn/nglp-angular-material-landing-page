import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DirectivesModule } from "./directives/directives.module";
import { Material2Module } from "./material2.module";
import { RoundProgressModule } from "angular-svg-round-progressbar";
import {Angular2ImageGalleryModule} from "angular2-image-gallery";

import { AppComponent } from "./app.component";
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { AboutComponent } from "./about/about.component";
import { HeadingComponent } from "./heading/heading.component";
import { PricingComponent } from "./pricing/pricing.component";
import { BlogComponent } from "./blog/blog.component";
import { ContactComponent } from "./contact/contact.component";
import { ContactDialogComponent } from "./contact-dialog/contact-dialog.component";
import { WorkingComponent } from "./working/working.component";
import { RangesComponent } from "./ranges/ranges.component";
import { GalleryComponent } from './gallery/gallery.component';

@NgModule({
  declarations: [
    AppComponent,
    PortfolioComponent,
    AboutComponent,
    HeadingComponent,
    PricingComponent,
    BlogComponent,
    ContactComponent,
    ContactDialogComponent,
    WorkingComponent,
    RangesComponent,
    GalleryComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    Material2Module,
    FlexLayoutModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    RoundProgressModule,
    Angular2ImageGalleryModule
  ],
  providers: [],
  entryComponents: [ContactDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
