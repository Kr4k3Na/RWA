import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductProfile } from './components/product-profile/product-profile';
import { ProductList } from './components/product-list/product-list';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductProfile, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bidmaster-frontend');
}
