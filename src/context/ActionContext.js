import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

export const ActionContext = createContext()

export default function ActionContextProvider({ children }) {
    const [action, setAction] = useState(0);
    const axiosPrivate = useAxiosPrivate()
    const { user, setUser } = useAuth()
    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUser = async () => {
            try {
                const { data } = await axiosPrivate.get(`/user/${user?.user?._id}`, {
                    signal: controller.signal
                })
                isMounted && setUser(prev => {
                    return { ...prev, user: data }
                })

            } catch (error) {
                console.log(error)
            }
        }
        getUser()
        return () => {
            isMounted = false;
            controller.abort();
        }
    }, [action])
    return (<ActionContext.Provider value={{ action, setAction }}>
        {children}
    </ActionContext.Provider>)
}