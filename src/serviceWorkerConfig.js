const config = {
  onUpdate(registration) {
    console.log("In onUpdate.")
    console.log("navigator.serviceWorker: ",navigator.serviceWorker)
    console.log("registration: ",registration)
    console.log("clients: ", clients)
  },
  onSuccess(registration) {
    console.log("In onSuccess.")

  }
}
export default config;