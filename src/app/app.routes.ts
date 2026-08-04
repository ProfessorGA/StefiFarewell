import { Routes } from '@angular/router';
import { CountdownComponent } from './components/countdown/countdown.component';

export const routes: Routes = [
  { path: '', component: CountdownComponent },
  { path: '**', redirectTo: '' }
];
