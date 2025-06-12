import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: "pusher",
  key: "e53199800b4903328d63",
  cluster: "mt1",
  forceTLS: true,
});

export default echo;
