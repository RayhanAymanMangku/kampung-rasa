import React from 'react'
import { IconButton } from '@material-ui/core';

export const OrderModal = ({ setShowModal }) => {

    const handleCloseModal = () => {
        setShowModal(false)
        // console.log('close')

    }

    return (
        <div className="modal fixed w-full h-full top-0 left-0 flex flex-col items-center justify-center z-50 overflow-y-auto p-4">
            {/* Modal overlay */}
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            {/* Modal container */}
            <div className="modal-container bg-white w-96 md:w-2/3 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 px-6">
                    {/* Modal header */}
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold">Pesanan</p>
                        <IconButton onClick={handleCloseModal} className="modal-close cursor-pointer z-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </IconButton>
                    </div>
                    {/* Modal body */}
                    <div className="mt-4">
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center">
                                <p className="text-lg">Ayam Bakar</p>
                                <p className="text-lg">Rp. 20.000</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-lg">Nasi Goreng</p>
                                <p className="text-lg">Rp. 15.000</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-lg">Es Teh</p>
                                <p className="text-lg">Rp. 5.000</p>
                            </div>
                            <div className="flex justify-between items-center">
                                <p className="text-lg">Total</p>
                                <p className="text-lg">Rp. 40.000</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
