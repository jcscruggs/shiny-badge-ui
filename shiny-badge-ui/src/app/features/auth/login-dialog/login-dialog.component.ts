import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../core/services/auth.service';

@Component({
    selector: 'app-login-dialog',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
    ],
    templateUrl: './login-dialog.component.html',
    styleUrl: './login-dialog.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginDialogComponent {
    isLoginMode = signal(true);

    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private dialogRef: MatDialogRef<LoginDialogComponent>
    ) {
        this.form = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    toggleMode(): void {
        this.isLoginMode.update(v => !v);
    }

    onSubmit(): void {
        if (this.form.valid) {
            const { username } = this.form.value;
            if (username) {
                // In a real app we would check password and handle errors
                const obs$ = this.isLoginMode()
                    ? this.authService.login(username)
                    : this.authService.register(username);

                obs$.subscribe(() => {
                    this.dialogRef.close();
                });
            }
        }
    }
}
