import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BadgeService } from '../../core/services/badge.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-badge-detail',
    standalone: true,
    imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatChipsModule],
    templateUrl: './badge-detail.component.html',
    styleUrls: ['./badge-detail.component.css']
})
export class BadgeDetailComponent {
    private route = inject(ActivatedRoute);
    private badgeService = inject(BadgeService);
    private snackBar = inject(MatSnackBar);

    badgeId = this.route.snapshot.paramMap.get('id');

    badge = computed(() => {
        return this.badgeService.badges().find(b => b.id === this.badgeId);
    });

    startTracking() {
        if (this.badgeId) {
            this.badgeService.startTracking(this.badgeId);
            this.snackBar.open('You are now tracking this badge!', 'Close', { duration: 3000 });
        }
    }

    untrack() {
        if (this.badgeId) {
            this.badgeService.untrackBadge(this.badgeId);
            this.snackBar.open('You have stopped tracking this badge.', 'Close', { duration: 3000 });
        }
    }

    getColorHash(str: string): string {
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
            hash = str.charCodeAt(i) + ((hash << 5) - hash);
        }
        const c = (hash & 0x00FFFFFF).toString(16).toUpperCase();
        return '#' + '00000'.substring(0, 6 - c.length) + c;
    }
}
