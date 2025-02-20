import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ItemComponent } from "./item/item.component";

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
  imports: [CommonModule, ItemComponent]
})
export class ItemsComponent {
  products: Product[] = [];

  constructor() {
    this.loadProducts();
  }

  private loadProducts(): void {
    fetch('items.json')
      .then(response => response.json())
      .then(data => {
        this.products = data.products;
      })
      .catch(error => console.error('Error loading products:', error));
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(product => product.id !== id);
  }

  editProduct(id: number): void {
    console.log('Editing product:', id);
  }
}
