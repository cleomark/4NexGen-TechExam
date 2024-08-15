import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../category.service';

interface Category {
  id: number;
  category_name: string;
}

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.css',
})
export class CategoryComponent {
  categories: Category[] = [];
  newCategoryName: string = '';
  editingCategory: Category | null = null;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories().subscribe(
      (data) => (this.categories = data),
      (error) => console.error('Error fetching categories:', error)
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
          },
          (error) => console.error('Error creating category:', error)
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
          },
          (error) => console.error('Error updating category:', error)
        );
    }
  }

  deleteCategory(id: number): void {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.categories = this.categories.filter((c) => c.id !== id);
      },
      (error) => console.error('Error deleting category:', error)
    );
  }
}
