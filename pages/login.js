import React from 'react'
import Login from "../components/Login";
import Head from 'next/head';

const LoginScreen = () => {
    return (
        <>
            <Head>
                <title>Señor del Luren</title>
                <link
                rel="stylesheet"
                href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.css"
                integrity="sha512-oHDEc8Xed4hiW6CxD7qjbnI+B07vDdX7hEPTvn9pSZO1bcRqHp8mj9pyr+8RVC2GmtEfI2Bi9Ke9Ass0as+zpg=="
                crossOrigin="anonymous"
                referrerPolicy="no-referrer"
                />
                <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/boxicons@latest/css/boxicons.min.css"
                />
            </Head>
            <Login />
        </>
    )
}

export default LoginScreen
