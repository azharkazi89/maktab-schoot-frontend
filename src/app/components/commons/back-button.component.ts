import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
  standalone: true,          // <-- must be standalone
  imports: [CommonModule]    // any Angular modules used in template
})
export class BackButtonComponent {
  goBack() {

  }
}
