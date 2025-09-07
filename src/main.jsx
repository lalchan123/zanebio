import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { AppProvider } from "./AppContext";
import { ApolloProvider } from "@apollo/client";
import client from "../ApolloClient.js";
import { Provider } from "react-redux";
import store from "./store";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppProvider>
      <Provider store={store}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </Provider>
    </AppProvider>
  </React.StrictMode>
);
