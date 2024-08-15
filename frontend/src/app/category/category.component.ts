import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Category {
  id: number;
  category_name: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/categories`);
  }

  createCategory(category: { category_name: string }): Observable<Category> {
    return this.http.post<Category>(`${this.apiUrl}/category`, category);
  }

  updateCategory(
    id: number,
    category: { category_name: string }
  ): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/category/${id}`, category);
  }

  deleteCategory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/category/${id}`);
  }
}
