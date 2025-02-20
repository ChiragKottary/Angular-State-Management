import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Item } from '../services/items.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css'],
  standalone: true,
  imports: [CommonModule]
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
