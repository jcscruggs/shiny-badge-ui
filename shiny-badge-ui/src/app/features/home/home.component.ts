import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeService } from '../../core/services/badge.service';
import { CardComponent } from '../../shared/card/card.component';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private badgeService = inject(BadgeService);
  private authService = inject(AuthService);

  badges = this.badgeService.badges;
  currentUser = this.authService.currentUser;
}
