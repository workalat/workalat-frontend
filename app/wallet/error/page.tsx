"use client"
import { useEffect } from "react";


export default function ManageMembershipPage() {
    useEffect(()=>{
        setTimeout(()=>{
            // Redirect to home page after 1.5 seconds
            window.location.href = "/";
        }, 1500)
    }, []);
    return (
        <>
        <h1>Payment Unsuccessfull</h1>
        </>
    )
}
