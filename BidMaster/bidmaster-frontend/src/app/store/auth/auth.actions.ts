import { createAction, props } from "@ngrx/store";
import { User } from "../../models/user.model";

export const login = createAction(
    '[Login component] Login user',
    props<{ email: string, password: string }>()
);

export const loginSuccess = createAction(
    '[Login component] Login user success',
    props<{ user: User, accessToken: string }>()
)

export const loginFailure = createAction(
    '[Login component] Login user failure',
    props<{ error: string }>()
)

export const register = createAction(
    '[Register component] Register user',
    props<{ fullName: string, email: string, password: string }>()
);

export const registerSuccess = createAction(
    '[Register component] Register user success',
    props<{ accessToken: string }>()
)

export const registerFailure = createAction(
    '[Register component] Register user failure',
    props<{ error: string }>()
)