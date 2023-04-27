import {$, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";



export default component$(() => {
  const state = useStore({
    token: "",
    products: [],
    message: "",
    status: 200,
  });

  useVisibleTask$(async () => { 
    state.token = localStorage.getItem("token") || ""
    const response = await fetch("http://127.0.0.1:5000/api/v1/products/getAll", {
      method: "GET",
      headers: { "Content-Type": "application/json" ,  "authorization": 'Bearer ' + state.token },
    });
    state.status = response.status;
    const data = await response.json();
    if (response.status === 200) {
      state.message = "Data available";
      state.products = data; 
    } else {
      state.message = data.message;
    }
    console.log(data.name);
  });
  

  

  return (
    <> 
      {state.token ? (
        <div>
          <div class="grid grid-flow-row-dense grid-cols-3 grid-rows-1 ">
              <h1 class="py-15 text-lg">Logged in</h1> 
              <h3 class=" py-15  text-lg font-bold text-center"> Overview Offers </h3>
              <button class="py-25  btn btn-active btn-ghost ">calucate Offers</button>
          </div>
          <div class="overflow-x-auto w-full">
                <table class="table w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Descrption</th>
                      <th>Price</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    state.products
                        .map((item, index, arr) => {
                            return (
                    <tr>
                      <td>
                        <div class="flex items-center space-x-3">
                          <div>
                            <div class="font-bold">{item.name}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        {item.description}
                      </td>
                      <td>{item.price}</td>
                      <th>
                        <button class="btn btn-ghost btn-xs">details</button>
                      </th>
                    </tr>
                     );
                    })}
                  </tbody>
                </table>
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
