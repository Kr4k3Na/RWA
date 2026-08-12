import { Injectable, inject } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, switchMap, tap } from "rxjs";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import * as AuthActions from '../auth/auth.actions'

const API_URL = 'http://localhost:3000/auth';

@Injectable()
export class AuthEffect {
    private actions$ = inject(Actions);
    private authService = inject(AuthService);
    private router = inject(Router);

    // auth.effects.ts
login$ = createEffect(() =>
    this.actions$.pipe(
        ofType(AuthActions.login),
        tap((action) => console.log('🔥 Efekat je primio akciju:', action)), // <-- DODAJ OVO
        switchMap(({ email, password }) => {
            console.log('📧 Email:', email, '🔑 Password:', password); // <-- DODAJ OVO
            return this.authService.login(email, password).pipe(
                tap((res) => console.log('✅ Odgovor sa backend-a:', res)), // <-- DODAJ OVO
                map((res: any) => {
                    console.log('🔄 Mapiranje u loginSuccess'); // <-- DODAJ OVO
                    return AuthActions.loginSuccess({
                        user: res.user,
                        accessToken: res.access_token
                    });
                }),
                catchError((err) => {
                    console.log('❌ Greška:', err); // <-- DODAJ OVO
                    return of(AuthActions.loginFailure({
                        error: err.error?.message || 'Pogresan email ili lozinka'
                    }));
                })
            );
        })
    )
);

    loginSuccess$ = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginSuccess),
            tap(({ accessToken }) => localStorage.setItem('token', accessToken)),
            tap(() => this.router.navigate(['/dashboard']))
        ),
        { dispatch: false }
    );
}