"use client"
import Manage from "@/components/Membership/manage/Manage";
import AuthNavbar from "@/components/navbar/auth_navbar";


import { Box, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import arrowRightSm from "@/public/icons/arrow_right_sm.svg";
import { GoDotFill } from "react-icons/go";
import { FaArrowRight } from "react-icons/fa6";
import { IoMdEye } from "react-icons/io";
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
