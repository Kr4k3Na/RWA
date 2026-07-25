import { createEntityAdapter, EntityState } from "@ngrx/entity";
import { Product } from "../../models/product.model";
import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import { loadProductsSuccess } from "./product.actions";

export interface ProductsList extends EntityState<Product> {
    selectedProductId: string | null;
}

const adapter = createEntityAdapter<Product>({
    selectId: (p: Product) => p.id
});

const initialState = adapter.getInitialState({
    selectedProductId: null
});

export const productsReducer = createReducer(
    initialState,
    on(loadProductsSuccess, (state, { products }) => adapter.addMany(products, state))
);

export const selectProducts = createFeatureSelector<ProductsList>('products');

export const selectAllProducts = createSelector(selectProducts, adapter.getSelectors().selectAll);

export const selectCurrentProduct = createSelector(
    selectProducts,
    selectAllProducts,
    (state) => {
        return state.selectedProductId ? state.entities[state.selectedProductId] : null;
    }
);