'use client'
import React from "react";
import LeftMenu from "@/components/layout/LeftMenu";
import RightMenu from "@/components/layout/RightMenu";
import Header from "@/components/layout/Header";

const MainLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <>
            <Header/>
            {/* MAIN */}
            <div className="flex justify-center h-screen">
                <LeftMenu/>
                {/* MAIN CONTENT */}
                <main className="w-full lg:w-2/3 xl:w-2/5 pt-32 lg:pt-16 px-2">
                    {children}
                </main>
                {/* END MAIN CONTENT */}
                <RightMenu/>
            </div>
            {/* END MAIN */}
        </>
    );
};

export default MainLayout;