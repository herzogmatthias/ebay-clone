import { component$ } from "@builder.io/qwik";

export default component$(() => {
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
            <a href="/login" target="_self">
              Login
            </a>
          </li>

          <li>
            <a>Add Product</a>
          </li>
        </ul>
      </div>
    </div>
  );
});
