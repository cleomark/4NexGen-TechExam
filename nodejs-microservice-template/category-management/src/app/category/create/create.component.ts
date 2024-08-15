import { Component } from '@angular/core';
import { CategoryService } from '../../category.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent {
  categoryName: string = '';

  constructor(private categoryService: CategoryService) {}

  createCategory() {
    this.categoryService
      .createCategory({ category_name: this.categoryName })
      .subscribe({
        next: (data) => console.log('Category created:', data),
        error: (error) => console.error('Error creating category:', error),
      });
  }
}
