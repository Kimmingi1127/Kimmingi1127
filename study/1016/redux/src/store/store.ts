import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./slices/counterSlices";
import exp from "constants";
import todoReducer from "./slices/todoSlice";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        todo: todoReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;