import React, { useState, useEffect } from 'react';
import { DetailStafModal } from '../../Modal/Dashboard/DetailStafModal';

export const DashboardTable = () => {
    const [staf, setStaf] = useState([]);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [showDetailStaf, setShowDetailStaf] = useState(false);
    const [selectedStaf, setSelectedStaf] = useState(null);

    useEffect(() => {
        // Fetch staff data from server
        fetch('/Staf/HandleDataStaf.php')
            .then(response => response.json())
            .then(data => setStaf(data))
            .catch(error => console.error('Error fetching staff data:', error));
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleDelete = (id) => {
        // Send delete request to server
        fetch('/Staf/HandleDataStaf.php', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id_staf: id }),
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Update staff state
                    setStaf(staf.filter(staf => staf.id_staf !== id));
                } else {
                    alert(data.error || 'Failed to delete staff');
                }
            })
            .catch(error => console.error('Error deleting staff:', error));
    };

    const handleOpenDetailStaf = (stafId) => {
        setSelectedStaf(stafId);
        setShowDetailStaf(true);
    };

    return (
        <>
            <div className="bg-white relative overflow-x-auto shadow-sm sm:rounded-lg mt-12 me-12 pt-2 px-2">
                <div className="flex items-center justify-between flex-col flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-white dark:bg-gray-900">
                    <div>
                        <button
                            id="dropdownActionButton"
                            onClick={toggleDropdown}
                            className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                        >
                            Action
                            <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                            </svg>
                        </button>
                        {dropdownOpen && (
                            <div id="dropdownAction" className="z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600">

                                <div className="py-1">
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white">Delete User</a>
                                </div>
                            </div>
                        )}
                    </div>
                    <label htmlFor="table-search" className="sr-only">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <input
                            type="text"
                            id="table-search-users"
                            className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Cari Staf"
                            value={searchQuery}
                            onChange={handleSearchChange}
                        />
                    </div>
                </div>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="p-4">
                                <div className="flex items-center">
                                    <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                                </div>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Nama Staf
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Posisi
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Status
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Aksi
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {staf
                            .filter(staf => {
                                if (searchQuery && staf.username) {
                                    return staf.username.toLowerCase().includes(searchQuery.toLowerCase());
                                }
                                return true;
                            })
                            .map(staf => (
                                <tr key={staf.id_staf} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="w-4 p-4">
                                        <div className="flex items-center">
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="h-10 w-10 border border-gray-300 bg-gray-100 flex-shrink-0 rounded-full overflow-hidden">
                                                <img className="h-full w-full object-cover rounded-full" src={`/assets/img/Items/profile.webp`} alt="staf" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">{staf.username}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">Admin</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm text-green-500 dark:text-gray-400">Aktif</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-x-1">
                                            <button
                                                className="bg-blue-600 text-white active:bg-blue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => handleOpenDetailStaf(staf.id_staf)}
                                            >
                                                Detail
                                            </button>
                                            <button
                                                className="bg-red-600 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                type="button"
                                                onClick={() => handleDelete(staf.id_staf)}
                                            >
                                                Hapus
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
                {showDetailStaf && <DetailStafModal setShowDetailStaf={setShowDetailStaf} selectedStaf={selectedStaf} stafData={staf} />}
            </div>
        </>
    );
};