import { createContext, useEffect, useState } from "react";

export const DarkModeContext = createContext()

export const DarkModeContextProider = ({ children }) => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage.getItem("darkMode")) || false)
    const toggle = () => {
        setDarkMode(!darkMode)
    }
    useEffect(() => {
        localStorage.setItem("darkMode", JSON.stringify(darkMode))
    }, [darkMode])
    return (
        <DarkModeContext.Provider value={{ toggle, darkMode }}>
            {children}
        </DarkModeContext.Provider>)
}