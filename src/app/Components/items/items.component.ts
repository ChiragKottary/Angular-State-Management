import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemComponent } from "./item/item.component";
import { AddItemComponent } from './add-item/add-item.component';
import { ItemsService, Item } from './services/items.service';
import { Observable } from 'rxjs';

declare var bootstrap: any;

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [CommonModule, ItemComponent, AddItemComponent],
  standalone: true
})
export class ItemsComponent implements OnInit {
  products$: Observable<Item[]>;
  selectedProduct: Item | null = null;

  constructor(private itemsService: ItemsService) {
    this.products$ = this.itemsService.items$;
  }

  ngOnInit(): void {}

  deleteProduct(id: string): void {
    this.itemsService.deleteItem(id).subscribe({
      error: error => console.error('Error deleting product:', error)
    });
  }

  editProduct(id: string): void {
    this.products$.subscribe(products => {
      this.selectedProduct = products.find(p => p.id === id) || null;
      if (this.selectedProduct) {
        const modal = document.getElementById('editProductModal');
        if (modal) {
          const bootstrapModal = new bootstrap.Modal(modal);
          bootstrapModal.show();
        }
      }
    });
  }

  onItemUpdated(): void {
    this.selectedProduct = null;
    const modal = document.getElementById('editProductModal');
    if (modal) {
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  }

  onItemAdded(): void {
    const modal = document.getElementById('addProductModal');
    if (modal) {
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      if (bootstrapModal) {
        bootstrapModal.hide();
      }
    }
  }
}
