import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/auth';

    login(email: string, password: string) {
        return this.http.post(`${this.apiUrl}/login`, { email, password });
    }

    register(data: {
        fullName: string;
        email: string;
        password: string;
    }) {
        const [firstName, lastName] = data.fullName.split(' ');
        const payload = {
            name: firstName,
            lastname: lastName,
            email: data.email,
            password: data.password
        }
        return this.http.post(`${this.apiUrl}/register`, payload);
    }
}