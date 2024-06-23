import React, { useState } from 'react';
import { IconButton } from '@material-ui/core';
import { Tabs, TabsBody, TabPanel } from '@material-tailwind/react';
import { MenuListModalDineIn } from './MenuModal';
import axios from 'axios';
import ReactDOM from 'react-dom';

export const DineInModal = ({ setDineInModal }) => {
    const handleCloseDineInModal = () => {
        setDineInModal(false);
    }

    return ReactDOM.createPortal(
        <>
            <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-40"></div>
            <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white w-96 md:w-2/3 mx-auto rounded shadow-lg overflow-y-auto">
                    <div className="py-4 px-6">
                        <div className="flex justify-between items-center">
                            <p className="text-2xl font-bold">Dine In</p>
                            <IconButton onClick={handleCloseDineInModal} className="cursor-pointer">
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
                        <div className="flex w-full h-auto mt-4">
                            <TabsDineIn />
                        </div>
                    </div>
                </div>
            </div>
        </>,
        document.body
    );
}

const TabsDineIn = () => {
    const [activeTab, setActiveTab] = useState("Event");
    const [formData, setFormData] = useState({
        namaCustomer: '',
        kontakCustomer: '+62',
        jumlahOrang: 0,
        jenisEvent: '',
        selectedTable: ''
    });

    const [showMenuList, setShowMenuList] = useState(false);
    const [availableTables, setAvailableTables] = useState([]);
    const [idCustomer, setIdCustomer] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'kontakCustomer' && !value.startsWith('+62')) {
            return;
        }

        if (name === 'jenisEvent') {
            let tables = [];
            switch (value) {
                case 'Semeru':
                    tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8', 'Table 9', 'Table 10'];
                    break;
                case 'Merbabu':
                    tables = ['Table 1', 'Table 2', 'Table 3', 'Table 4', 'Table 5', 'Table 6', 'Table 7', 'Table 8'];
                    break;
                case 'Kerinci':
                    tables = ['Table 1', 'Table 2', 'Table 3'];
                    break;
                default:
                    tables = [];
            }
            setAvailableTables(tables);
        }

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleLanjutClick = async () => {
        const { namaCustomer, kontakCustomer, jenisEvent, selectedTable } = formData;

        if (!namaCustomer || !kontakCustomer || !jenisEvent || !selectedTable) {
            alert('Semua kolom harus diisi');
            return;
        }

        const customerData = {
            namaCustomer: namaCustomer,
            kontakCustomer: kontakCustomer
        };

        try {
            const customerResponse = await axios.post("/Customer/HandleDataCustomer.php", customerData);
            const idCustomerFromResponse = customerResponse.data.idCustomer;

            const dineInData = {
                idCustomer: idCustomerFromResponse,
                selectedTable: selectedTable.replace('Table ', ''), // Extract table number from selectedTable string
            };

            console.log("Sending DineIn data:", dineInData); // Debugging log
            const dineInResponse = await axios.post("/DineIn/HandleDataDineIn.php", dineInData);

            console.log("Received DineIn response:", dineInResponse.data); // Debugging log

            setIdCustomer(idCustomerFromResponse);
            setShowMenuList(true);
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const data = [
        {
            label: "Dine In",
            form: (
                <div className="flex flex-col w-full space-y-4 mt-4">
                    <label htmlFor="#" className='text-gray-600'>Isi form pemesan</label>
                    <input
                        type="text"
                        placeholder="Nama Pemesan"
                        className="border border-gray-300 rounded-sm p-2"
                        value={formData.namaCustomer}
                        onChange={handleChange}
                        name='namaCustomer'
                    />
                    <input
                        type="text"
                        placeholder="Telepon"
                        className="border border-gray-300 rounded-sm p-2"
                        value={formData.kontakCustomer}
                        onChange={handleChange}
                        name='kontakCustomer'
                    />
                    <input
                        type="number"
                        placeholder="Jumlah Orang"
                        className="border border-gray-300 rounded-sm p-2"
                        value={formData.jumlahOrang}
                        name='jumlahOrang'
                        onChange={handleChange}
                    />
                    <div className="flex w-72 flex-col gap-6">
                        <select
                            label="Jenis Event"
                            className='rounded-sm border-gray-300 font-sans p-2 border'
                            name='jenisEvent'
                            onChange={handleChange}
                        >
                            <option value="">Pilih Aula</option>
                            <option value="Semeru">Aula Semeru (Kapasitas 5 - 8 orang)</option>
                            <option value="Merbabu">Aula Merbabu (Kapasitas 8 - 12 orang)</option>
                            <option value="Kerinci">Aula Kerinci (Kapasitas 12 - 15 orang)</option>
                        </select>
                    </div>
                    {formData.jenisEvent && (
                        <div className="flex flex-col w-full space-y-4 mt-4">
                            <label htmlFor="#" className='text-gray-600'>Pilih Meja</label>
                            <select
                                name="selectedTable"
                                value={formData.selectedTable}
                                onChange={handleChange}
                                className="border border-gray-300 rounded-sm p-2"
                            >
                                <option value="">Pilih Meja</option>
                                {availableTables.map((table, index) => (
                                    <option key={index} value={table}>{table}</option>
                                ))}
                            </select>
                        </div>
                    )}
                    <button
                        className="w-full bg-gray-900 text-white py-2 mt-4 rounded-sm"
                        onClick={handleLanjutClick}
                    >
                        Lanjut
                    </button>
                    {showMenuList && (
                        <MenuListModalDineIn
                            setShowMenuList={setShowMenuList}
                            idCustomer={idCustomer}
                            namaCustomer={formData.namaCustomer}
                            kontakCustomer={formData.kontakCustomer}
                        />
                    )}
                </div>
            ),
            value: "Event",
        },
    ];

    return (
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value)} className='w-full mt-4 '>
            <TabsBody>
                {data.map(({ value, form }) => (
                    <TabPanel key={value} value={value} className='p-0'>
                        {form}
                    </TabPanel>
                ))}
            </TabsBody>
        </Tabs>
    );
};

export default TabsDineIn;
