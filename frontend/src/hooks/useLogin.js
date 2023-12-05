import { useState } from "react";
import { useAuthContext } from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const login = async (arg1, password) => {
        setIsLoading(true)
        setError(null)
        const mailpattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        const body = {
            'password':password
        }
        if (mailpattern.test(arg1)) {
            body['email'] = arg1
        } else {
            body['username'] = arg1
        }
        const response = await fetch('https://fp-blog.onrender.com/api/user/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        })
        const json = await response.json()
        console.log(JSON.stringify(json))
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok) {
            // saveing the user to the local storage JWT
            localStorage.setItem('user', JSON.stringify(json))
            //update the authcontext
            dispatch({type: 'LOGIN', PAYLOAD: json})
            setIsLoading(false)
        }
    }

    return { login, isLoading, error}    
}
