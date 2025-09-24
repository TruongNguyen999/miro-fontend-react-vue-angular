import { createApp } from "vue";
import App from "./App.vue";

let appInstance = null;

export const bootstrap = async () => {
  console.log("Vue MF bootstrap");
};

export const mount = (props) => {
  const el = props.domElement;
  if (!el) {
    console.warn("Vue MF container not found yet!");
    return Promise.resolve();
  }
  console.log("Vue MF mounting into", el);

  // Mount cứng App.vue vào DOM
  appInstance = createApp(App);
  appInstance.mount(el);

  return Promise.resolve();
};

export const unmount = (props) => {
  if (appInstance) {
    console.log("Vue MF unmounting");
    appInstance.unmount();
    appInstance = null;
  }
  return Promise.resolve();
};
