import React from "react";
import * as ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

import theme from "./theme";

import { QueryClientProvider, QueryClient } from "react-query";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";

const rootEl = document.getElementById("root");

const root = rootEl && ReactDOM.createRoot(rootEl);

const client = new QueryClient();

root?.render(
  <BrowserRouter>
    <QueryClientProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </BrowserRouter>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
