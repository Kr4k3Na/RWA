import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ProductProfile } from './components/product-profile/product-profile';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ProductProfile],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('bidmaster-frontend');
}
