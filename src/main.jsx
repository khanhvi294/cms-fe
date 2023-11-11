import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { queryClient } from "../config/reactQueryConfig.js";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { router } from "./routes/index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </QueryClientProvider>
    </Provider>
  </>
);
