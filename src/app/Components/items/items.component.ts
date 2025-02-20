import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from "./item/item.component";
import { AddItemComponent } from './add-item/add-item.component';
import { ItemsService, Item } from './services/items.service';

declare var bootstrap: any;

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [CommonModule, ItemComponent, AddItemComponent],
  standalone: true
})
export class ItemsComponent implements OnInit {
  products: Item[] = [];
  selectedProduct: Item | null = null;

  constructor(private itemsService: ItemsService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  async loadProducts(): Promise<void> {
    try {
      this.products = await this.itemsService.getItems();
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  async deleteProduct(id: string): Promise<void> {
    try {
      await this.itemsService.deleteItem(id);
      await this.loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  }

  editProduct(id: string): void {
    this.selectedProduct = this.products.find(p => p.id === id) || null;
    if (this.selectedProduct) {
      const modal = document.getElementById('editProductModal');
      if (modal) {
        const bootstrapModal = new bootstrap.Modal(modal);
        bootstrapModal.show();
      }
    }
  }

  onItemUpdated(): void {
    this.loadProducts();
    this.selectedProduct = null;
    const modal = document.getElementById('editProductModal');
    if (modal) {
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  }
}
