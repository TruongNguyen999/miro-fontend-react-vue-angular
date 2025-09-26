import { BehaviorSubject } from "rxjs";

const subject = new BehaviorSubject({ messages: [] });

export const store = {
  state$: subject.asObservable(),
  get value() {
    return subject.value;
  },
  setState(newState) {
    subject.next(newState);
  }
};