import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { DirectivesModule } from "./directives/directives.module";
import { Material2Module } from "./material2.module";
import { RoundProgressModule } from "angular-svg-round-progressbar";
import {Angular2ImageGalleryModule} from "angular2-image-gallery";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

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
import { FooterComponent } from './footer/footer.component';
import { LanguageDialogComponent } from './language-dialog/language-dialog.component'


export function HttpLoaderFactory(httpClient: HttpClient){
  return new TranslateHttpLoader(httpClient, environment.production + '/assets/i18n/', '-lang.json');
}


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
    GalleryComponent,
    FooterComponent,  
    LanguageDialogComponent,      
  ],
  imports: [
    BrowserModule,
    Material2Module,
    FlexLayoutModule,
    DirectivesModule,
    FormsModule,
    ReactiveFormsModule,
    RoundProgressModule,
    Angular2ImageGalleryModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [],
  entryComponents: [ContactDialogComponent, LanguageDialogComponent,],
  bootstrap: [AppComponent]
})
export class AppModule {}
