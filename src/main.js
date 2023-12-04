import "../style.css";
import { setupCounter } from "./counter.js";

document.querySelector("#app").innerHTML = `
  <div class="bg-red-500 flex flex-col gap-4 max-w-xl m-auto hover:bg-blue-500">
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

setupCounter(document.querySelector("#counter"));
