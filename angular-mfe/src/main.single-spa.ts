import 'zone.js';
import { ApplicationRef } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import type { LifeCycles } from 'single-spa';

let appRef: ApplicationRef | null = null;

export const bootstrap: LifeCycles['bootstrap'] = async () => {
  return;
};

export const mount: LifeCycles['mount'] = async () => {
  const container = document.getElementById("angular-mf-container") || document.body;

  // tạo app-root
  const appRoot = document.createElement('app-root');
  container.appendChild(appRoot);

  const moduleRef = await bootstrapApplication(App, { providers: [] });
  appRef = moduleRef.injector.get(ApplicationRef);
};

export const unmount: LifeCycles['unmount'] = async () => {
  if (appRef) {
    appRef.detachView(appRef.components[0].hostView);
    appRef = null;
  }
  const container = document.getElementById("angular-mf-container") || document.body;
  const rootEl = container.querySelector('app-root');
  if (rootEl) rootEl.remove();
};
