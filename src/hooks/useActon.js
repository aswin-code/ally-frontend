import { useContext } from "react"
import { ActionContext } from "../context/ActionContext"

const useAction = () => {

    return useContext(ActionContext)
}

export default useAction