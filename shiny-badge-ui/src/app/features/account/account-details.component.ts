import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../core/services/auth.service';

@Component({
    selector: 'app-account-details',
    standalone: true,
    imports: [
        CommonModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule
    ],
    templateUrl: './account-details.component.html',
    styleUrl: './account-details.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AccountDetailsComponent {
    currentUser;

    constructor(private authService: AuthService) {
        this.currentUser = this.authService.currentUser;
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            const file = input.files[0];
            this.authService.updateAvatar(file);
        }
    }
}
