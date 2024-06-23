import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const DataReservasi = () => {
    const [reservasiList, setReservasiList] = useState([]);
    const [newReservasi, setNewReservasi] = useState({});

    useEffect(() => {
        fetchReservasiData();
    }, []);

    const fetchReservasiData = async () => {
        try {
            const response = await fetch('/Reservation/HandleDataReservasi.php');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const data = await response.json();
            setReservasiList(data);

        } catch (error) {
            console.error('Error fetching reservation data:', error);
        }
    };

    const handleSave = async () => {
        try {
            const response = await axios.post('/Reservation/HandleDataReservasi.php', newReservasi);
            console.log(response.data);
            setReservasiList([...reservasiList, newReservasi]);
            setNewReservasi({});

        } catch (error) {
            console.error('Error saving reservation:', error);
        }
    };

    const handleDelete = async (idReservasi, index) => {
        try {
            if (!idReservasi) {
                setReservasiList(reservasiList.filter((_, i) => i !== index));
            } else {
                const response = await fetch('/Reservation/HandleDataReservasi.php', {
                    method: 'DELETE',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idReservasi }),
                });
                const data = await response.json();
                if (data.message) {
                    setReservasiList(reservasiList.filter(reservasi => reservasi.idReservasi !== idReservasi));
                } else {
                    alert(data.error || 'Failed to delete reservation');
                }
            }
        } catch (error) {
            console.error('Error deleting reservation:', error);
        }
    };


    const handleChange = (value, field) => {
        setNewReservasi(prevState => ({
            ...prevState,
            [field]: value
        }));
    };

    const handleAddRow = () => {
        setNewReservasi({ jenisReservasi: '', namaCustomer: '', jumlahOrang: '', tempat: '', tanggalReservasi: '' });
    };

    return (
        <div className="bg-white relative overflow-x-auto shadow-sm sm:rounded-lg mt-12 me-12 p-4">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Data Reservasi</h2>
            <button
                onClick={handleAddRow}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded mb-4 mt-4 text-xs"
            >
                TAMBAH
            </button>
            <div className="flex justify-between items-center mb-4">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Nama Customer
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jumlah Orang
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tempat
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Jenis Reservasi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Tanggal Reservasi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reservasiList.map((reservasi, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 whitespace-nowrap">{reservasi.namaCustomer}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservasi.jumlahOrang}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservasi.tempat}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservasi.jenisReservasi}</td>
                                <td className="px-6 py-4 whitespace-nowrap">{reservasi.tanggalReservasi}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={() => handleDelete(reservasi.idReservasi, index)}
                                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-xs"
                                    >
                                        HAPUS
                                    </button>
                                </td>
                            </tr>
                        ))}

                        {/* Baris baru untuk menambahkan data */}
                        {Object.keys(newReservasi).length > 0 && (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={newReservasi.namaCustomer || ''}
                                        onChange={(e) => handleChange(e.target.value, 'namaCustomer')}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full" // Menambahkan w-full dan h-full
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="number"
                                        value={newReservasi.jumlahOrang || ''}
                                        onChange={(e) => handleChange(e.target.value, 'jumlahOrang')}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full" // Menambahkan w-full dan h-full
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={newReservasi.tempat || ''}
                                        onChange={(e) => handleChange(e.target.value, 'tempat')}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full" // Menambahkan w-full dan h-full
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="text"
                                        value={newReservasi.jenisReservasi || ''}
                                        onChange={(e) => handleChange(e.target.value, 'jenisReservasi')}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full" // Menambahkan w-full dan h-full
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <input
                                        type="date"
                                        value={newReservasi.tanggalReservasi || ''}
                                        onChange={(e) => handleChange(e.target.value, 'tanggalReservasi')}
                                        className="border border-gray-300 rounded-sm p-1 w-full h-full" // Menambahkan w-full dan h-full
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <button
                                        onClick={handleSave}
                                        className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-3 rounded text-xs"
                                    >
                                        SIMPAN
                                    </button>
                                </td>
                            </tr>
                        )}


                    </tbody>
                </table>
            </div>
        </div>
    );

}