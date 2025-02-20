import { Component, Input, Output, EventEmitter } from '@angular/core';

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
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {
  @Input() product!: Product;
  @Output() delete = new EventEmitter<number>();
  @Output() edit = new EventEmitter<number>();

  onDelete(): void {
    this.delete.emit(this.product.id);
  }

  onEdit(): void {
    this.edit.emit(this.product.id);
  }
}
