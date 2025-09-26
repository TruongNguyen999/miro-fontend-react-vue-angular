import { Component, NgZone, OnInit, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class App implements OnInit, OnDestroy {
  messages: string[] = [];
  inputMessage: string = '';

  private subscription: any;
  private sharedStorePromise = (window as any).System.import("shared-store");

  constructor(private ngZone: NgZone) {}

  ngOnInit() {
    this.sharedStorePromise.then(({ store }: any) => {
      this.subscription = store.state$.subscribe((state: any) => {
        // chạy trong NgZone để Angular detect change
        this.ngZone.run(() => {
          this.messages = state.messages;
        });
      });
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  sendMessage() {
    this.sharedStorePromise.then(({ store }: any) => {
      store.setState({
        ...store.value,
        messages: [...store.value.messages, `From Angular: ${this.inputMessage}`]
      });
      this.inputMessage = '';
    });
  }
}
