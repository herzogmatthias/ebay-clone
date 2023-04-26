import { component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

export default component$(() => {
  const state = useStore({
    token: "",
  });

  useVisibleTask$(async () => {
    state.token = localStorage.getItem("token") || "";
  });

  return (
    <>
      {state.token ? (
        <div>
          <h1>Logged in</h1>
        </div>
      ) : (
        <div>
          <h1>Not logged in</h1>
        </div>
      )}
    </>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
