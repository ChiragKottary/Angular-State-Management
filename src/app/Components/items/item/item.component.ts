import { Component, Input, Output, EventEmitter } from '@angular/core';

interface Item {
  id: string;
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
  @Input() product!: Item;
  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<string>();

  onDelete(): void {
    this.delete.emit(this.product.id);
  }

  onEdit(): void {
    this.edit.emit(this.product.id);
  }
}
