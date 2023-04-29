import {
  $,
  component$,
  useResource$,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import { DocumentHead, useNavigate, useLocation } from "@builder.io/qwik-city";
import { stat } from "fs";
import IBid from "~/interfaces/IBid";
import IProduct from "~/interfaces/IProduct";

export interface IDetailProductStore {
  token: string;
  product: IProduct;
  bids: IBid[];
  productName: string;
  price: string;
  supplierEmail: string;
  date: string;
  message: string;
  status: number;
}

export default component$(() => {
  const state = useStore<IDetailProductStore>({
    token: "",
    product: {
      name: "",
      description: "",
      price: 0,
      image: "",
      startDate: "",
      endDate: "",
      email: "",
    },
    bids: [],
    productName: "",
    price: "",
    supplierEmail: "",
    date: "",
    message: "",
    status: 200,
  });

  const bidsAdd = $(async () => {
    state.token = localStorage.getItem("token") || "";
    const response = await fetch("http://127.0.0.1:5000/api/v1/bids/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + state.token,
      },
      body: JSON.stringify({
        productName: state.product.name,
        price: state.price,
        supplierEmail: state.product.email,
        date: new Date().toUTCString(),
      }),
    });
    state.status = response.status;
    const bid = await response.json();
    if (response.status === 200) {
      state.bids = [...state.bids, bid.bid];

      state.message = "Added Bid!";
    } else {
      state.message = bid.error;
    }
  });

  const bidsgetAll = $(async (name: string, email: string) => {
    state.token = localStorage.getItem("token") || "";
    const response = await fetch(
      "http://127.0.0.1:5000/api/v1/bids/getAllForProduct",
      {
        method: "POST",
        body: JSON.stringify({
          productName: name,
          supplierEmail: email,
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + state.token,
        },
      }
    );
    state.status = response.status;
    const bidsAllData = await response.json();
    if (response.status === 200) {
      state.bids = bidsAllData.bids;
    }

    console.log(bidsAllData);
  });
  async function isImgUrl(url: string) {
    const img = new Image();
    img.src = url;
    const isImage = await new Promise((resolve) => {
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
    });

    return isImage ? (
      <img width={100} height={100} src={url} />
    ) : (
      <img
        width={100}
        height={100}
        src="https://www.aaronfaber.com/wp-content/uploads/2017/03/product-placeholder-wp.jpg"
      />
    );
  }

  const nav = useNavigate();
  const loc = useLocation();
  useVisibleTask$(async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    state.token = localStorage.getItem("token") || "";
    const response = await fetch(
      "http://127.0.0.1:5000/api/v1/products/getOne/" + urlParams.get("name"),
      {
        method: "POST",
        body: JSON.stringify({
          supplierEmail: urlParams.get("email"),
        }),
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + state.token,
        },
      }
    );

    state.status = response.status;

    const data = await response.json();
    if (response.status === 200) {
      await bidsgetAll(data.name, data.email);

      state.product = data;
    }
    console.log(data.name);
  });

  return (
    <>
      {state.token ? (
        <div class="grid gap-4 grid-cols-1">
          <div class="overflow-x-auto w-full">
            <table class="table table-compact w-full">
              <thead>
                <tr>
                  <th>
                    <span class="sr-only">Image</span>
                  </th>
                  <th>Name</th>
                  <th>Descrption</th>
                  <th>Price</th>
                  <th>Supplier</th>
                  <th>StartDate</th>
                  <th>EndDate</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{isImgUrl(state.product.image)}</td>
                  <td>
                    <div class="flex items-center space-x-3">
                      <div>
                        <div class="font-bold">{state.product.name}</div>
                      </div>
                    </div>
                  </td>
                  <td>{state.product.description}</td>
                  <td>{state.product.price}</td>
                  <td>{state.product.email}</td>
                  <td>
                    {new Date(state.product.startDate).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(state.product.endDate).toLocaleDateString()}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="overflow-x-auto w-full">
              <table class="table table-compact w-full">
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Email</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {state.bids.map((bid) => {
                    return (
                      <tr>
                        <td>
                          <div class="flex items-center space-x-3">
                            <div>
                              <div class="font-bold">{bid.productName}</div>
                            </div>
                          </div>
                        </td>
                        <td>{bid.price}</td>
                        <td>{bid.email}</td>
                        <td>{new Date(bid.date).toLocaleDateString()}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div class="grid grid-cols-1 gap-4">
              <div class="form-control w-2/5">
                <label class="input-group input-group-vertical">
                  <span>Product Name</span>
                  <input
                    type="text"
                    disabled
                    name="name"
                    id="name"
                    placeholder="Type here"
                    class="input input-bordered"
                    value={state.product.name}
                    onInput$={(e) => {
                      state.productName = state.product.name;
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

              <div>
                <p
                  class={`text-base text-${
                    state.status != 200 ? "red" : "green"
                  }-500`}
                  style={{ color: state.status != 200 ? "red" : "green" }}
                >
                  {state.message}
                </p>
                <button
                  class="btn btn-ghost btn-s"
                  type="button"
                  onClick$={bidsAdd}
                >
                  save
                </button>
              </div>
            </div>
          </div>
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
