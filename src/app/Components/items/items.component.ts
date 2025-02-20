import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
declare var bootstrap: any;
import { ItemComponent } from "./item/item.component";
import { AddItemComponent } from './add-item/add-item.component';
import { ItemsService, Item } from './services/items.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [CommonModule, ItemComponent, AddItemComponent],
  standalone: true
})
export class ItemsComponent {
  products: Item[] = [];
  selectedProduct: Item | null = null;

  constructor(private itemsService: ItemsService) {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.products = await this.itemsService.getItems();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  async deleteProduct(id: number): Promise<void> {
    try {
      await this.itemsService.deleteItem(id);
      await this.loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  editProduct(id: number): void {
    this.selectedProduct = this.products.find(p => p.id === id) || null;
    const modal = document.getElementById('editProductModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  onItemUpdated(): void {
    this.loadProducts();
    this.selectedProduct = null;
  }
}
