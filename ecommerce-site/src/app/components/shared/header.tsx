"use client";

import { useState } from "react";
import Brand from "./brand";
import CartQuickView from "./cart-quick-view";
import Location from "./location";
import TopMenu from "./top-menu";
import Search from "./search";
import RightPanel from "./right-panel";

export default function Header(){
    const [cartOpen, setCartOpen] = useState<boolean>(false);
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
    return(
        <>
            <header>
                <div className="container mx-auto px-6 py-3">
                    <div className="flex items-center justify-between">
                        <Location />
                        <Brand />
                        <CartQuickView 
                            cartOpen={cartOpen}
                            onOpenCart={()=>setCartOpen(!cartOpen)}
                            onOpenMenu={()=>setIsMenuOpen(!isMenuOpen)} />
                    </div>
                    <TopMenu isMenuOpen={isMenuOpen}/>
                    <Search />
                </div>
            </header>
            <RightPanel cartOpen={cartOpen} onClose={()=>setCartOpen(!cartOpen)} />
        </>
    )
}