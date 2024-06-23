import React from 'react'
import ChartPenjualan from '../../components/Charts/Selling/ChartPenjualan'
import { NavbarDashboard } from '../../layouts/Navbar/Dashboard/NavbarDashboard'

export const GrafikPenjualanPage = () => {
    return (
        <>
            <div className="h-full">
                <NavbarDashboard />
                <ChartPenjualan />
            </div>
        </>
    )
}
