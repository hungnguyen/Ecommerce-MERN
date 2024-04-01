"use client"

const endpoint = process.env.NEXT_PUBLIC_IMAGE_URL + "/api/v1/auth";
const apiUser = process.env.NEXT_PUBLIC_API_USER;
const apiPassword = process.env.NEXT_PUBLIC_API_PASSWORD;

export async function getToken(): Promise<string | null>{
    const store: Storage = sessionStorage;
    try{
        let token = store.getItem("token");
        if(token) return token;

        const result = await fetch(endpoint, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: apiUser,
                password: apiPassword
            })
        });
        token = (await result.json()).token;
        token && store.setItem("token", token);
        return token;
    }
    catch(e){
        console.error("Error: ", e);
        return null;
    }
}