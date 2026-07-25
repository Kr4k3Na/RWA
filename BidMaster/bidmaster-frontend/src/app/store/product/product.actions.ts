import { createAction, props } from "@ngrx/store";
import { Product } from "../../models/product.model";

export const loadProducts = createAction(
    '[Product List] Load Products',
    props<{ size: number, page: number }>()
);

export const loadProductsSuccess = createAction(
    '[Product List] Load Products Success',
    props<{ products: Product[] }>()
);

export const loadProductsFail = createAction(
    '[Product List] Load Products Fail',
    props<{ message: string }>()
);