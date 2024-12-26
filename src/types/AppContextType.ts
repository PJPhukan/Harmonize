import { Dispatch, SetStateAction } from "react";

export interface AppContext {
    isLoggedIn: boolean;
    name?: string;
    setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
}