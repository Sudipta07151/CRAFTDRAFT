import React, { createContext, useState, useEffect } from 'react'
import { useRouter } from 'next/dist/client/router';
import { API_URL, NEXT_URL } from 'config';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [error, setError] = useState(null)
    const router = useRouter();

    useEffect(() => checkedUserLoggedIn(), [])
    console.log('AUTH CONTEXT: ', user)
    //Register
    const register = async (user) => {
        console.log(user)
        const res = await fetch(`${NEXT_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            setUser(data.user);
            router.push('/');
            console.log(data);
        } else {
            setError(data.message);
            setError(null);
        }
    }


    //Login
    const Login = async ({ email: identifier, password }) => {
        // console.log(identifier, password)
        const res = await fetch(`${NEXT_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json'
            },
            body: JSON.stringify({
                identifier,
                password
            })
        })
        const data = await res.json();
        console.log(data);
        if (res.ok) {
            setUser(data.user);
            router.push('/');
            console.log(data);
        } else {
            setError(data.message);
            setError(null);
        }
    }

    //Logout
    const Logout = async () => {

        const res = await fetch(`${NEXT_URL}/api/logout`, {
            method: 'POST'
        })
        if (res.ok) {
            setUser(null);
            console.log('set user logged out')
            router.push('/');
        }
    }

    //Check if user is logged in
    const checkedUserLoggedIn = async () => {
        const res = await fetch(`${NEXT_URL}/api/user`)
        const data = await res.json()

        if (res.ok) {
            setUser(data.user);
        } else {
            setUser(null)
        }
    }
    return (
        <AuthContext.Provider value={{
            user, error, register, Login, Logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}


export default AuthContext;