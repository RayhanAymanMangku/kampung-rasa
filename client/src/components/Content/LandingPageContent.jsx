import React, { useState, useEffect } from 'react';
import './LandingPageContent.css';
import { ArrowRightCircleIcon } from '@heroicons/react/24/solid';
import {
    Card,
    CardHeader,
    CardBody,
    Typography,
    IconButton,
} from "@material-tailwind/react";
import AOS from 'aos';
import { FireIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { ReservasiModal } from '../Modal/Home/ReservasiModal';
import { DisplayMenuModalNav } from '../Modal/Home/DisplayMenuModal';
import { ChatBotModal } from '../Modal/Home/ChatbotModal';
import { Message } from '@material-ui/icons';

const Content = ({ darkMode }) => {
    const [showReservasi, setShowReservasi] = useState(false);
    const [showListMenu, setShowListMenu] = useState(false)
    const [showChatBot, setShowChatBot] = useState(false)

    const handleOpenReservasi = () => {
        setShowReservasi(true);
    }

    const handleOpenMenu = () => {
        setShowListMenu(true)
    }

    const handleOpenChatBot = () => {
        setShowChatBot(true)
    }


    const textColorClass = darkMode ? 'text-white' : 'text-gray-900';
    const subTextColorClass = darkMode ? 'text-gray-300' : 'text-gray-500';
    const botStyle = darkMode ? 'bg-none border-white' : 'bg-white/90 border-gray-800 hover:bg-gray-200'
    const iconBotStyle = darkMode ? 'text-white' : 'text-gray-800 '

    return (
        <>
            <section>
                <div className="w-full h-auto">
                    <div className="grid grid-cols-2 w-full mt-12">
                        <div className="">
                            <h2 className={`md:text-4xl font-bold ${textColorClass} ml-24 text-left`}>Pesan Makanan dan Reservasi di Kampung Rasa.</h2>
                            <p className={`${subTextColorClass} text-left ml-24 mt-4 font-extralight`}>Selain Dine In dan Take Away anda juga dapat melakukan reservasi tempat di Kampung Rasa.</p>
                            <div className="flex w-fit mt-4 ml-24">
                                <button className='px-3 py-2 bg-orange-700 hover:bg-orange-800 transition duration-200 text-white rounded-md flex mr-2' onClick={handleOpenReservasi}>
                                    Reservasi Sekarang
                                    <div>
                                        <ArrowRightCircleIcon className='w-6 h-6 ml-2' />
                                    </div>
                                </button>
                            </div>

                        </div>
                        <div className="">
                            <img src="/assets//img/Items/content-img.png" className=' w-96 h-96 mx-auto' alt="" />
                        </div>
                    </div>
                    <h2 className={`md:text-xl font-bold ${textColorClass} ml-24 text-left`}>Tanya Kami</h2>
                    <button className={`w-12 h-12 rounded-full border-2 md:ml-24 mt-4 hover:bg-white/50 ${botStyle}`} onClick={handleOpenChatBot}>
                        <Message className={`w-8 h-8  mx-auto ${iconBotStyle}`} />
                    </button>

                </div>
                {showReservasi && <ReservasiModal setShowReservasi={setShowReservasi} />}
                {showChatBot && <ChatBotModal setShowChatBot={setShowChatBot} />}
            </section>
            <section id='sec-2'>
                <div className="w-full flex px-24 mt-32">
                    <h2 className={`text-2xl font-bold ${textColorClass}`}>Menu Terlaris</h2>
                    <FireIcon className={`h-8 w-8 ${textColorClass} ml-2`} />
                </div>
                <div className="w-full grid grid-cols-3 gap-4 items-center px-24 mt-4">
                    {menuData.map((item, index) => (
                        <FavMenu key={index} item={item} darkMode={darkMode} />
                    ))}
                    <a href="#" className={`${textColorClass} font-semibold`} onClick={handleOpenMenu}>Lihat Semua</a>
                </div>
                {showListMenu && <DisplayMenuModalNav setShowListMenu={setShowListMenu} />}
            </section>
            <section>
                <div className="w-full flex px-24 mt-28">
                    <h2 className={`text-2xl font-bold ${textColorClass}`}>Lokasi Kami</h2>
                    <MapPinIcon className={`h-8 w-8 ${textColorClass} ml-2`} />
                </div>
                <div className="w-full flex mt-4 mb-6">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15841.418675596438!2d110.0588352!3d-6.9674198!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70423c91b42429%3A0x2ba3202f46a6ee71!2sRumah%20Makan%20%26%20Pancingan%20Kampoeng%20Rasa!5e0!3m2!1sen!2sid!4v1718137106054!5m2!1sen!2sid"
                        width="100%"
                        height="400"
                        style={{ border: 0 }}
                        className='px-24'
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </section>
        </>
    );
};

export default function LandingPageContent({ darkMode }) {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div className="lp-content">
            <Content darkMode={darkMode} />
        </div>
    );
}

const menuData = [
    {
        title: "Ayam Bakar",
        price: "Rp. 22.000",
        img: "/assets/img/Items/display-ayam-bakar.png",
        rating: 5.0
    },
    {
        title: "Ayam Goreng",
        price: "Rp. 20.000",
        img: "/assets/img/Items/display-ayam-goreng.png",
        rating: 5.0
    },
    {
        title: "Gurami Bakar",
        price: "Rp. 85.000",
        img: "/assets/img/Items/display-gurame-bakar.png",
        rating: 5.0
    }
];

function FavMenu({ item, darkMode }) {
    const textColorClass = darkMode ? 'text-white' : 'text-gray-900';
    const subTextColorClass = darkMode ? 'text-gray-300' : 'text-gray-500';
    const cardBgClass = darkMode ? 'bg-white/40' : 'bg-orange-700/90 hover:bg-orange-800/90';

    return (
        <Card className={`w-full max-w-[26rem] shadow-md ${cardBgClass} backdrop-blur-sm rounded-md mt-6`}>
            <CardHeader className='rounded-md'>
                <img
                    src={item.img}
                    alt={item.title}
                    className='w-56 h-48 object-cover ml-2'
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60" />
                <IconButton
                    size="sm"
                    color="red"
                    variant="text"
                    className="!absolute top-4 right-4 rounded-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                    >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                    </svg>
                </IconButton>
            </CardHeader>
            <CardBody>
                <div className="mb-3 flex items-center justify-between">
                    <Typography variant="h5" color={darkMode ? 'white' : 'white'} className="font-medium">
                        {item.title}
                    </Typography>
                    <Typography
                        color={darkMode ? 'white' : 'white'}
                        className="flex items-center gap-1.5 font-normal"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="-mt-0.5 h-5 w-5 text-yellow-700"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                                clipRule="evenodd"
                            />
                        </svg>
                        {item.rating}
                    </Typography>
                </div>
                <Typography color={darkMode ? 'white' : 'white'}>
                    Price: {item.price}
                </Typography>
            </CardBody>
        </Card>
    );
}
