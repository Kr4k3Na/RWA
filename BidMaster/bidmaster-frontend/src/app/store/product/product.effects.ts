import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { loadProducts, loadProductsFail, loadProductsSuccess } from "./product.actions";
import { catchError, map, mergeMap, of } from "rxjs";
import { Product } from "../../models/product.model";

const API_URL = 'http://localhost:3000/products';

@Injectable()
export class ProductEffects {
    private http = inject(HttpClient);
    private actions$ = inject(Actions);

    loadProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadProducts),
            mergeMap(({ size, page }) => {
                return this.http.get<{ data: Product[] }>(`${API_URL}?_page=${page + 1}&_per_page=${size}`).pipe(
                    map(response => loadProductsSuccess({ products: response.data })),
                    catchError((error: HttpErrorResponse) => of(loadProductsFail({ message: error.message })))
                );
            })
        )
    );
}