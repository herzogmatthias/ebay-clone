import { $, component$, useResource$, useStore } from "@builder.io/qwik";
import { DocumentHead, useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
  const state = useStore({
    token: "",
    name: "",
    description: "",
    price: "",
    image: "",
    startDate: "",
    endDate: "",
    email: "",
    message: "",
    status: 200,
  });
  const nav = useNavigate();

  const addProduct = $(async () => {
    state.token = localStorage.getItem("token") || "";
    const response = await fetch("http://127.0.0.1:5000/api/v1/products/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + state.token,
      },
      body: JSON.stringify(state),
    });
    state.status = response.status;
    const data = await response.json();
    if (response.status === 200) {
      state.message = "Login Successful";
      nav("/");
    } else {
      state.message = data.message;
    }

    console.log(data);
  });

  return (
    <>
      <div class="grid gap-4 flex-auto grid-cols-1 place-items-center">
        <div class="form-control w-2/5">
          <label class="input-group input-group-vertical">
            <span>Product Name</span>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Type here"
              class="input input-bordered"
              value={state.name}
              onInput$={(e) => {
                state.name = (e.target as HTMLInputElement).value;
              }}
            />
          </label>
        </div>
        <div class="form-control w-2/5">
          <label class="input-group input-group-vertical">
            <span>Description</span>
            <input
              type="text"
              name="description"
              placeholder="Type here"
              class="input input-bordered"
              value={state.description}
              onInput$={(e) => {
                state.description = (e.target as HTMLInputElement).value;
              }}
            />
          </label>
        </div>
        <div class="form-control w-2/5">
          <label class="input-group input-group-vertical">
            <span>Price</span>
            <input
              type="number"
              name="price"
              id="price"
              placeholder="Type here"
              class="input input-bordered"
              value={state.price}
              onInput$={(e) => {
                state.price = (e.target as HTMLInputElement).value;
              }}
            />
          </label>
        </div>
        <div class="form-control w-2/5">
          <label class="input-group input-group-vertical">
            <span>Image</span>
            <input
              type="url"
              name="image"
              id="image"
              placeholder="Type here"
              class="input input-bordered"
              value={state.image}
              onInput$={(e) => {
                state.image = (e.target as HTMLInputElement).value;
              }}
            />
          </label>
        </div>
        <div class="form-control w-2/5">
          <label class="input-group input-group-vertical">
            <span>Start Date</span>
            <input
              type="date"
              name="startDate"
              placeholder="Type here"
              class="input input-bordered"
              value={state.startDate}
              onInput$={(e) => {
                state.startDate = (e.target as HTMLInputElement).value;
              }}
            />
          </label>
        </div>
        <div class="form-control w-2/5">
          <label class="input-group input-group-vertical">
            <span>End Date</span>
            <input
              type="date"
              name="endDate"
              id="endDate"
              placeholder="Type here"
              class="input input-bordered"
              value={state.endDate}
              onInput$={(e) => {
                state.endDate = (e.target as HTMLInputElement).value;
              }}
            />
          </label>
        </div>
        <div>
          <button
            class="btn btn-ghost btn-s"
            type="button"
            onClick$={addProduct}
          >
            save
          </button>
        </div>
      </div>
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
