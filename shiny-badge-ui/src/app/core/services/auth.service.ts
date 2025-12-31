import { Injectable, signal } from '@angular/core';
import { Observable, of, delay, tap } from 'rxjs';
import { User } from '../../shared/models/user.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly _currentUser = signal<User | null>(null);
    readonly currentUser = this._currentUser.asReadonly();

    constructor() { }

    login(username: string): Observable<User> {
        // Mock login
        const mockUser: User = {
            id: '1',
            username: username,
            email: `${username}@example.com`
        };

        return of(mockUser).pipe(
            delay(500), // Simulate network delay
            tap(user => this._currentUser.set(user))
        );
    }

    register(username: string): Observable<User> {
        // Mock registration - same as login for this simple mock
        return this.login(username);
    }

    updateAvatar(file: File): Observable<string> {
        const url = URL.createObjectURL(file);
        const currentUser = this._currentUser();

        if (currentUser) {
            this._currentUser.set({
                ...currentUser,
                avatarUrl: url
            });
        }

        return of(url);
    }

    logout(): void {
        this._currentUser.set(null);
    }
}
