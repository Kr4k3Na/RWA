import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffect {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ email, password }) =>
        this.authService.login(email, password).pipe(
          map((res: any) =>
            AuthActions.loginSuccess({ user: res.user, accessToken: res.access_token })
          ),
          catchError((err) =>
            of(AuthActions.loginFailure({ error: err.error?.message || 'Pogrešan email ili lozinka' }))
          )
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess),
        tap(({ accessToken }) => localStorage.setItem('token', accessToken)),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.register),
      switchMap(({ fullName, email, password }) =>
        this.authService.register({ fullName, email, password }).pipe(
          map((res: any) =>
            AuthActions.registerSuccess({ user: res.user, accessToken: res.access_token })
          ),
          catchError((err) =>
            of(AuthActions.registerFailure({ error: err.error?.message || 'Registracija nije uspela' }))
          )
        )
      )
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.registerSuccess),
        tap(({ accessToken }) => localStorage.setItem('token', accessToken)),
        tap(() => this.router.navigate(['/dashboard']))
      ),
    { dispatch: false }
  );
}