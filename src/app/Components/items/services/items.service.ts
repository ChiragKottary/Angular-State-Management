import { Injectable } from '@angular/core';

export interface Item {
  id: number;
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
  
  constructor() { }

  async getItems(): Promise<Item[]> {
    const response = await fetch(this.apiUrl);
    return response.json();
  }

  async addItem(item: Item): Promise<Item> {
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return response.json();
  }

  async updateItem(item: Item): Promise<Item> {
    const response = await fetch(`${this.apiUrl}/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(item),
    });
    return response.json();
  }

  async deleteItem(id: number): Promise<void> {
    await fetch(`${this.apiUrl}/${id}`, {
      method: 'DELETE',
    });
  }
}
