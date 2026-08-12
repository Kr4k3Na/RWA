import { createSelector, createFeatureSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUser = createSelector(
    selectAuthState,
    (state) => state.user
);

export const selectAccessToken = createSelector(
    selectAuthState,
    (state) => state.accessToken
);

export const selectIsAuthenticated = createSelector(
    selectAuthState,
    (state) => state.isAuthenticated
);

export const selectIsLoading = createSelector(
    selectAuthState,
    (state) => state.isLoading
);

export const selectAuthError = createSelector(
    selectAuthState,
    (state) => state.error
);

export const selectAuthUser = createSelector(
    selectAuthState,
    (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
    })
);

export const selectIsLoggedIn = createSelector(
    selectIsAuthenticated,
    selectUser,
    (isAuthenticated, user) => isAuthenticated && user !== null
);

export const selectUserName = createSelector(
    selectUser,
    (user) => user?.name || 'Guest'
);

export const selectUserEmail = createSelector(
    selectUser,
    (user) => user?.email || null
);