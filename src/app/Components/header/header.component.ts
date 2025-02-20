import { Component } from '@angular/core';
import { AddItemComponent } from '../items/add-item/add-item.component';

@Component({
  selector: 'app-header',
  imports: [AddItemComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  standalone: true
})
export class HeaderComponent {
  addProduct: boolean = false;

  handleAddProduct() {
    this.addProduct = true;
  }
}
