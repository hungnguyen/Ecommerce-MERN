"use client";

import React, { useEffect, useState } from "react";


export default function useCache(
    cacheType: "sessionStorage" | "localStorage",
    key: string
) {
    const [isReady, setIsReady] = useState<boolean>(false);
    useEffect(()=>{
        setIsReady(true);
    },[]);

    function setItem(value: string){
        if(isReady && typeof window !== 'undefined' && window[cacheType]){
            window[cacheType].setItem(key, value);
        }
    }

    function getItem(){
        if(isReady && typeof window !== 'undefined' && window[cacheType]){
            return window[cacheType].getItem(key);
        }
    }
    function getItemT<T>(){
        if(isReady && typeof window !== 'undefined' && window[cacheType]){
            const value = window[cacheType].getItem(key);
            if(value){
                return JSON.parse(value) as T;
            }
        }
    }

    function removeItem(){
        if(isReady && typeof window !== 'undefined' && window[cacheType]){
            window[cacheType].removeItem(key);
        }
    }

    return {
        setItem,
        getItem,
        getItemT,
        removeItem
    }
}