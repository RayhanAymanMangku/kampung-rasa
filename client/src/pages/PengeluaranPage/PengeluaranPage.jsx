import React from 'react'
import { NavbarDashboard } from '../../layouts/Navbar/Dashboard/NavbarDashboard'
import DataPengeluaran from '../../components/Content/Table/DataPengeluaran'

export const PengeluaranPage = () => {
    return (
        <>
            <NavbarDashboard />
            <DataPengeluaran />
        </>
    )
}
