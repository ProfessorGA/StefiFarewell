import { Injectable, signal, OnDestroy } from '@angular/core';
import { CountdownModel } from '../models/countdown.model';

@Injectable({
  providedIn: 'root'
})
export class CountdownService implements OnDestroy {
  // Target UTC timestamp: October 30, 2026 – 12:00:00 PM IST (Asia/Kolkata)
  // Asia/Kolkata (IST) is UTC + 5:30.
  // 12:00:00 PM IST = 06:30:00 AM UTC.
  // JavaScript's Date.UTC takes a 0-indexed month (9 = October).
  private readonly targetTime = Date.UTC(2026, 9, 30, 6, 30, 0);

  private readonly stateSignal = signal<CountdownModel>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    milliseconds: 0,
    completed: false
  });

  // Expose readonly signal to components
  readonly state = this.stateSignal.asReadonly();
  private animationFrameId: number | null = null;

  constructor() {
    this.startCountdown();
  }

  private startCountdown(): void {
    const update = () => {
      const now = Date.now();
      const diff = this.targetTime - now;

      if (diff <= 0) {
        this.stateSignal.set({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          milliseconds: 0,
          completed: true
        });
        this.stopCountdown();
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      const milliseconds = diff % 1000;

      this.stateSignal.set({
        days,
        hours,
        minutes,
        seconds,
        milliseconds,
        completed: false
      });

      this.animationFrameId = requestAnimationFrame(update);
    };

    this.animationFrameId = requestAnimationFrame(update);
  }

  private stopCountdown(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  ngOnDestroy(): void {
    this.stopCountdown();
  }
}
