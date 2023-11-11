import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slices/userSlice";
// import socketReducer from "./slices/socketSlice";
// import postReducer from "./slices/postSlice";
// import commentReducer from "./slices/commentSlice";
// import authReducer from "./slices/authSlice";
// import bookmarkReducer from "./slices/bookmarkSlice";
// import profileReducer from "./slices/profileSlice";

const rootReducer = combineReducers({
  user: userReducer,
  //   socket: socketReducer,
  //   post: postReducer,
  //   comment: commentReducer,
  //   auth: authReducer,
  //   bookmark: bookmarkReducer,
  //   profile: profileReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["user"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
