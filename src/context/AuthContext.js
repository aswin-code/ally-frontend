import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])
    const Login = () => {

        setUser({ id: 1, name: 'user' })

    }
    return (
        <AuthContext.Provider value={{ user, Login }}>
            {children}
        </AuthContext.Provider>
    )
}