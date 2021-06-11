import { Component, OnInit } from "@angular/core";

class Card {
  like: boolean;
  source: string;
  comments: string[];

  constructor(source: string) {
    this.like = false;
    this.source = source;
    this.comments = [];
  }
}

@Component({
  selector: "cards-comp",
  template: `
    <img
      *ngFor="let item of items"
      src="{{ item.source }}"
      alt="something image"
      class="card"
    />
  `,
  styleUrls: ["./cards.component.css"],
})
export class CardsComponent implements OnInit {
  items: Card[] = [];
  initialCards() {
    for (let i = 1; i <= 20; i++) {
      let number;
      if (i < 10) {
        number = "0" + i;
      } else {
        number = i;
      }
      const source: string = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/day/${number}.jpg`;
      const card = new Card(source);
      this.items.push(card);
    }
  }

  ngOnInit() {
    this.initialCards();
  }
}
