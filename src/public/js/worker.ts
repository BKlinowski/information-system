console.log("Loaded service worker!");

declare interface Event {
  data: any;
}

declare interface Window {
  registration: any;
}

self.addEventListener("push", (ev) => {
  const data = ev.data.json();
  console.log("Got push", data.description);
  self.registration.showNotification(data.title, {
    body: data.description,
    image: data.imageURL,
  });
});
