import { $, component$, useResource$, useStore } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const state = useStore({
    email: "",
    password: "",
    message: "",
    status: 200,
  });
  const nav = useNavigate();

  const login = $(async () => {
    const response = await fetch("http://127.0.0.1:5000/api/v1/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(state),
    });
    state.status = response.status;
    const data = await response.json();
    if (response.status === 200) {
      state.message = "Login Successful";
      localStorage.setItem("token", data.token);
      window.dispatchEvent(new Event("storage"));
      nav("/");
    } else {
      state.message = data.message;
    }

    console.log(data);
  });

  return (
    <>
      <section class="bg-gray-50 py-6 dark:bg-gray-900">
        <div class="flex flex-col items-center justify-start px-6 py-8 my-0 md:h-screen lg:py-0">
          <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              <div class="space-y-4 md:space-y-6">
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    value={state.email}
                    onInput$={(e) => {
                      state.email = (e.target as HTMLInputElement).value;
                    }}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    value={state.password}
                    onInput$={(e) => {
                      state.password = (e.target as HTMLInputElement).value;
                    }}
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <button
                  type="button"
                  onClick$={login}
                  class="w-full text-white btn-primary hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign in
                </button>
                <p
                  class={`text-base dark:text-white`}
                  style={{ color: state.status != 200 ? "red" : "green" }}
                >
                  {state.message}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
