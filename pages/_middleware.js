import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'


export default async function middleware (req, event) {
    // console.log("middleware");
    // const token = req.headers['authorization'];
    // if (!token) {
        return NextResponse.next()
    // }
    
    // const isLoggedIn = await auth();
    // console.log("isLoggedIn:", isLoggedIn);
    
    

    // // const isLoggedIn = validateToken(token);

    // if(isLoggedIn){
    //     // return new Response("Access granted!")
    //     return event.respondWith(NextResponse.redirect('/prueba'));
    // }else {
    //     return event.respondWith(NextResponse.redirect('/'));
    // }
    
}
