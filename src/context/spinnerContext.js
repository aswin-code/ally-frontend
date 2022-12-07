import { createContext, useState } from "react";

export const SpinnerContext = createContext()

export default function CreatePostProvider({ children }) {
    const [Loading, setLoading] = useState(false)
    return (<SpinnerContext.Provider value={{ Loading, setLoading }}>
        {children}
    </SpinnerContext.Provider>)
}