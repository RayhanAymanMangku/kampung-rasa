import React from 'react';
import { IconButton } from '@material-ui/core'; // Import IconButton from @material-ui/core

export const LocModal = ({ setShowLocation }) => {

    const handleCloseLocation = () => {
        setShowLocation(false);
    }

    return (
        <div className="modal fixed w-full h-full top-0 left-0 flex flex-col items-center justify-center z-50">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="modal-container bg-white w-96 md:w-2/3 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 px-6">
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold">Lokasi Kami</p>
                        <IconButton onClick={handleCloseLocation} className="modal-close cursor-pointer z-50">

                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-x"
                            >
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>

                        </IconButton>
                    </div>
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15841.418675596438!2d110.0588352!3d-6.9674198!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e70423c91b42429%3A0x2ba3202f46a6ee71!2sRumah%20Makan%20%26%20Pancingan%20Kampoeng%20Rasa!5e0!3m2!1sid!2sid!4v1713761741902!5m2!1sid!2sid"
                        className='w-full mt-2 rounded-sm'
                        height="400"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </div>
            </div>
        </div>
    );
};
