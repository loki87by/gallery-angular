import { Component } from "@angular/core";

@Component({
  selector: "gallery-body",
  template: ` <div className="page">
    <header-comp
    (onChanged)="onChanged($event)"></header-comp>
    <main-comp [am]="isAm"></main-comp>
    <footer-comp [am]="isAm"></footer-comp>
  </div>`,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
isAm: boolean = new Date().getHours() > 12;
  onChanged(value: boolean) {
    this.isAm = value;
  }
}
