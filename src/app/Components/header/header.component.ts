import { Component } from '@angular/core';
import { AddItemComponent } from '../items/add-item/add-item.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [AddItemComponent]
})
export class HeaderComponent {
  showAddModal: boolean = false;

  handleAddProduct(): void {
    this.showAddModal = true;
  }

  onModalClosed(): void {
    this.showAddModal = false;
  }
}
