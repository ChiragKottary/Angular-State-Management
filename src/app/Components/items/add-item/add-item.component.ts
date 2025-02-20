import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ItemsService, Item } from '../services/items.service';
import { v4 as uuidv4 } from 'uuid';
declare var bootstrap: any;

@Component({
  selector: 'app-add-item',
  imports: [FormsModule, CommonModule],
  templateUrl: './add-item.component.html',
  styleUrl: './add-item.component.scss',
  standalone: true
})
export class AddItemComponent {
  @Input() editMode: boolean = false;
  @Input() set editItem(item: Item | null) {
    if (item) {
      this.newItem = { ...item };
    }
  }
  @Output() itemAdded = new EventEmitter<void>();
  @Output() itemUpdated = new EventEmitter<void>();
  
  newItem: Item = {
    id: '',
    name: '',
    category: '',
    price: 0,
    quantity: 0,
    description: '',
    imageUrl: ''
  }

  private modal: any;

  constructor(private itemsService: ItemsService) {}

  async handleSubmit() {
    try {
      if (this.editMode) {
        await this.itemsService.updateItem(this.newItem);
        this.itemUpdated.emit();
      } else {
        await this.itemsService.addItem(this.newItem);
        this.itemAdded.emit();
      }
      
      // Close the modal
      const modalElement = document.getElementById(this.editMode ? 'editProductModal' : 'addProductModal');
      if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal?.hide();
      }

      // Reset form
      this.newItem = {
        id: '',
        name: '',
        category: '',
        price: 0,
        quantity: 0,
        description: '',
        imageUrl: ''
      };
    } catch (error) {
      console.error('Error saving item:', error);
    }
  }
}
