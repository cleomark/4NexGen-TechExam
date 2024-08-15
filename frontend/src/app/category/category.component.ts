import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CategoryService } from '../category.service';

interface Category {
  id: number;
  category_name: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
  ],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categories: Category[] = [];
  newCategoryName: string = '';
  editingCategory: Category | null = null;

  constructor(
    private categoryService: CategoryService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => (this.categories = data),
      (error) => this.showError('Error fetching categories')
    );
  }

  createCategory(): void {
    if (this.newCategoryName.trim()) {
      this.categoryService
        .createCategory({ category_name: this.newCategoryName })
        .subscribe(
          (data) => {
            this.categories.push(data);
            this.newCategoryName = '';
            this.showSuccess('Category created successfully');
          },
          (error) => this.showError('Error creating category')
        );
    }
  }

  startEdit(category: Category): void {
    this.editingCategory = { ...category };
  }

  updateCategory(): void {
    if (this.editingCategory) {
      this.categoryService
        .updateCategory(this.editingCategory.id, {
          category_name: this.editingCategory.category_name,
        })
        .subscribe(
          (data) => {
            const index = this.categories.findIndex((c) => c.id === data.id);
            if (index !== -1) {
              this.categories[index] = data;
            }
            this.editingCategory = null;
            this.showSuccess('Category updated successfully');
          },
          (error) => this.showError('Error updating category')
        );
    }
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter((c) => c.id !== id);
        this.showSuccess('Category deleted successfully');
      },
      (error) => this.showError('Error deleting category')
    );
  }

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['bg-green-600', 'text-white'],
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      panelClass: ['bg-red-600', 'text-white'],
    });
  }
}
