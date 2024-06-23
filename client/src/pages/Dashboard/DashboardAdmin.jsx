import React from 'react'
import { SidebarWithLogo } from '../../layouts/Sidebar/SidebarComponent'
import './DashboardCustom.css'
import { PesananPage } from '../PesananPage/PesananPage'
import { useState } from 'react'
import { GrafikPenjualanPage } from '../GrafikPage/GrafikPenjualanPage'
import { DashboardMain } from './DashboardMain'
import { ReservasiPage } from '../Pesanan_ReservasiPage/ReservasiPage'
import { PengeluaranPage } from '../PengeluaranPage/PengeluaranPage'

export const DashboardAdmin = () => {
    const [activeContent, setActiveContent] = useState("pesanan");

    const handleTabChange = (content) => {
        setActiveContent(content);
    };


    const styleGrid = {
        display: 'grid',
        gridTemplateColumns: '1fr 3fr',
        height: '100%'
    }


    return (
        <div className="grid grid-cols-2 bg-gray-50/50" style={styleGrid}>
            <div className="w-fit" style={{ width: 'fit-content' }} >
                <SidebarWithLogo handleTabChange={handleTabChange} />
            </div>
            <div className="w-full h-full">
                <div className="dashboard-admin h-full " >
                    {activeContent === "pesanan" && <PesananPage />}
                    {activeContent === "grafikPenjualan" && <GrafikPenjualanPage />}
                    {activeContent === "dashboardData" && <DashboardMain />}
                    {activeContent === "reservasi" && <ReservasiPage />}
                    {activeContent === "pengeluaran" && <PengeluaranPage />}
                </div>
            </div>
        </div>

    )
}