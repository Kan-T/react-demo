const config = {
  onSuccess(registration) {
    console.log("In onUpdate.")
    console.log("navigator.serviceWorker: ",navigator.serviceWorker)
    console.log("registration:  ",registration)
      console.log("registration.waiting: ",registration.waiting);
      console.log("registration.waiting.skipWaiting: ",registration.waiting.skipWaiting);

      registration.waiting.addEventListener('activate', event => {
      console.log("window.skipWaiting: ",window.skipWaiting);
      console.log('Now ready to handle fetches!');
    });
  }
}
export default config;