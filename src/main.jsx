import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import persistStore from "redux-persist/es/persistStore";
import { queryClient } from "../config/reactQueryConfig.js";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { router } from "./routes/index.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PersistGate loading={null} persistor={persistStore(store)}>
          <RouterProvider router={router} />
          <React.StrictMode>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <App />
          </React.StrictMode>
        </PersistGate>
      </QueryClientProvider>
    </Provider>
  </>
);
