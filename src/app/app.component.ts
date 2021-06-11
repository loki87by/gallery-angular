import { Component } from "@angular/core";

@Component({
  selector: "gallery-body",
  template: `
  <div className="page">
    <header-comp></header-comp>
    <main-comp></main-comp>
    <footer-comp></footer-comp>
</div>`,
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  
}
