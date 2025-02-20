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
  
  newItem: Item = this.getEmptyItem();

  constructor(private itemsService: ItemsService) {}

  private getEmptyItem(): Item {
    return {
      id: uuidv4(), // Generate ID when creating empty item
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      description: '',
      imageUrl: ''
    };
  }

  private closeModal() {
    const modalElement = document.getElementById(this.editMode ? 'editProductModal' : 'addProductModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      if (modal) {
        modal.hide();
      }
    }
  }

  handleSubmit() {
    if (this.editMode) {
      this.itemsService.updateItem(this.newItem).subscribe({
        next: () => {
          this.itemUpdated.emit();
          this.closeModal();
          this.resetForm();
        },
        error: error => {
          console.error('Error updating item:', error);
          // Add user feedback here
        }
      });
    } else {
      // No need to generate ID here as it's already set
      this.itemsService.addItem(this.newItem).subscribe({
        next: () => {
          this.itemAdded.emit();
          this.closeModal();
          this.resetForm();
        },
        error: error => console.error('Error adding item:', error)
      });
    }
  }

  private resetForm() {
    this.newItem = this.getEmptyItem(); // Use the helper method here too
  }
}
