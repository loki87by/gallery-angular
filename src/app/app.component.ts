import { Component } from "@angular/core";

@Component({
  selector: "gallery-body",
  template: ` <div className="page">
    <header-comp (onChanged)="onChanged($event)"></header-comp>
    <main-comp [day]="isDay"></main-comp>
    <footer-comp [day]="isDay"></footer-comp>
  </div>`,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  isDay: boolean = new Date().getHours() < 19 && new Date().getHours() > 6;
  onChanged(value: boolean) {
    this.isDay = value;
  }
}
