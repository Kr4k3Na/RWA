import { Routes } from '@angular/router';
import { ProductList } from './components/product-list/product-list';
import { ProductProfile } from './components/product-profile/product-profile';

export const routes: Routes = [
    { path: 'products', component: ProductList },
    { path: 'products/:id', component: ProductProfile },
];
