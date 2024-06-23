import React from "react";
import {
    Navbar,
    MobileNav,
    List,
    IconButton,
    Switch,
} from "@material-tailwind/react";
import { DineInModal } from "../../../components/Modal/Home/DineInModal";
import { TakeWayModal } from "../../../components/Modal/Home/TakeWayModal";

export function StickyNavbar({ onToggleChange, darkMode }) {
    const [showDineIn, setShowDineIn] = React.useState(false);
    const [showTakeAway, setShowTakeAway] = React.useState(false);
    const [openNav, setOpenNav] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => window.innerWidth >= 960 && setOpenNav(false);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleOpenDineIn = () => {
        setShowDineIn(true);
    };

    const handleOpenTakeAway = () => {
        setShowTakeAway(true);
    };

    function NavList() {
        return (
            <List className="flex flex-col lg:flex-row lg:gap-2 mt-4 mb-6 lg:mt-0 lg:mb-0 p-0">
                <li className="list-none">
                    <a href="#sec-2" className={`px-3 py-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'} hover:text-orange-700/90 text-sm transition duration-200`}>Menu</a>
                </li>
                <li className="list-none">
                    <a href="#content" className={`px-3 py-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'} hover:text-orange-700/90 text-sm transition duration-200`} onClick={handleOpenDineIn}>Dine In</a>
                </li>
                <li className="list-none">
                    <a href="#" className={`px-3 py-2 font-medium ${darkMode ? 'text-white' : 'text-gray-900'} hover:text-orange-700/90 text-sm transition duration-200`} onClick={handleOpenTakeAway}>Take Away</a>
                </li>
                <SwitchCustomStyles onToggleChange={onToggleChange} />
            </List>
        );
    }

    return (
        <div className="sticky top-0 z-10 w-full items-center">
            <Navbar className={`shadow-none lg:px-24 lg:py-4 mx-auto max-w-full ${darkMode ? 'bg-[#17202A] border-none backdrop-blur-none' : 'bg-white'}`}>
                <div className="flex items-center justify-between">
                    <img src={darkMode ? "/assets/img/Logo/logo-fix-2.png" : "/assets/img/Logo/logo-fix-1.png"} className="w-36 h-8" alt="logo" />
                    <div className="hidden lg:flex items-center gap-4">
                        <NavList />
                    </div>
                    <IconButton
                        variant="text"
                        className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
                        ripple={false}
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="h-6 w-6"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2}
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        )}
                    </IconButton>
                </div>
                <MobileNav open={openNav}>
                    <NavList />
                    <div className="flex flex-col gap-2 mt-4"></div>
                </MobileNav>
            </Navbar>
            {showDineIn && <DineInModal setDineInModal={setShowDineIn} />}
            {showTakeAway && <TakeWayModal setShowTakeWay={setShowTakeAway} />}
        </div>
    );
}





export function SwitchCustomStyles({ onToggleChange }) {
    const [checked, setChecked] = React.useState(false);

    const handleChange = (event) => {
        const newChecked = event.target.checked;
        setChecked(newChecked);
        onToggleChange(newChecked);
    };

    return (
        <Switch
            id="custom-switch-component"
            ripple={false}
            checked={checked}
            onChange={handleChange}
            className="h-full w-full checked:bg-[#2ec946]"
            containerProps={{
                className: "w-11 h-6 relative",
            }}
            circleProps={{
                className: "before:hidden left-0.5 border-none flex items-center justify-center",
            }}
        />
    );
}



