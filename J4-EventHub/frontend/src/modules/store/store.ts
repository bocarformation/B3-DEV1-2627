import { combineReducers, configureStore } from "@reduxjs/toolkit";
import type { Dependencies } from "./dependencies";
import { useDispatch } from "react-redux";

const reducers = combineReducers({});

export type AppState = ReturnType<typeof reducers>;

export const createStore = (config: { dependencies: Dependencies; preloadedState?: Partial<AppState> }) => {
    return configureStore({
        reducer: reducers,
        devTools: true,
        preloadedState: config.preloadedState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                thunk: { extraArgument: config.dependencies } // D de Solid, Injection de dépendances
            })

    })
}

export type AppStore = ReturnType<typeof createStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppGetState = AppStore["getState"];

export const useAppDispatch = () => useDispatch<AppDispatch>();


