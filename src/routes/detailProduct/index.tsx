import { $, component$, useResource$, useStore, useVisibleTask$  } from "@builder.io/qwik";
import { DocumentHead, useNavigate, useLocation } from "@builder.io/qwik-city";


export default component$(() => {
  const state = useStore({
    token: "",
    products: {},
    message: "",
    status: 200,
  });
  const nav = useNavigate();
    const loc = useLocation();
    useVisibleTask$(async () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString); 
    state.token = localStorage.getItem("token") || ""
    console.log(loc.params.name)
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
    console.log(data.name);
  });

  return (
    <></> );
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



