import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  route1 = ['active'];
  route2 = [];
  activateClass(newRoute) {
    if (newRoute === 1) {
      this.route1 = ['active'];
      this.route2 = [];
    } else {
      this.route1 = [];
      this.route2 = ['active'];
    }
  }
}
