import { Input, Component } from "@angular/core";

@Component({
  selector: "footer-comp",
  template: `<footer [class.footer]="true" [class.invenrse]=!am>
    <p class="footer__text">© 2021 Алексей Акулич</p>
  </footer>`,
  styleUrls: ["./footer.component.css"],
})
export class FooterComponent {
  @Input() am: boolean;
}
