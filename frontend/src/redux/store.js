import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import loginModalReducer from "./slices/loginModalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    loginModal: loginModalReducer,
  },
});
