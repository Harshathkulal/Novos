// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import userReducer from "@/redux/slices/userSlice";
import chatReducer from "@/redux/slices/chatSlice";

const rootReducer = combineReducers({
  user: userReducer,
  chat: chatReducer,
});


export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
