import { Component, Input, OnInit, OnChanges } from "@angular/core";

interface CardData {
  comments: string[];
  like: boolean;
  source: string;
}

interface PopupData {
  flag: boolean;
  data: CardData;
}

@Component({
  selector: "main-comp",
  template: `<main class="content">
      <img
        src="{{ background }}"
        alt="background"
        class="content__background"
      />
      <cards-comp
        [popupOpened]="popupOpened"
        [day]="day"
        class="content__container"
        (onChanged)="onChanged($event)"
      ></cards-comp>
    </main>
    <div [class.popup]="true" [class.popup_opened]="popupOpened">
      <figure class="popup__container">
        <button
          (click)="closePopup()"
          class="popup__close"
          aria-label="Закрыть"
        ></button>
        <div class="popup__image-container">
          <img src="{{ link }}" class="popup__image" alt="" />
        </div>
        <div [class.popup__image-content]="true" [class.invenrse]="!day">
          <button
            (click)="like()"
            [class.popup__like]="true"
            [class.popup__like_active]="isLiked"
            [class.popup__like-night]="!day"
            [class.popup__like-night_active]="!day && isLiked"
          ></button>
          <figcaption class="popup__image-title">{{ comments ? comments[comments.length - 1] : ''}}</figcaption>
          <button (click)="toggleInput()">Add New Comment</button>
          <input
            type="text"
            [class.popup__input]="true"
            [class.popup__input_hide]="!inputIsOpen"
            [class.invenrse]="!day"
            [(ngModel)]="text"
            placeholder="Введите текст"
          />
          <div
            [class.popup__buttons]="true"
            [class.popup__input_hide]="!inputIsOpen"
          >
            <button (click)="addItem(text)">Save</button>
            <button (click)="toggleInput()">Cancel</button>
          </div>
          <div class="popup__comments">
            <p class="popup__comments-item" *ngFor="let comment of comments">
              {{ comment }}
            </p>
          </div>
        </div>
      </figure>
    </div>`,
  styleUrls: ["./main.component.css"],
})
export class MainComponent implements OnInit, OnChanges {
  @Input() day: boolean =
    new Date().getHours() < 19 && new Date().getHours() > 6;
  background: string = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${
    this.day ? "afternoon" : "night"
  }/01.jpg`;
  count: number = 1;
  index: string;
  popupOpened: boolean = false;
  link: string;
  comments: string[];
  isLiked: boolean;
  inputIsOpen: boolean = false;
  text: string = "";
  changeBackground() {
    if (this.count === 20) {
      this.count = 1;
    }
    if (this.count < 10) {
      this.index = "0" + this.count;
    } else {
      this.index = String(this.count);
    }
    this.background = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${
      this.day ? "afternoon" : "night"
    }/${this.index}.jpg`;
  }

  timer() {
    setInterval(() => {
      this.count++;
      this.changeBackground();
    }, 60000);
  }

  onChanged(value: PopupData) {
    this.popupOpened = !value.flag;
    const { comments, like, source } = value.data;
    this.link = source;
    this.comments = comments;
    this.isLiked = like;
  }

  closePopup() {
    this.popupOpened = !this.popupOpened;
    this.inputIsOpen = false;
  }

  like() {
    this.isLiked = !this.isLiked;
  }

  toggleInput() {
    this.inputIsOpen = !this.inputIsOpen;
  }

  addItem(text: string): void {
    if (text == null || text.trim() == "") {
      this.toggleInput();
      return;
    }
    this.comments.push(text);
    this.toggleInput();
    this.text = "";
  }

  ngOnInit() {
    this.changeBackground();
    this.timer();
  }

  ngOnChanges() {
    this.changeBackground();
  }
}
