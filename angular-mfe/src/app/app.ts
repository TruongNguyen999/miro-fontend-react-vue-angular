import { Component, NgZone } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App {
  message: string = '';
  inputMessage: string = '';

  constructor(private ngZone: NgZone) {}

  // Handler để lắng nghe sự kiện từ React
  private handler = (event: any) => {
    console.log('Message from React:', event);
    if (event && event.detail) {
      // Sử dụng NgZone để Angular detect change
      this.ngZone.run(() => {
        this.message = event.detail.message;
        console.log('Message from React:', this.message);
      });
    }
  };

  ngOnInit() {
    window.addEventListener('react-to-mf', this.handler);
  }

  ngOnDestroy() {
    window.removeEventListener('react-to-mf', this.handler);
  }

  // Gửi message sang React
  sendMessage() {
    const event = new CustomEvent('mfe-message', {
      detail: {
        sender: "Angular-mf",
        message: this.inputMessage || "Xin chào từ Angular app!",
      },
    });
    window.dispatchEvent(event);
    // Xóa input sau khi gửi
    this.inputMessage = '';
  }
}
