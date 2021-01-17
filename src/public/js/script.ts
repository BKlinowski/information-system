const backdrop = <HTMLDivElement>document.querySelector(".backdrop")!;
const navbarMenu = <HTMLDivElement>document.querySelector(".navbar-menu")!;
const navbarBurger = <HTMLAnchorElement>document.querySelector(".navbar-burger")!;
const logout = <HTMLAnchorElement>document.querySelector("#logout");

if (logout) {
  logout.addEventListener("click", (event) => {
    event.preventDefault();
    fetch(`/auth/logout`, {
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

const publicVapidKey = "BLCoOdDTa3CSs0K3FRJHzE0nNUeUfKxApEJL7fQbo_XySNuApLNiKnwM56VvY5CLr1qWCrIMJyI5maep9knEZns";
if ("serviceWorker" in navigator) {
  if (window.Notification) {
    if (Notification.permission != "granted") {
      Notification.requestPermission(() => {
        if (Notification.permission === "granted") {
          run().catch((error) => console.error(error));
        }
      }).catch(function (err) {
        console.log(err);
      });
    }
  }
}

async function run() {
  let subscription, registration;
  try {
    registration = await navigator.serviceWorker.register("/js/worker.js", {
      scope: "/js/",
    });
  } catch (err) {
    console.log(err);
  }

  try {
    if (registration) {
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        // The `urlBase64ToUint8Array()` function is the same as in
        // https://www.npmjs.com/package/web-push#using-vapid-key-for-applicationserverkey
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
      });
    }
  } catch (err) {
    console.log(err);
  }
  console.log(subscription);
  fetch("/webPush", {
    method: "POST",
    body: JSON.stringify({ subscription }),
    headers: {
      "content-type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
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
