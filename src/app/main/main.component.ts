import { Component, OnInit } from "@angular/core";

@Component({
  selector: "main-comp",
  template: `<main class="content">
    <img src="{{ source }}" alt="background" class="content__background" />
    <cards-comp class="content__container"></cards-comp>
  </main>`,
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit {
  source: string =
    "https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/01.jpg";
  count: number = 0;
  index: string;
  changeBackground() {
    if (this.count === 20) {
      this.count = 0;
    }
    if (this.count < 10) {
      this.index = "0" + this.count;
    } else {
      this.index = String(this.count);
      this.source = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/${this.index}.jpg`;
    }
  }
  timer() {
    setInterval(() => {
      this.count++;
      this.changeBackground();
    }, 60000);
  }

  ngOnInit() {
    this.changeBackground();
    this.timer();
  }
}
