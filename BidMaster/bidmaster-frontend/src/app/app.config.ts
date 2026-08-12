import { ApplicationConfig, isDevMode, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { productsReducer } from './store/product/product.reducer';
import { provideHttpClient } from '@angular/common/http';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { ProductEffects } from './store/product/product.effects';
import { authReducer } from './store/auth/auth.reducer';
import { AuthEffect } from './store/auth/auth.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({
      products: productsReducer,
      auth: authReducer
    }),
    provideEffects([ProductEffects, AuthEffect]),
    provideHttpClient(),
    provideStoreDevtools({
      maxAge: 25, // broj akcija koje se pamte u istoriji
      logOnly: !isDevMode(), // onemogući mutacije u produkciji
      autoPause: true,
    })
  ],
};
