import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectAllProducts } from '../../store/product/product.reducer';
import { loadProducts } from '../../store/product/product.actions';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  imports: [AsyncPipe],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList implements OnInit {

  private readonly store = inject(Store);

  products$ = this.store.select(selectAllProducts);

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.store.dispatch(loadProducts({ page: 0, size: 10 }))
  }

  viewDetails(id: string) {
    this.router.navigate(['/products', id]);
  }
}
