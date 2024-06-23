import React from "react";
import { Typography } from "@material-tailwind/react";

export function FooterWithLogo({ darkMode }) {
    return (
        <footer className={`w-full p-8 ${darkMode ? 'bg-none bg-transparent' : 'bg-white'}`} >
            <div className={`flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-10 text-center md:justify-between px-16 ${darkMode ? 'bg-none bg-transparent text-white' : 'bg-white text-black'}`}>
                <img src={darkMode ? "/assets/img/Logo/logo-fix-2.png" : "/assets/img/Logo/logo-fix-1.png"} className="w-36 h-8" alt="logo" />
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 ">
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color={darkMode ? 'white' : 'blue-gray'}
                            className={`font-normal transition-colors hover:text-blue-500 focus:text-blue-500 ${darkMode ? 'hover:text-gray-300' : ''}`}
                        >
                            Tentang Kami
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color={darkMode ? 'white' : 'blue-gray'}
                            className={`font-normal transition-colors hover:text-blue-500 focus:text-blue-500 ${darkMode ? 'hover:text-gray-300' : ''}`}
                        >
                            Reservasi
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color={darkMode ? 'white' : 'blue-gray'}
                            className={`font-normal transition-colors hover:text-blue-500 focus:text-blue-500 ${darkMode ? 'hover:text-gray-300' : ''}`}
                        >
                            Menu
                        </Typography>
                    </li>
                    <li>
                        <Typography
                            as="a"
                            href="#"
                            color={darkMode ? 'white' : 'blue-gray'}
                            className={`font-normal transition-colors hover:text-blue-500 focus:text-blue-500 ${darkMode ? 'hover:text-gray-300' : ''}`}
                        >
                            Hubungi Kami
                        </Typography>
                    </li>
                </ul>
            </div>
            <hr className={`my-8 ${darkMode ? 'border-gray-700' : 'border-blue-gray-50'}`} />
            <Typography color={darkMode ? 'white' : 'blue-gray'} className="text-center font-normal">
                &copy; 2024 by Kampung Rasa. All rights reserved.
            </Typography>
        </footer>
    );
}
