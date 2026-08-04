import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CountdownService } from '../../services/countdown.service';

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [],
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CountdownComponent {
  private countdownService = inject(CountdownService);
  
  // Expose the signal state to the template
  countdownState = this.countdownService.state;

  // Generate an array for the 15 CSS-based background particles
  readonly particlesArray = Array.from({ length: 15 }, (_, i) => i);

  // Formatting helpers
  formatNumber(value: number): string {
    return value.toString();
  }

  formatTwoDigits(value: number): string {
    return value.toString().padStart(2, '0');
  }

  formatMilliseconds(value: number): string {
    return value.toString().padStart(3, '0');
  }
}
