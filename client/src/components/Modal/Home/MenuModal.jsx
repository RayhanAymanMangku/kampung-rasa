import React, { useEffect, useState } from 'react';
import { IconButton } from '@material-ui/core';
import axios from 'axios';
import { CheckoutModal } from './CheckoutModal';
import { MinusIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid';


export const MenuListModal = ({ idCustomer, namaCustomer, kontakCustomer, setShowMenuList }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [content, setContent] = useState([]);
    const [groupedContent, setGroupedContent] = useState({});
    const [kategoriMenu, setKategoriMenu] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);

    const getOrderDetails = () => {
        return content.filter(item => item.quantity > 0).map(item => ({ idMenu: item.idMenu, quantity: item.quantity, namaMenu: item.namaMenu }));
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const handleCloseMenuList = () => {
        setShowMenuList(false);
    };

    const handleCheckout = async () => {
        const orderDetails = getOrderDetails();
        const waktuPesanan = new Date().toISOString();

        const orderData = {
            idCustomer,
            waktuPesanan,
            orderDetails,
            namaCustomer,
            totalPrice,
        };

        try {
            const response = await axios.post('/Order/HandlePesanan.php', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
            });

            if (response.status === 200) {
                console.log('Order submitted successfully:', response.data);
                setShowCheckout(true);
            } else {
                console.error('Error submitting the order:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting the order:', error);
        }
    };

    useEffect(() => {
        axios.get('/Menu/KategoriMenu.php')
            .then(response => {
                setKategoriMenu(response.data);
            })
            .catch(error => {
                console.error('Error fetching menu categories:', error);
                alert('Error fetching menu categories');
            });

        axios.get('/Menu/MenuResto.php')
            .then(response => {
                const dataWithQuantity = response.data.map(item => ({ ...item, quantity: 0 }));
                setContent(dataWithQuantity);
                const groupedContent = dataWithQuantity.reduce((acc, menu) => {
                    acc[menu.idKategoriMenu] = acc[menu.idKategoriMenu] || [];
                    acc[menu.idKategoriMenu].push(menu);
                    return acc;
                }, {});
                setGroupedContent(groupedContent);
            })
            .catch(error => {
                console.error('Error fetching menu data:', error);
                alert('Error fetching menu data');
            });
    }, []);

    useEffect(() => {
        const totalPrice = content.reduce((acc, item) => {
            return acc + (item.harga * item.quantity);
        }, 0);
        setTotalPrice(totalPrice);
    }, [content]);

    return (
        <div className="modal fixed w-full h-full top-0 left-0 flex flex-col items-center justify-center z-50 overflow-y-auto p-4">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="modal-container bg-white w-96 md:w-2/3 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 px-6">
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold">Take Away</p>
                        <IconButton onClick={handleCloseMenuList} className="modal-close cursor-pointer z-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </IconButton>
                    </div>
                    <hr className='w-full h-1 mx-auto my-1  bg-gray-300 border-0 rounded  dark:bg-gray-700' />
                    <p className="text-xl font-bold mt-4">Data Pemesan</p>

                    <div className="grid grid-cols-2 w-fit ">
                        <div className="items-center w-12 text-gray-800 font-semibold">Id</div>
                        <div className="items-center">
                            <span className="text-gray-800">
                                <span className="mr-1">:</span>
                                {idCustomer}
                            </span>
                        </div>
                        <div className="items-center w-12 text-gray-800 font-semibold">Nama</div>
                        <div className="items-center">
                            <span className="text-gray-800">
                                <span className="mr-1">:</span>
                                {namaCustomer}
                            </span>
                        </div>
                        <div className="items-center w-12 text-gray-800 font-semibold">Kontak</div>
                        <div className="items-center">
                            <span className="text-gray-800">
                                <span className="mr-1">:</span>
                                {kontakCustomer}
                            </span>
                        </div>
                    </div>
                    <p className="text-xl font-bold mt-4">Waktu Pengambilan</p>
                    <input type="time" className='w-full border border-gray-300 h-10 rounded-sm text-justify' name='waktuPesanan' />

                    <p className="text-xl font-bold mt-4">Pilih Menu</p>
                    {kategoriMenu.map(category => (
                        <div key={category.idKategoriMenu}>
                            <p className="text-xl font-bold mt-4 mb-2">{category.kategoriMenu}</p>
                            <div className="grid grid-cols-3 gap-4">
                                {groupedContent[category.idKategoriMenu]?.map((menuContent) => (
                                    <CardMenu
                                        key={menuContent.idMenu}
                                        menuContent={menuContent}
                                        setContent={setContent}
                                        totalPrice={totalPrice}
                                        setTotalPrice={setTotalPrice}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between mt-24 border border-gray-300 p-2 bg-gray-200 items-center">
                        <p className="text-2xl font-bold  justify-center">Total Harga</p>
                        <p className="text-2xl font-bold">Rp. {totalPrice}</p>
                        <button className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-sm transition duration-200' onClick={handleCheckout}>Checkout</button>
                    </div>

                    {showCheckout && <CheckoutModal setShowCheckout={setShowCheckout} orderData={{ waktuPesanan: new Date().toISOString(), totalHarga: totalPrice, orderDetails: getOrderDetails(), namaCustomer: namaCustomer, idCustomer: idCustomer, kontakCustomer: kontakCustomer, }} />}
                </div>
            </div>
        </div>
    );
}



export const MenuListModalDineIn = ({ idCustomer, namaCustomer, kontakCustomer, setShowMenuList }) => {
    const [totalPrice, setTotalPrice] = useState(0);
    const [content, setContent] = useState([]);
    const [groupedContent, setGroupedContent] = useState({});
    const [kategoriMenu, setKategoriMenu] = useState([]);
    const [showCheckout, setShowCheckout] = useState(false);

    const getOrderDetails = () => {
        return content.filter(item => item.quantity > 0).map(item => ({ idMenu: item.idMenu, quantity: item.quantity }));
    };

    const getToken = () => {
        return localStorage.getItem('token');
    };

    const handleCloseMenuList = () => {
        setShowMenuList(false);
    };

    const handleCheckout = async () => {
        const orderDetails = getOrderDetails();
        const waktuPesanan = new Date().toISOString();

        const orderData = {
            idCustomer,
            waktuPesanan,
            orderDetails,
            totalPrice, // Include total price in the order data
            namaCustomer,
        };

        try {
            const response = await axios.post('/Order/HandlePesanan.php', orderData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${getToken()}`,
                },
            });

            if (response.status === 200) {
                console.log('Order submitted successfully:', response.data);
                setShowCheckout(true);
            } else {
                console.error('Error submitting the order:', response.statusText);
            }
        } catch (error) {
            console.error('Error submitting the order:', error);
        }
    };

    useEffect(() => {
        axios.get('/Menu/KategoriMenu.php')
            .then(response => {
                setKategoriMenu(response.data);
            })
            .catch(error => {
                console.error('Error fetching menu categories:', error);
                alert('Error fetching menu categories');
            });

        axios.get('/Menu/MenuResto.php')
            .then(response => {
                const dataWithQuantity = response.data.map(item => ({ ...item, quantity: 0 }));
                setContent(dataWithQuantity);
                const groupedContent = dataWithQuantity.reduce((acc, menu) => {
                    acc[menu.idKategoriMenu] = acc[menu.idKategoriMenu] || [];
                    acc[menu.idKategoriMenu].push(menu);
                    return acc;
                }, {});
                setGroupedContent(groupedContent);
            })
            .catch(error => {
                console.error('Error fetching menu data:', error);
                alert('Error fetching menu data');
            });
    }, []);

    useEffect(() => {
        const totalPrice = content.reduce((acc, item) => {
            return acc + (item.harga * item.quantity);
        }, 0);
        setTotalPrice(totalPrice);
    }, [content]);

    return (
        <div className="modal fixed w-full h-full top-0 left-0 flex flex-col items-center justify-center z-50 overflow-y-auto p-4">
            <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
            <div className="modal-container bg-white w-96 md:w-2/3 mx-auto rounded shadow-lg z-50 overflow-y-auto">
                <div className="modal-content py-4 px-6">
                    <div className="flex justify-between items-center">
                        <p className="text-2xl font-bold">Dine In</p>
                        <IconButton onClick={handleCloseMenuList} className="modal-close cursor-pointer z-50">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </IconButton>
                    </div>
                    <hr className='w-full h-1 mx-auto my-1 bg-gray-300 border-0 rounded dark:bg-gray-700' />
                    <p className="text-xl font-bold mt-4">Data Pemesan</p>

                    <div className="grid grid-cols-2 w-fit">
                        <div className="items-center w-12 text-gray-800 font-semibold">Id</div>
                        <div className="items-center">
                            <span className="text-gray-800">
                                <span className="mr-1">:</span>
                                {idCustomer}
                            </span>
                        </div>
                        <div className="items-center w-12 text-gray-800 font-semibold">Nama</div>
                        <div className="items-center">
                            <span className="text-gray-800">
                                <span className="mr-1">:</span>
                                {namaCustomer}
                            </span>
                        </div>
                        <div className="items-center w-12 text-gray-800 font-semibold">Kontak</div>
                        <div className="items-center">
                            <span className="text-gray-800">
                                <span className="mr-1">:</span>
                                {kontakCustomer}
                            </span>
                        </div>
                    </div>
                    <p className="text-xl font-bold mt-4">Waktu Pengambilan</p>
                    <input type="time" className='w-full border border-gray-300 h-10 rounded-sm text-justify' name='waktuPesanan' />

                    <p className="text-xl font-bold mt-4">Pilih Menu</p>
                    {kategoriMenu.map(category => (
                        <div key={category.idKategoriMenu}>
                            <p className="text-xl font-bold mt-4 mb-2">{category.kategoriMenu}</p>
                            <div className="grid grid-cols-3 gap-4">
                                {groupedContent[category.idKategoriMenu]?.map((menuContent) => (
                                    <CardMenu
                                        key={menuContent.idMenu}
                                        menuContent={menuContent}
                                        setContent={setContent}
                                        totalPrice={totalPrice}
                                        setTotalPrice={setTotalPrice}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    <div className="flex justify-between mt-24 border border-gray-300 p-2 bg-gray-200 items-center">
                        <p className="text-2xl font-bold justify-center">Total Harga</p>
                        <p className="text-2xl font-bold">Rp. {totalPrice}</p>
                        <button className='px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-sm transition duration-200' onClick={handleCheckout}>Checkout</button>
                    </div>

                    {showCheckout && <CheckoutModal setShowCheckout={setShowCheckout} orderData={{ waktuPesanan: new Date().toISOString(), totalHarga: totalPrice, orderDetails: getOrderDetails(), namaCustomer: namaCustomer, idCustomer: idCustomer }} />}
                </div>
            </div>
        </div>
    );
};


const CardMenu = ({ menuContent, setContent, totalPrice, setTotalPrice }) => {
    const [quantity, setQuantity] = useState(menuContent.quantity);

    useEffect(() => {
        setQuantity(menuContent.quantity);
    }, [menuContent.quantity]);

    const handleDelete = () => {
        if (quantity > 0) {
            setTotalPrice(totalPrice - (menuContent.harga * quantity));
            setContent(prevContent => {
                return prevContent.map(item => {
                    if (item.idMenu === menuContent.idMenu) {
                        return { ...item, quantity: 0 };
                    }
                    return item;
                });
            });
            setQuantity(0);
        }
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
        setContent(prevContent => {
            return prevContent.map(item => {
                if (item.idMenu === menuContent.idMenu) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        });
        setTotalPrice(prevTotalPrice => prevTotalPrice + menuContent.harga);
    };

    const decrementQuantity = () => {
        if (quantity > 0) {
            setQuantity(prevQuantity => prevQuantity - 1);
            setContent(prevContent => {
                return prevContent.map(item => {
                    if (item.idMenu === menuContent.idMenu) {
                        return { ...item, quantity: item.quantity - 1 };
                    }
                    return item;
                });
            });
            setTotalPrice(prevTotalPrice => prevTotalPrice - menuContent.harga);
        }
    };

    return (
        <div className="border border-gray-300 rounded-sm p-2">
            <img src={menuContent.gambar} alt="" className='rounded-md w-[280px] h-[280px]' />
            <div className="flex gap-2 p-2 items-center justify-center">
                <p className="text-center">{menuContent.namaMenu}</p>
                <p className="text-center">Rp. {menuContent.harga}</p>
            </div>
            <div className="flex items-center justify-center">
                <div className="flex items-center space-x-2 mx-auto">
                    <button className="px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-sm transition duration-200" onClick={handleDelete}>
                        <TrashIcon className="h-4 w-4" />
                    </button>
                    <button className="px-3 py-2 text-black rounded-sm transition duration-200" onClick={decrementQuantity}>
                        <MinusIcon className="h-4 w-4" />
                    </button>
                    <span>{quantity}</span>
                    <button className="px-3 py-2 text-black rounded-sm transition duration-200" onClick={incrementQuantity}>
                        <PlusIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};



export const CardMenuDisplay = ({ idPesanan }) => {
    const [detailPesananData, setDetailPesananData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (idPesanan) {
            console.log('Fetching data for idPesanan:', idPesanan);
            axios.get(`/Order/HandlePesanan.php?id=${idPesanan}`)
                .then(response => {
                    if (response.data.status === 'success') {
                        const data = response.data.data || [];
                        setDetailPesananData(data);
                    } else {
                        setError(response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Error fetching detail pesanan data:', error);
                    setError('An error occurred while fetching detail pesanan data');
                });
        }
    }, [idPesanan]);

    if (!detailPesananData.length && !error) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="rounded-sm p-2">
            <div className="flex flex-col items-center justify-center">
                {detailPesananData.map(detail => (
                    <div key={detail.idDetailPesanan} className="border-b border-gray-300 py-2">
                        <p className='text-xl font-semibold text-gray-800'>ID Menu: {detail.idMenu}</p>
                        <p className='text-xl font-semibold text-gray-800'>Nama Menu: {detail.namaMenu}</p>
                        <p className='font-semibold text-gray-800 text-xl'>Porsi: {detail.quantity}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}






export function CardMenuDisplayNav({ menuContent }) {
    const [kategoriMenu, setKategoriMenu] = useState([]);
    const [content, setContent] = useState([]);
    const [groupedContent, setGroupedContent] = useState({});


    useEffect(() => {
        axios.get('/Menu/KategoriMenu.php')
            .then(response => {
                setKategoriMenu(response.data);
            })
            .catch(error => {
                console.error('Error fetching menu categories:', error);
                alert('Error fetching menu categories');
            });


        axios.get('/Menu/MenuResto.php')
            .then(response => {
                const dataWithQuantity = response.data.map(item => ({ ...item, quantity: 0 }));
                setContent(dataWithQuantity);
                const groupedContent = dataWithQuantity.reduce((acc, menu) => {
                    acc[menu.idKategoriMenu] = acc[menu.idKategoriMenu] || [];
                    acc[menu.idKategoriMenu].push(menu);
                    return acc;
                }, {});
                setGroupedContent(groupedContent); // Set grouped content
            })
            .catch(error => {
                console.error('Error fetching menu data:', error);
                alert('Error fetching menu data');
            });
    }, []);
    return (
        <>
            <div className="grid grid-cols-1 gap-4">
                {kategoriMenu.map(category => (
                    <div key={category.idKategoriMenu}>
                        <p className="text-xl font-bold mt-4 mb-2">{category.kategoriMenu}</p>
                        <div className="grid grid-cols-3 gap-2">
                            {groupedContent[category.idKategoriMenu]?.map((menuContent) => (
                                <div key={menuContent.idMenu} className="border border-gray-300 rounded-sm p-2">
                                    <img src={menuContent.gambar} alt="" className='rounded-md w-full h-[280px] object-cover' />
                                    <div className="flex items-center justify-center">
                                        <p className="text-center">{menuContent.namaMenu}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


        </>
    )
}