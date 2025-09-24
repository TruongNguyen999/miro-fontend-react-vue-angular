import { registerApplication, start } from "single-spa";

// Angular micro-frontend
registerApplication({
  name: "angular-mf",
 app: () => {
    // eslint-disable-next-line no-undef, no-restricted-properties
    return System.import("http://localhost:4201/angular-mf.main.js");
  },
  activeWhen: [location => location.pathname.startsWith("/angular")]
  // customProps: {
  //   domElement: document.getElementById("micro-frontend-container"),
  // },
});

// Vue micro-frontend
registerApplication({
  name: "vue-mf",
  app: () => {
    // eslint-disable-next-line no-undef, no-restricted-properties
    return System.import("http://localhost:8081/vue-mf.js");  
  },
  activeWhen: [location => location.pathname.startsWith("/vue")],
  customProps: {
    get domElement() {
      const el = document.getElementById('vue-mf-container');
      if (!el) console.warn('Vue MF container not found yet!');
      return el;
    }
  }
});

start();
