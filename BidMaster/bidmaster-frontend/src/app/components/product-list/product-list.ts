import { Component, signal } from '@angular/core';
import { Product } from '../../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list',
  imports: [],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {

  products = signal<Product[]>([
    {
      id: '1',
      title: 'iPhone 13 Pro',
      description: 'Iphone 13 Pro, 256GB, boja grafit. Kupljen pre godinu dana, koriscen uz zastitnu masku i staklo od prvog dana. Baterija na 91% kapaciteta. U kompletu ide originalna kutija i kabl.',
      price: '650',
      category: 'Telefoni',
      image: [],
      state: 'used',
      sellerId: 'seller-101'
    },
    {
      id: '2',
      title: 'Planinski bicikl Trek Marlin 7',
      description: 'Potpuno nov, nekoriscen, jos u foliji. Aluminijumski ram velicine M, 29-inch tockovi, hidraulicne kocnice. Idealan za teren i grad.',
      price: '890',
      category: 'Sport i rekreacija',
      image: [],
      state: 'new',
      sellerId: 'seller-202'
    }
  ])

  constructor(private router: Router) {}

  viewDetails(id: string) {
    this.router.navigate(['/products', id]);
  }
}
