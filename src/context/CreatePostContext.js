import { createContext, useState } from "react";

export const ModalContext = createContext()

export default function CreatePostProvider({ children }) {
    const [isOpen, setIsOpen] = useState(false)
    return (<ModalContext.Provider value={{ isOpen, setIsOpen }}>
        {children}
    </ModalContext.Provider>)
}