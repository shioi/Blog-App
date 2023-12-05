import { useAuthContext } from "./useAuthContext"

export const useLogout = () => {

    const {dispatch} = useAuthContext()

    const logout = () => {
        //change the global state and remove the localstorage token
        localStorage.removeItem('user')

        dispatch({type: 'LOGOUT'})
    }

    return { logout }
}