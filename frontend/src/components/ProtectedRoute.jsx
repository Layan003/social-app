import React from 'react'
import api from '../api'
import { useState, useEffect } from 'react'
import { jwtDecode } from "jwt-decode"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute({ component: Component }) {
    const [ isAuthorized, setIsAuthorized ] = useState(null);

    useEffect(()=> {
        auth().catch((error) => setIsAuthorized(false))
    }, []);

    const auth = async () => {
        const token = localStorage.getItem("access");
        if (!token){
            setIsAuthorized(false);
            return
        }

        const decoded = jwtDecode(token);
        const tokenExp = decoded.exp;
        const now = Date.now() / 1000

        if( tokenExp < now ) {
            await refreshToken()
        }
        else{
            setIsAuthorized(true)
        }
    }

    const refreshToken = async () => {
        try {
            const res = await api.post("users/token/refresh", {
                refresh: localStorage.getItem("refresh")
            })
            if ( res.status == 200 ) {
                localStorage.setItem("refresh", res.data.access)
                setIsAuthorized(true)
            }
            else{
                setIsAuthorized(false)
            }
        }
        catch (error) {
            console.log(error)
            setIsAuthorized(false)
        }
    }

    if ( isAuthorized === null ) {
        return <div>Loading...</div>
    }

  return isAuthorized ? (<Component/>) : (<Navigate to="/signup"/>)
}