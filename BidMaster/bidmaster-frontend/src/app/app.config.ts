import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { productsReducer } from './store/product/product.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductEffects } from './store/product/product.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      products: productsReducer,
    }),
    provideEffects([ProductEffects]),
    provideHttpClient(),
    provideEffects(),
    provideStoreDevtools({
      maxAge: 25, // broj akcija koje se pamte u istoriji
      logOnly: !isDevMode(), // onemogući mutacije u produkciji
      autoPause: true,
    })
  ],
};
