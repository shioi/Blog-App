import { useState } from "react";
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, username, password) => {
        setIsLoading(true)
        setError(null)
        console.log(JSON.stringify({ email, username, password }))
        const response = await fetch('https://fp-blog.onrender.com/api/user/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email, username, password})
        })
        const json = await response.json()
        console.log(JSON.stringify(json))
        if (!response.ok) {
            setIsLoading(false)
            setError(json.error)
            return null;
        }
        if (response.ok) {
            // saveing the user to the local storage JWT
            localStorage.setItem('user', JSON.stringify(json))
            //update the authcontext
            dispatch({type: 'LOGIN', PAYLOAD: json})
            setIsLoading(false)
            return true;
        }
    }

    return { signup, isLoading, error}    
}
