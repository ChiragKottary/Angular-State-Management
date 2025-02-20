import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./Components/header/header.component";
import { ItemsComponent } from "./Components/items/items.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, ItemsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Retail-App';
}
