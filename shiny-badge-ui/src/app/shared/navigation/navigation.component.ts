import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { map } from 'rxjs/operators';
import { signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { AuthService } from '../../core/services/auth.service';
import { LoginDialogComponent } from '../../features/auth/login-dialog/login-dialog.component';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    RouterLink,
    MatListModule,
    MatMenuModule,
    MatDialogModule,
    LoginDialogComponent
  ],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {
  protected readonly isMobile = signal(false);
  protected sidenavOpen = signal(false);
  protected readonly currentUser;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.currentUser = this.authService.currentUser;
  }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.TabletPortrait, Breakpoints.HandsetPortrait])
      .subscribe(result => {
        this.isMobile.set(result.matches);
      });
  }

  protected toggleSidenav(): void {
    this.sidenavOpen.update(value => !value);
  }

  protected openLogin(): void {
    this.dialog.open(LoginDialogComponent, {
      width: '350px'
    });
  }

  protected logout(): void {
    this.authService.logout();
  }
}
