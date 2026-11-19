import type { ReactNode } from "react";
import { Provider } from "react-redux";
import { app } from "../main";

export const AppWrapper = ({children}: {children: ReactNode}) => (
    <Provider store={app.store}>{children}</Provider>
    
)