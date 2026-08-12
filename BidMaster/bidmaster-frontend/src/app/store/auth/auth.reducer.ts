import { createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, register } from "./auth.actions";
import { User } from "../../models/user.model";

export interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: false,
    error: null
}

export const authReducer = createReducer(
    initialState,
    on(login, (state) => ({
        ...state,
        isLoading: true,
        error: null
    })),
    on(loginSuccess, (state, { user, accessToken }) => ({
        ...state,
        user,
        accessToken,
        isAuthenticated: true,
        isLoading: false
    })),
    on(loginFailure, (state, { error }) => ({
        ...state,
        error: typeof error === 'string' ? error : 'Login failed',
        isAuthenticated: false,
        isLoading: false
    }))
)