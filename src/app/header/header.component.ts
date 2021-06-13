import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "header-comp",
  template: `<header [class.header]="true" [class.invenrse]="!day">
    <h2 class="header__logo">Gallery</h2>
    <div class="header__timepiece">
      <h3 class="header__text">
        It is now <span class="header__time">{{ time }}</span
        >. But you can
      </h3>
      <button
        (click)="spin()"
        [class.header__button]="true"
        [class.header__button_spin]="!day"
      >
        spin
      </button>
      <h3 class="header__text">the planet 180 degrees</h3>
    </div>
  </header> `,
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  hours: number;
  mins: number;
  time: string;
  am: boolean;
  day: boolean;
  @Output() onChanged = new EventEmitter<boolean>();

  getTime() {
    const date = new Date();
    let hours = date.getHours();
    if (hours > 12) {
      this.hours = hours - 12;
      this.am = true;
    } else {
      this.hours = hours;
      this.am = false;
    }
    if ((this.hours < 7 && this.am) || (this.hours > 6 && !this.am)) {
      this.day = true;
    } else {
      this.day = false;
    }
    const mins = date.getMinutes();
    this.mins = mins;
    const string = `${this.hours}:${
      this.mins > 10 ? this.mins : "0" + this.mins
    } ${this.am ? "AM" : "PM"}`;
    this.time = string;
  }
  timer() {
    setInterval(() => {
      this.mins++;
      if (this.mins > 59) {
        this.mins = 0;
        this.hours++;
      }
      if (this.hours > 12) {
        this.hours = 1;
        this.hours++;
        this.am = !this.am;
      }
      const string = `${this.hours}:${
        this.mins > 10 ? this.mins : "0" + this.mins
      } ${this.am ? "AM" : "PM"}`;
      this.time = string;
    }, 60000);
  }

  spin() {
    this.am = !this.am;
    this.day = !this.day;
    const string = `${this.hours}:${this.mins} ${this.am ? "AM" : "PM"}`;
    this.time = string;
    this.onChanged.emit(this.day);
  }

  ngOnInit() {
    this.getTime();
    this.timer();
  }
}
