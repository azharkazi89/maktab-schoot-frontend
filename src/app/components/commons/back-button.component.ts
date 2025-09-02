import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back-button',
  template: `<button class="back-btn" (click)="goBack()">← Back</button>`,
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent {
  constructor(private location: Location) {}
  goBack() {
    this.location.back();
  }
}
