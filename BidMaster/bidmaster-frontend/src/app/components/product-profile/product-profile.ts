import { Component, signal } from '@angular/core';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-profile',
  imports: [],
  templateUrl: './product-profile.html',
  styleUrl: './product-profile.css',
})
export class ProductProfile {

  images: string[] = [
      'tennis/radical-mp-palm-tree-crew-2025.webp',
      'tennis/radical-mp-palm-tree-crew-2025 (1).webp',
      'tennis/radical-mp-palm-tree-crew-2025 (2).webp',
      'tennis/radical-mp-palm-tree-crew-2025 (3).webp',
      'tennis/radical-mp-palm-tree-crew-2025 (4).webp',
      'tennis/radical-mp-palm-tree-crew-2025 (5).webp',
      'tennis/radical-mp-palm-tree-crew-2025 (6).webp',
      'tennis/radical-mp-palm-tree-crew-2025 (7).webp',
  ]

  currentImage = 0;

  product = signal<Product>({
    id: '1',
    sellerId: '1',
    title: 'Head Radical MP Palm Tree Tennis Racquet',
    description: 'Reket je namenjen naprednim igračima koji traže maksimalnu kontrolu, stabilnost i preciznost u igri. Težina od 300 g i head-light balans (320 mm) omogućavaju odličnu upravljivost i brze reakcije, posebno pri igri na mreži. Glava reketa od 98 in² (630 cm²) pruža vrhunsku kontrolu, dok otvoreni raspored žica 16x19 omogućava više spina i snage pri agresivnoj igri sa osnovne linije. Tanak ram 20/23/21 mm doprinosi boljem osećaju lopte i preciznijim udarcima, ali zahteva dobru tehniku i brži zamah.',
    price: '120$',
    category: 'Sport',
    image: this.images,
    state: 'new',
  })

  nextImage() {
    this.currentImage = (this.currentImage + 1) % this.images.length;
  }

  previousImage() {
    this.currentImage = (this.currentImage - 1 + this.images.length) % this.images.length;
  }
}
