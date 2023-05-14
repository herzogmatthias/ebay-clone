import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const nav = useNavigate();

  const state = useStore({
    token: "",
    email: "",
  });

  useVisibleTask$(() => {
    state.token = localStorage.getItem("token") || "";
    state.email = localStorage.getItem("email") || "";
    console.log(localStorage.getItem("token"));
    window.addEventListener("storage", () => {
      console.log("Change to local storage!");
      state.token = localStorage.getItem("token") || "";
      state.email = localStorage.getItem("email") || "";
    });
  });

  const onLoginClicked = $(() => {
    if (state.token === "") {
      nav("/login");
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      location.reload();
    }
  });

  return (
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a href="/" class="btn btn-ghost normal-case text-xl">
          Ebay-Clone
        </a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li>
            <a onClick$={onLoginClicked}>
              {state.token === "" ? "Login" : "Logout"}
            </a>
          </li>

          <li class={state.token === "" ? "disabled" : ""}>
            <a href={state.token === "" ? "/" : "/addProduct"} target="_self">
              Add Product
            </a>
          </li>
          <li>
            <div class="text-lg font-bold">{state.email}</div>
          </li>
        </ul>
      </div>
    </div>
  );
});
