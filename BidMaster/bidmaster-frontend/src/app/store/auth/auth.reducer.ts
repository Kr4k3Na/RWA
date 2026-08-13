import { createReducer, on } from "@ngrx/store";
import { login, loginFailure, loginSuccess, register, registerFailure, registerSuccess } from "./auth.actions";
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
        isLoading: false,
        error: null
    })),
    on(loginFailure, (state, { error }) => ({
        ...state,
        error: typeof error === 'string' ? error : 'Login failed',
        isAuthenticated: false,
        isLoading: false
    })),
    on(register, (state) => ({
        ...state,
        isLoading: true,
        error: null,
        isAuthenticated: false
    })),
    on(registerSuccess, (state, { user, accessToken }) => ({
        ...state,
        user,
        accessToken,
        isLoading: false,
        isAuthenticated: true,
        error: null
    })),
    on(registerFailure, (state, { error }) => ({
        ...state,
        error: typeof error === 'string' ? error : 'Registration failed',
        isLoading: false,
        isAuthenticated: false
    })),
)