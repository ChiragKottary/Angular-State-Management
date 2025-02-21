import { Component, EventEmitter, Output, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProductFormComponent implements OnInit, OnChanges {
  @Output() submitProduct = new EventEmitter<Product>();
  @Input() productToEdit: Product | null = null;
  @Input() isVisible = false;
  @Output() closeForm = new EventEmitter<void>();
  
  productForm: FormGroup;
  isEditing = false;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      category: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      description: [''],
      imageUrl: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['productToEdit'] && changes['productToEdit'].currentValue) {
      this.isEditing = true;
      this.productForm.patchValue(changes['productToEdit'].currentValue);
    } else if (changes['productToEdit'] && !changes['productToEdit'].currentValue) {
      this.resetForm();
    }
  }

  onSubmit() {
    if (this.productForm.valid) {
      const formValue = this.productForm.value;
      const product: Product = {
        ...formValue,
        id: this.productToEdit?.id || crypto.randomUUID()
      };
      this.submitProduct.emit(product);
      this.resetForm();
    }
  }

  resetForm() {
    this.isEditing = false;
    this.productForm.reset({
      name: '',
      category: '',
      price: 0,
      quantity: 0,
      description: '',
      imageUrl: ''
    });
  }

  cancelEdit() {
    this.resetForm();
    this.productToEdit = null;
    this.closeForm.emit();
  }
}