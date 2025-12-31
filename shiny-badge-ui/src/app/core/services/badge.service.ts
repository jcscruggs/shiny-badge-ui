import { Injectable, signal, computed } from '@angular/core';
import { Badge } from '../models/badge.model';

@Injectable({
    providedIn: 'root'
})
export class BadgeService {
    // Mock Data
    private badgesHelper = [
        {
            id: '1',
            title: 'Financial Freedom',
            description: 'Achieve a debt-free lifestyle and build a robust savings plan.',
            imageUrl: 'assets/badges/financial-freedom.jpg',
            category: 'Finance',
            isTracking: false,
            requirements: ['Save $1000 in emergency fund', 'Pay off all credit card debt', 'Invest 10% of income']
        },
        {
            id: '2',
            title: 'Mindfulness Master',
            description: 'Develop a daily meditation habit and improve emotional regulation.',
            imageUrl: 'assets/badges/mindfulness.jpg',
            category: 'Wellness',
            isTracking: false,
            requirements: ['Meditate for 10 minutes daily for 30 days', 'Keep a gratitude journal', 'Attend a yoga class']
        },
        {
            id: '3',
            title: 'Career Climber',
            description: 'Take proactive steps to advance your professional career.',
            imageUrl: 'assets/badges/career.jpg',
            category: 'Career',
            isTracking: false,
            requirements: ['Update resume logic', 'Complete a professional certification', 'Network with 5 new people']
        },
        {
            id: '4',
            title: 'Home Chef',
            description: 'Master the art of cooking healthy and delicious meals at home.',
            imageUrl: 'assets/badges/cooking.jpg',
            category: 'Skills',
            isTracking: false,
            requirements: ['Cook 5 different dinner recipes', 'Bake bread from scratch', 'Host a dinner party']
        },
        {
            id: '5',
            title: 'Community Pillar',
            description: 'Give back to your local community through volunteering and service.',
            imageUrl: 'assets/badges/community.jpg',
            category: 'Community',
            isTracking: false,
            requirements: ['Volunteer 10 hours', 'Donate to a local food bank', 'Attend a town hall meeting']
        },
        {
            id: '6',
            title: 'Green Thumb',
            description: 'Cultivate a thriving garden or collection of house plants.',
            imageUrl: 'assets/badges/plants.jpg',
            category: 'Hobbies',
            isTracking: false,
            requirements: ['Keep a plant alive for 6 months', 'Grow herbs from seeds', 'Identify 10 local trees']
        }
    ];

    // State using Signals
    private badgesSignal = signal<Badge[]>(this.badgesHelper);

    // Read-only public signal
    readonly badges = this.badgesSignal.asReadonly();

    constructor() { }

    getBadgeById(id: string): Badge | undefined {
        return this.badgesSignal().find(b => b.id === id);
    }

    startTracking(id: string) {
        this.badgesSignal.update(badges =>
            badges.map(b => b.id === id ? { ...b, isTracking: true } : b)
        );
    }

    untrackBadge(id: string) {
        this.badgesSignal.update(badges =>
            badges.map(b => b.id === id ? { ...b, isTracking: false } : b)
        );
    }
}
