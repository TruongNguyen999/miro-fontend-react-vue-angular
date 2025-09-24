import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  message: string = '';

  // Handler để lắng nghe sự kiện từ React
  private handler = (event: any) => {
    if (event.detail) {
      this.message = event.detail;
    }
  };

  ngOnInit() {
    window.addEventListener('react-to-angular', this.handler);
  }

  ngOnDestroy() {
    window.removeEventListener('react-to-angular', this.handler);
  }

  sendMessage() {
    const event = new CustomEvent('angular-to-react', {
      detail: 'Hello React 👋 từ Angular!'
    });
    window.dispatchEvent(event);
  }
}
