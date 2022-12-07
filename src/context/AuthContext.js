import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)
    const [current, setCurrent] = useState(JSON.parse(localStorage.getItem('current')) || null)
    useEffect(() => {
        localStorage.setItem('user', JSON.stringify(user))
    }, [user])
    const login = (token, user) => {
        localStorage.setItem('current', JSON.stringify(user))
        setCurrent(true)
        setUser({
            accessToken: token,
            user: user
        })

    }
    const logOut = () => {
        localStorage.removeItem('current')
        setCurrent(null)
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{ user, login, setUser, current, logOut }}>
            {children}
        </AuthContext.Provider>
    )
}