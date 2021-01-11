const backdrop = <HTMLDivElement>document.querySelector(".backdrop")!;
const navbarMenu = <HTMLDivElement>document.querySelector(".navbar-menu")!;
const navbarBurger = <HTMLAnchorElement>(
  document.querySelector(".navbar-burger")!
);
const logout = <HTMLAnchorElement>document.querySelector("#logout");

if (logout) {
  logout.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`auth/logout`, {
      method: "POST",
    }).then(() => {
      window.location.reload();
    });
  });
}

navbarBurger.addEventListener("click", () => {
  backdrop.classList.toggle("is-active");
  navbarMenu.classList.toggle("is-active");
  navbarBurger.classList.toggle("is-active");
});

backdrop.addEventListener("click", () => {
  backdrop.classList.toggle("is-active");
  navbarMenu.classList.toggle("is-active");
  navbarBurger.classList.toggle("is-active");
});

const publicVapidKey =
  "BI6PBiHOlFwGDh2LGJ-6LhYu9_sNoij6aqEHq23TCM3B__AerYWtvfZulJqGwj3rZ6Ii1wLRmT_V1zkc8pS5stw";
if ("serviceWorker" in navigator) {
  console.log("Registering service worker");

  run().catch((error) => console.error(error));
}

async function run() {
  console.log("Registering service worker");
  const registration = await navigator.serviceWorker.register("/worker.js", {
    scope: "/",
  });
  console.log("Registered service worker");

  console.log("Registering push");
  const subscription = await registration.pushManager.subscribe({
    userVisibleOnly: true,
    // The `urlBase64ToUint8Array()` function is the same as in
    // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
  });
  console.log("Registered push");

  console.log("Sending push");
  await fetch("/webPush", {
    method: "POST",
    body: JSON.stringify(subscription),
    headers: {
      "content-type": "application/json",
    },
  });
  console.log("Sent push");
}

//Decoder base64 to uint8
function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
