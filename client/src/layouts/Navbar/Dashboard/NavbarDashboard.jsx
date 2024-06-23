import React, { useState, useEffect } from 'react';
import { Typography, IconButton, Collapse } from '@material-tailwind/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Menu, MenuHandler, MenuList, MenuItem } from '@material-tailwind/react';
import { Button, Avatar, Navbar } from '@material-tailwind/react';
import { ChevronDownIcon, PowerIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useNavigate } from 'react-router-dom';

export const NavbarDashboard = ({ onToggleChange, darkMode }) => {
    const [openNav, setOpenNav] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    return (
        <div className="navbar">
            <Navbar className={`mx-auto px-4 py-4 shadow-none border-none `} style={{ position: 'sticky', top: 0, background: 'none', backdropFilter: 'none' }}>
                <div className="flex ms-auto w-24 text-blue-gray-900">
                    <div className="hidden gap-2 lg:flex">
                        <ul className="flex gap-1">

                            <ProfileMenu username={username} />
                        </ul>
                    </div>
                    <IconButton
                        variant="text"
                        color="blue-gray"
                        className="lg:hidden"
                        onClick={() => setOpenNav(!openNav)}
                    >
                        {openNav ? (
                            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
                        ) : (
                            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
                        )}
                    </IconButton>
                </div>

                {/* Mobile version */}
                <Collapse open={openNav}>
                    <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
                        <button className="px-3 py-2 bg-green-500 hover:bg-green-600 text-white">Location</button>
                    </div>
                </Collapse>
            </Navbar>
        </div>
    );
};

function ProfileMenu({ username }) {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const navigate = useNavigate();

    const handleSignOut = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('username');
        navigate("/");
    };

    return (
        <Menu open={isMenuOpen} handler={setIsMenuOpen}>
            <MenuHandler>
                <Button
                    variant="text"
                    color="blue-gray"
                    className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
                >
                    <Avatar
                        variant="circular"
                        size="sm"
                        alt="user"
                        className="border border-gray-900 p-0.5"
                        src='/assets/img/Items/profile.webp'
                    />
                    <ChevronDownIcon
                        strokeWidth={2.5}
                        className={`h-3 w-3 transition-transform ${isMenuOpen ? "rotate-180" : ""}`}
                    />
                </Button>
            </MenuHandler>
            <MenuList className="p-1">
                <MenuItem className="flex items-center gap-2 rounded">
                    <UserCircleIcon className="h-4 w-4" strokeWidth={2} />
                    <Typography as="span" variant="small" className="font-normal">
                        {username}
                    </Typography>
                </MenuItem>
                <MenuItem
                    onClick={handleSignOut}
                    className="flex items-center gap-2 rounded hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                >
                    <PowerIcon className="h-4 w-4 text-red-500" strokeWidth={2} />
                    <Typography as="span" variant="small" className="font-normal" color="red">
                        Sign Out
                    </Typography>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
