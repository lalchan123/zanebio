// import { ApolloClient, InMemoryCache } from "@apollo/client";

// const storedBaseUrl = localStorage.getItem("baseUrl");

// let baseUrl;
// try {
//   baseUrl = storedBaseUrl
//     ? JSON.parse(storedBaseUrl)
//     : { value: "https://genflyo.com" };
//     // : { value: "http://18.225.117.122:8000" };
// } catch (error) {
//   console.error("Error parsing baseUrl from localStorage:", error);
//   baseUrl = { value: "https://genflyo.com" };
//   // baseUrl = { value: "http://18.225.117.122:8000" };
// }

// const client = new ApolloClient({
//   uri: `${baseUrl.value}/graphql`,
//   cache: new InMemoryCache(),
// });

// export default client;

import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: import.meta.env.VITE_NEXT_PUBLIC_SITE_URL,
  cache: new InMemoryCache(),
});

export default client;
