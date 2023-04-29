import { $, component$, useResource$, useStore, useVisibleTask$  } from "@builder.io/qwik";
import { DocumentHead, useNavigate, useLocation } from "@builder.io/qwik-city";


export default component$(() => {
  const state = useStore({
    token: "",
    products: [],
    bids: [],
    productName: "",
    price: "",
    supplierEmail: "",
    date: "",
    message: "",
    status: 200,
});

    const bidsAdd = $(async () => {
        state.token = localStorage.getItem("token") || ""
        const response  = await fetch("http://127.0.0.1:5000/api/v1/bids/add", 
        {
        method: "POST",
        headers: { "Content-Type": "application/json", "authorization": 'Bearer ' + state.token },
        body: JSON.stringify({ productName: "Heferl", price: state.price, supplierEmail: state.supplierEmail, date: state.date } ),
        });
        state.status = response.status;
        const bids = await response.json();
        if (response.status === 200) {
            state.message = "Data available";
        } else {
        state.message = "";
        }
    });

    const bidsgetAll = $(async () => {
        state.token = localStorage.getItem("token") || ""
        const response  = await fetch("http://127.0.0.1:5000/api/v1/bids/getAllForProducts", 
        {
          method: "GET",
          headers: { "Content-Type": "application/json", "authorization": 'Bearer ' + state.token },
          });
          state.status = response.status;
          const bidsAllData = await response.json();
          if (response.status === 200) {
           state.message = "Data available";
           state.bids = bidsAllData; 
          } else {
          state.message = bidsAllData.message;
          }
      
          console.log(bidsAllData);
        });

  const nav = useNavigate();
    const loc = useLocation();
    useVisibleTask$(async () => {
        bidsgetAll
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString); 
        state.token = localStorage.getItem("token") || ""
        const response = await fetch("http://127.0.0.1:5000/api/v1/products/getOne/" + urlParams.get('name'), 
        {
        method: "GET",
        headers: { "Content-Type": "application/json", "authorization": 'Bearer ' + state.token },
        });
        state.status = response.status;

        const data = await response.json();
        if (response.status === 200) {
        state.message = "Data available";
        state.products = data; 
        } else {
        state.message = data.message;
        }
        console.log(data.name)
    });

  return (
    <>
        { state.token ? (
            <div class="grid gap-4 grid-cols-1">
                <div class="overflow-x-auto w-full">
                        <table class="table table-compact w-full">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Descrption</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>StartDate</th>
                            <th>EndDate</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                            <td>
                                <div class="flex items-center space-x-3">
                                <div>
                                    <div class="font-bold">{state.products.name}</div>
                                </div>
                                </div>
                            </td>
                            <td>
                                {state.products.description}
                            </td>
                            <td>{state.products.price}</td>
                            <td>{state.products.image}</td>
                            <td>{state.products.startDate}</td>
                            <td>{state.products.endDate}</td>
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
                                <th>Supplier Email</th>
                                <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td>
                                    <div class="flex items-center space-x-3">
                                    <div>
                                        <div class="font-bold">{state.bids.productName}</div>
                                    </div>
                                    </div>
                                </td>
                                <td>{state.bids.price}</td>
                                <td>{state.bids.image}</td>
                                <td>{state.bids.supplierEmail}</td>
                                <td>{state.bids.date}</td>
                                </tr>
                            </tbody>
                            </table>
                    </div>
                    <div class="grid grid-cols-1 gap-4">
                    <div class="form-control w-2/5">
                        <label class="input-group input-group-vertical">
                            <span>Product Name</span>
                            <input type="text" disabled="disabled"  name="name" id="name" placeholder="Type here" class="input input-bordered"  value={state.products.name}
                                        onInput$={(e) => {
                                        state.productName = state.products.name
                                        }}/>
                        </label>
                    </div>
                    <div class="form-control w-2/5">
                        <label class="input-group input-group-vertical">
                        <span>Price</span>
                        <input type="number" name="price" id="price" placeholder="Type here" class="input input-bordered"  value={state.price}
                                    onInput$={(e) => {
                                    state.price = (e.target as HTMLInputElement).value;
                                    }}/>
                        </label>
                    </div>
                    <div class="form-control w-2/5">
                        <label class="input-group input-group-vertical">
                            <span>E-Mail</span>
                            <input type="email" name="email" id="email" placeholder="Type here" class="input input-bordered"  value={state.supplierEmail}
                                        onInput$={(e) => {
                                        state.supplierEmail = (e.target as HTMLInputElement).value;
                                        }}/>
                        </label>
                    </div>
                    <div class="form-control w-2/5">
                        <label class="input-group input-group-vertical">
                            <span>Date</span>
                            <input type="date" name="startDate" placeholder="Type here" class="input input-bordered" value={state.date}
                                    onInput$={(e) => {
                                        state.date = (e.target as HTMLInputElement).value;
                                    }}/>
                        </label>
                    </div>
                    <div>
                        <button class="btn btn-ghost btn-s" type="button" onClick$={bidsAdd}>save</button>
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



