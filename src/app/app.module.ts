import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { HeaderComponent } from './header/header.component';
import { MainComponent } from './main/main.component';
import { CardsComponent } from './cards/cards.component';
import { FooterComponent } from './footer/footer.component';
@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, HeaderComponent, MainComponent, CardsComponent, FooterComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
