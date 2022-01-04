import {
  Component,
  OnInit,
  EventEmitter,
  Input,
  Output,
  OnChanges,
} from "@angular/core";

interface CardData {
  comments: string[];
  like: boolean;
  source: string;
}

interface PopupData {
  flag: boolean;
  data: CardData;
}

class Card {
  like: boolean;
  source: string;
  comments: string[];

  constructor(source: string) {
    this.like = false;
    this.source = source;
    this.comments = [];
  }

  getCard() {
    const obj = {
      like: this.like,
      source: this.source,
      comments: this.comments,
    };
    return obj;
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
      (click)="openPopup(item.getCard())"
    />
  `,
  styleUrls: ["./cards.component.css"],
})
export class CardsComponent implements OnInit, OnChanges {
  items: Card[] = [];
  @Input() popupOpened: boolean;
  @Input() day: boolean;
  stringDay = String(new Date().getHours() < 19 && new Date().getHours() > 6);
  popupNeedOpen: boolean = false;
  @Output() onChanged = new EventEmitter<PopupData>();
  initialCards() {
    this.items = [];
    for (let i = 1; i <= 20; i++) {
      let number;
      if (i < 10) {
        number = "0" + i;
      } else {
        number = i;
      }
      const source: string = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${
        this.day ? "afternoon" : "night"
      }/${number}.jpg`;
      const card = new Card(source);
      this.items.push(card);
    }
  }

  openPopup(attr) {
    const obj = {
      flag: this.popupNeedOpen,
      data: attr,
    };
    if (this.popupOpened === this.popupNeedOpen) {
      this.popupNeedOpen = !this.popupNeedOpen;
      this.onChanged.emit(obj);
    } else {
      this.popupNeedOpen = !this.popupNeedOpen;
      this.openPopup(attr);
    }
  }

  changeCards() {
    if (this.stringDay !== String(this.day)) {
      this.initialCards();
      this.stringDay = String(this.day);
    }
  }

  ngOnInit() {
    this.initialCards();
  }

  ngOnChanges() {
    this.changeCards();
  }
}
