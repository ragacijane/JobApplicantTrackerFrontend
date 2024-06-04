"use client";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

// if user is auth, render name and sign out link
// else we render signin and signup

//to see if user is auth we use useSession from next-auth


const SignInButton = () => {

    //const session = await getServerSession(authOptions);
    const { data: session } = useSession();
    // console.log("*****TEST******");
    // console.log({ session })
    if (session && session.user)
        return (
            <div className="flex gap-4 ml-auto">
                <p className="text-sky-600">{session.user.username}</p>
                <Link
                    href={"/api/auth/signout"}
                    className="flex gap-4 ml-auto text-red-600"
                >
                    Sign Out
                </Link>
            </div>
        );

    return (
        <div className="flex gap-4 ml-auto items-center">
            <Link
                href={"/api/auth/signin"}
                className="flex gap-4 ml-auto text-green-600"
            >
                Sign In
            </Link>
            <Link
                href={"/signup"}
                className="flex gap-4 ml-auto bg-green-600 text-green-200 p-2 rounded"
            >
                Sign Up
            </Link>
        </div>
    );
};

export default SignInButton;