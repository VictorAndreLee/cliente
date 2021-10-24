import React from "react";
import Head from "next/dist/shared/lib/head";
import Sidebar from "../components/Sidebar";
import {useRouter} from "next/router"
import { route } from "next/dist/server/router";
const Layout = ({children}) => {

    const router = useRouter();

    return (
        <>
            <head>

            <title>Panel administrativo</title>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css" integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg==" crossorigin="anonymous" referrerpolicy="no-referrer" />
            <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"/>
            <link rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"/>

            </head>

            {router.pathname === "/login" ? (
                <div>
                    {children}
                </div>
            ): (
                <div className = "bg-gray-200 min-h-screen" >
                <div className="flex min-h-sreen">
                    <Sidebar/>
                    <main className="sm:w-2/3 xl:w-4/5 sm:min-h-screen p-5">
                        {children}

                    </main>
                    
                </div>
            </div>
            )}
        </>
    );
}

export default Layout;