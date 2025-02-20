import { Injectable } from '@angular/core';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { map, tap, catchError, switchMap } from 'rxjs/operators';

export interface Item {
  id:  string;
  name: string;
  category: string;
  price: number;
  quantity: number;
  description: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  private apiUrl = 'http://localhost:3000/products';
  private itemsSubject = new BehaviorSubject<Item[]>([]);
  items$ = this.itemsSubject.asObservable();

  constructor() {
    this.loadItems();
  }

  private handleError(error: any): never {
    console.error('API Error:', error);
    throw error;
  }

  private loadItems(): void {
    from(fetch(this.apiUrl))
      .pipe(
        map(response => {
          if (!response.ok) {
            throw new Error(`Failed to fetch items: ${response.statusText}`);
          }
          return response.json();
        }),
        switchMap(promise => from(promise)),
        map(data => {
          if ('products' in data) {
            return data.products as Item[];
          }
          return data as Item[];
        }),
        catchError(error => {
          this.handleError(error);
          return [];
        })
      )
      .subscribe({
        next: (items: Item[]) => {
          console.log('Loaded items:', items);
          this.itemsSubject.next(items);
        },
        error: error => console.error('Error loading items:', error)
      });
  }

  addItem(item: Item): Observable<Item> {
    const itemToAdd = { ...item }; // Create a copy to ensure ID is preserved
    return from(
      fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(itemToAdd),
      })
    ).pipe(
      map(response => {
        if (!response.ok) {
          throw new Error('Failed to add item');
        }
        return response.json();
      }),
      switchMap(promise => from(promise)),
      tap(() => {
        const currentItems = this.itemsSubject.value;
        this.itemsSubject.next([...currentItems, itemToAdd]); // Use our copy with the preserved ID
      })
    );
  }

  updateItem(item: Item): Observable<Item> {
    return from(
      fetch(`${this.apiUrl}/${item.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      })
    ).pipe(
      map(response => {
        if (!response.ok) {
          throw new Error('Failed to update item');
        }
        return response.json();
      }),
      switchMap(promise => from(promise)),
      tap(() => {
        const currentItems = this.itemsSubject.value;
        const updatedItems = currentItems.map(i => 
          i.id === item.id ? item : i
        );
        this.itemsSubject.next(updatedItems);
      })
    );
  }

  deleteItem(id: string): Observable<void> {
    return from(
      fetch(`${this.apiUrl}/${id}`, {
        method: 'DELETE',
      })
    ).pipe(
      map(response => {
        if (!response.ok) {
          throw new Error('Failed to delete item');
        }
      }),
      tap(() => {
        const currentItems = this.itemsSubject.value;
        const filteredItems = currentItems.filter(item => item.id !== id);
        this.itemsSubject.next(filteredItems);
      })
    );
  }
}
