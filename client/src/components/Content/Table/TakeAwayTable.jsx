import React from 'react';


export const TakeAwayTable = ({ orders, handleShowMenuModal, handleDeleteOrder }) => {
    console.log('TakeAwayTable orders:', orders); // Debugging log

    return (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">ID Pesanan</th>
                    <th scope="col" className="px-6 py-3">Nama Customer</th>
                    <th scope="col" className="px-6 py-3">Kontak Customer</th>
                    <th scope="col" className="px-6 py-3">Pesanan</th>
                    <th scope="col" className="px-6 py-3">Aksi</th>
                </tr>
            </thead>
            <tbody>
                {orders.length > 0 ? orders.map(order => (
                    <tr key={order.idOrder} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-6 py-4 whitespace-nowrap">{order.idOrder}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.namaCustomer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{order.kontakCustomer}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={() => handleShowMenuModal(order.idOrder)} className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded font-bold text-xs">DETAIL</button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button onClick={() => handleDeleteOrder(order.idOrder)} className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded font-bold text-xs">DIAMBIL</button>
                        </td>
                    </tr>
                )) : (
                    <tr>
                        <td colSpan="5" className="px-6 py-4 text-center">Tidak ada pesanan</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};
