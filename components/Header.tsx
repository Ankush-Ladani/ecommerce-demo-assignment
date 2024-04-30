import React from "react";

interface Props {}

const Header: React.FC<Props> = (props) => {
    return (
        <header className="bg-gray-900 text-white">
            <div className="w-11/12 mx-auto max-w-screen-2xl flex items-center justify-between py-6 ">
                <h1 className="text-3xl font-bold">Online Shop</h1>
            </div>
        </header>
    );
};

export default Header;
