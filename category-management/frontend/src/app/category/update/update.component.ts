import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../category.service';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.css',
})
export class UpdateComponent {
  categoryName: string = '';
  categoryId: number;

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoryId = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.categoryService.getCategoryById(this.categoryId).subscribe({
      next: (data) => (this.categoryName = data.category_name),
      error: (error) => console.error('Error fetching category:', error),
    });
  }

  updateCategory() {
    this.categoryService
      .updateCategory(this.categoryId, { category_name: this.categoryName })
      .subscribe({
        next: () => this.router.navigate(['/categories']),
        error: (error) => console.error('Error updating category:', error),
      });
  }
}
