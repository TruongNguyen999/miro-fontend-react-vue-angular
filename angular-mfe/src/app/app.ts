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
    console.log('Message from React:', event.detail);
    
    if (event.detail) {
      this.message = event.detail.message;
    }
  };

  ngOnInit() {
    window.addEventListener('react-to-mf', this.handler);
  }

  ngOnDestroy() {
    window.removeEventListener('react-to-mf', this.handler);
  }

  sendMessage() {
    const event = new CustomEvent('mfe-message', {
      detail: {
        sender: "Angular-mf",
        message: "Xin chào từ Angular app!",
      },
    });
    window.dispatchEvent(event);
  }
}
