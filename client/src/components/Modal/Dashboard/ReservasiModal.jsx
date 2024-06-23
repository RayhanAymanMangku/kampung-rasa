import React from 'react'
import { IconButton } from '@material-ui/core';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
} from "@material-tailwind/react";
import { useState } from 'react';

export const ReservasiModal = ({ setShowReservasi }) => {

    const handleCloseReservasi = () => {
        setShowReservasi(false)
    }
    return (
        <>
            <div className="modal fixed w-full h-full top-0 left-0  flex flex-col items-center justify-center z-50">
                <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
                <div className="modal-container bg-white w-96 md:w-2/3 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                    <div className="modal-content py-4 px-6">
                        <div className="flex justify-between items-center">
                            <p className="text-2xl font-bold">Reservasi</p>
                            <IconButton onClick={handleCloseReservasi} className="modal-close cursor-pointer z-50">

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
                        <div className="w-full h-auto mt-4">
                            <h4 className='text-xl font-semibold'>Pilih Jenis Layanan</h4>
                            <TabsReservasi />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


function TabsReservasi() {
    const [activeTab, setActiveTab] = useState("Event");
    const [jumlahOrang, setJumlahOrang] = useState(0);

    const handleSetOrang = (e) => {
        setJumlahOrang(e.target.value);
    }

    const [formData, setFormData] = useState({
        jenisEvent: '',
        namaCustomer: '',
        jumlahOrang: 0,
        noWa: '+6281392081108', // set +62
        tanggal: '',

    });

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'kontakCustomer') {
            if (!value.startsWith('+62')) {
                return;
            }
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const response = await fetch('/Whatsapp/HandleSendWhatsapp.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            const data = await response.json();
            window.location.href = data.whatsapp_url;
        } else {
            console.error('gagal kirim data');
        }
    };
    const data = [
        {
            label: "Event",
            form: (
                <form onSubmit={handleSubmit} className="flex flex-col w-full space-y-4 mt-4">
                    <label htmlFor="#" className='text-gray-600'>Isi form pemesan</label>
                    <div className="flex w-72 flex-col gap-6">
                        <select label="Jenis Event" className='rounded-sm border-gray-300 font-sans p-2 border' name='jenisEvent' onChange={handleChange}>

                            <option value="opsi">Pilih jenis acara</option>
                            <option value="Arisan">Arisan</option>
                            <option value="Rapat">Rapat</option>
                            <option value="Ulang Tahun">Ulang Tahun</option>
                            <option value="Reuni">Reuni</option>
                            <option value="Buka Puasa">Buka Puasa</option>
                        </select>
                    </div>
                    <input
                        type="text"
                        placeholder="Nama Pemesan"
                        className="border border-gray-300 rounded-sm p-2"
                        value={formData.namaCustomer}
                        onChange={handleChange}
                        name='namaCustomer'
                    />
                    <input
                        type="date"
                        placeholder="Tanggal Reservasi"
                        className="border border-gray-300 rounded-sm p-2"
                        value={formData.tanggal}
                        onChange={handleChange}
                        name='tanggal'
                    />
                    <input
                        type="number"
                        placeholder="Jumlah Orang"
                        className="border border-gray-300 rounded-sm p-2"
                        value={formData.jumlahOrang}
                        name='jumlahOrang'
                        onChange={handleChange}
                    />

                    <button type="submit" className="w-full bg-gray-900 text-white py-2 mt-4 rounded-sm">Pesan</button>
                </form>
            ),
            value: "Event",
        },
    ]
    // //         label: "Ulang Tahun",
    // //         value: "ulangTahun",
    // //         form: (
    // //             <div className="flex flex-col w-full space-y-4 mt-4">
    // //                 <label htmlFor="#" className='text-gray-600'>Isi form pemesan</label>
    // //                 <input
    // //                     type="text"
    // //                     placeholder="Nama Pemesan"
    // //                     className="border border-gray-300 rounded-sm p-2"
    // //                     // value={namaCustomer}
    // //                     // onChange={(e) => setNamaCustomer(e.target.value)}
    // //                     name='namaCustomer'
    // //                 />
    // //                 <input
    // //                     type="text"
    // //                     placeholder="Telepon"
    // //                     className="border border-gray-300 rounded-sm p-2"
    // //                     // value={kontakCustomer}
    // //                     // onChange={(e) => setKontakCustomer(e.target.value)}
    // //                     name='kontakCustomer'
    // //                 />
    // //                 <button className="w-full bg-gray-900 text-white py-2 mt-4 rounded-sm">Pesan</button>
    // //             </div>
    // //         ),
    // //     },
    // //     {
    // //         label: "Sewa Tempat",
    // //         value: "sewaTempat",
    // //         form: (
    // //             <div className="flex flex-col w-full space-y-4 mt-4">
    // //                 <label htmlFor="#" className='text-gray-600'>Isi form pemesan</label>
    // //                 <input
    // //                     type="text"
    // //                     placeholder="Nama Pemesan"
    // //                     className="border border-gray-300 rounded-sm p-2"
    // //                     // value={namaCustomer}
    // //                     // onChange={(e) => setNamaCustomer(e.target.value)}
    // //                     name='namaCustomer'
    // //                 />
    // //                 <input
    // //                     type="text"
    // //                     placeholder="Telepon"
    // //                     className="border border-gray-300 rounded-sm p-2"
    // //                     // value={kontakCustomer}
    // //                     // onChange={(e) => setKontakCustomer(e.target.value)}
    // //                     name='kontakCustomer'
    // //                 />
    // //                 <input
    // //                     type="date"
    // //                     placeholder="Tanggal"
    // //                     className="border border-gray-300 rounded-sm p-2"
    // //                     // value={kontakCustomer}
    // //                     // onChange={(e) => setKontakCustomer(e.target.value)}
    // //                     name='tanggal'
    // //                 />
    // //                 <label htmlFor="#">Pilih Tempat</label>
    // //                 <div className="grid grid-cols-3">
    // //                     <div className="">
    // //                         <label htmlFor="#" className='mr-2'>Tempat-A</label>
    // //                         <input type="checkbox" name="aula-1" id="" />
    // //                     </div>
    // //                     <div className="">
    // //                         <label htmlFor="#" className='mr-2'>Tempat-B</label>
    // //                         <input type="checkbox" name="aula-2" id="" />
    // //                     </div>
    // //                     <div className="">
    // //                         <label htmlFor="#" className='mr-2'>Tempat-C</label>
    // //                         <input type="checkbox" name="aula-3" id="" />
    // //                     </div>
    // //                 </div>
    // //                 <button className="w-full bg-gray-900 text-white py-2 mt-4 rounded-sm">Pesan</button>
    // //             </div>
    // //         ),
    // //     },

    // ];

    return (
        <>
            <Tabs value={activeTab} onChange={(value) => setActiveTab(value)} className='w-full mt-4'>
                <TabsHeader>
                    {data.map(({ label, value }) => (
                        <Tab key={value} value={value}>
                            {label}
                        </Tab>
                    ))}
                </TabsHeader>
                <TabsBody>
                    {data.map(({ value, desc, form }) => (
                        <TabPanel key={value} value={value} className='p-0'>
                            {value === "Event" ? form : <p>{desc}</p>}
                        </TabPanel>
                    ))}
                </TabsBody>
            </Tabs>
        </>
    );
}
