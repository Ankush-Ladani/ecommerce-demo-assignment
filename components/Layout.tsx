import React from "react";
import Header from "./Header";
import { Inter } from "next/font/google";

interface Props {
    children: React.ReactNode;
}
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const Layout: React.FC<Props> = ({ children }) => {
    return (
        <>
            <Header />
            <main className={`${inter.className} w-11/12 mx-auto max-w-screen-2xl mt-10 mb-20`}>{children}</main>
        </>
    );
};

export default Layout;
