"use client"
import Toast from "@/components/ToastComponent";
import React, { useContext, useState } from "react";

type toastMessage = {
    message: string;
    type: "SUCCESS" | "ERROR"
}

type AppContext = {
    showToast: (toastMessage: toastMessage) => void;
}

const AppContext = React.createContext<AppContext | undefined>(undefined)

export const AppContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [toast, setToast] = useState<toastMessage | undefined>(undefined)
    return (
        <AppContext.Provider value={{
            showToast: (toastMessage) => {
                setToast(toastMessage)
            }
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
