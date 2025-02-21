import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Product } from '../../models/product.model';
import * as ProductActions from '../../store/product.actions';
import * as ProductSelectors from '../../store/product.selectors';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  standalone: true,
  imports: [CommonModule, ProductFormComponent]
})
export class ProductListComponent implements OnInit {
  products$: Observable<Product[]>;
  selectedProduct: Product | null = null;
  isFormVisible = false;

  constructor(private store: Store) {
    this.products$ = this.store.select(ProductSelectors.selectAllProducts);
  }

  ngOnInit() {
    this.store.dispatch(ProductActions.loadProducts());
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
    this.selectedProduct = null;
  }

  onAddProduct(product: Product) {
    if (this.selectedProduct) {
      const updatedProduct = {
        ...product,
        id: this.selectedProduct.id
      };
      this.store.dispatch(ProductActions.updateProduct({ product: updatedProduct }));
    } else {
      this.store.dispatch(ProductActions.addProduct({ product }));
    }
    this.hideForm();
  }

  onEditProduct(product: Product) {
    this.selectedProduct = { ...product };
    this.isFormVisible = true;
  }

  onDeleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.store.dispatch(ProductActions.deleteProduct({ id }));
      if (this.selectedProduct?.id === id) {
        this.selectedProduct = null;
      }
    }
  }
}