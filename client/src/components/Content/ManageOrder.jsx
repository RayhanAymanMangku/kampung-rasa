import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DisplayMenuModal } from '../Modal/Home/DisplayMenuModal';
import { TakeAwayTable } from './Table/TakeAwayTable';
import { DineInTable } from '../Content/Table/DineInTable';

export const ManageOrder = () => {
    const [takeAwayOrders, setTakeAwayOrders] = useState([]);
    const [dineInOrders, setDineInOrders] = useState([]);
    const [showListPesanan, setShowListPesanan] = useState(false);
    const [selectedOption, setSelectedOption] = useState("Take Away");
    const [selectedOrderId, setSelectedOrderId] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);

    useEffect(() => {
        if (selectedOption === "Take Away") {
            axios.get('/TakeAway/HandleDataTakeAway.php')
                .then(response => {
                    console.log('Fetched takeaway orders:', response.data);
                    setTakeAwayOrders(Array.isArray(response.data) ? response.data : []);
                })
                .catch(error => {
                    console.error('Error fetching takeaway orders:', error);
                    setTakeAwayOrders([]);
                });
        } else if (selectedOption === "Dine In") {
            axios.get('/DineIn/HandleDataDineIn.php')
                .then(response => {
                    console.log('Fetched dine-in orders:', response.data);
                    setDineInOrders(Array.isArray(response.data) ? response.data : []);
                })
                .catch(error => {
                    console.error('Error fetching dine-in orders:', error);
                    setDineInOrders([]);
                });
        }
    }, [selectedOption]);

    const handleShowMenuModal = (orderId) => {
        axios.get(`/Order/HandlePesanan.php?id=${orderId}`)
            .then(response => {
                if (response.data.status === 'success') {
                    setOrderDetails(response.data.data);
                    setSelectedOrderId(orderId);
                    setShowListPesanan(true);
                } else {
                    console.error('Error fetching order details:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error fetching order details:', error);
            });
    };

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleDeleteOrder = (idOrder) => {
        axios.delete(`/Order/HandlePesanan.php?id=${idOrder}`)
            .then(response => {
                if (response.data.status === 'success') {
                    if (selectedOption === "Take Away") {
                        setTakeAwayOrders(prevOrders => prevOrders.filter(order => order.idOrder !== idOrder));
                    } else {
                        setDineInOrders(prevOrders => prevOrders.filter(order => order.idOrder !== idOrder));
                    }
                } else {
                    console.error('Error deleting order:', response.data.message);
                }
            })
            .catch(error => {
                console.error('Error deleting order:', error);
            });
    };

    return (
        <div className="bg-white relative overflow-x-auto shadow-sm sm:rounded-lg mt-12 me-12 p-4">
            <div className="flex w-full">
                <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">Data Pesanan</h2>
                <select
                    name="orderType"
                    id="orderType"
                    className='border rounded-md bg-gray-50 p-2 ms-auto'
                    value={selectedOption}
                    onChange={handleOptionChange}
                >
                    <option value="Take Away">Take Away</option>
                    <option value="Dine In">Dine In</option>
                </select>
            </div>

            <div className="flex justify-between items-center mb-4 mt-4 ">
                {selectedOption === "Take Away" ? (
                    <TakeAwayTable orders={takeAwayOrders} handleShowMenuModal={handleShowMenuModal} handleDeleteOrder={handleDeleteOrder} />
                ) : (
                    <DineInTable
                        orders={dineInOrders}
                        handleShowMenuModal={handleShowMenuModal}
                        handleDeleteOrder={handleDeleteOrder}
                    />
                )}
            </div>

            {showListPesanan && <DisplayMenuModal setShowListPesanan={setShowListPesanan} selectedOrderId={selectedOrderId} orderDetails={orderDetails} />}
        </div>
    );
};
