// Ambientes para el despliegue de la aplicación.

export const environment = {
  production: true,
  // serverUrl: 'https://www.cslab.ml:8443/SiCumplimosBackend/',
  // serverAntUrl: 'https://www.cslab.ml:8443/api_culturasegura/',
  serverUrl: 'http://localhost:8080/',
  serverAntUrl: 'http://localhost:8081/api_culturasegura/'
};
export const environmentFire = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAxrIOMEfz-6CwJzUXuaS2xu_INlxueRnI',
    authDomain: 'culturasegura-a1052.firebaseapp.com',
    databaseURL: 'https://culturasegura-a1052.firebaseio.com',
    projectId: 'culturasegura-a1052',
    storageBucket: 'culturasegura-a1052.appspot.com',
    messagingSenderId: '607254656206'
  }
};
