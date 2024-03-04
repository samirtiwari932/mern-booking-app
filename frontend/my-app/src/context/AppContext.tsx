"use client"
import Toast from "@/components/ToastComponent";
import React, { useContext, useState } from "react";
import * as apiClient from "../api-client"
import { useQuery } from "react-query";

type toastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR"
}

type AppContext = {
    showToast: (toastMessage: toastMessage) => void;
    isLoggedIn: boolean;
}

const AppContext = React.createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<toastMessage | undefined>(undefined)

    const { isError } = useQuery("validateToken", apiClient.validateToken, {
        retry: false
    })
    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage)
            },
            isLoggedIn: !isError
        }}>
            {toast && (<Toast message={toast.message} type={toast.type} onClose={() => setToast(undefined)} />)}
            {children}
        </AppContext.Provider>
    )

};
export const useAppContext = () => {
    const context = useContext(AppContext);
    return context as AppContext;
}
