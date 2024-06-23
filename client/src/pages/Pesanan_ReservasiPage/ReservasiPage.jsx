import React from 'react'
import { NavbarDashboard } from '../../layouts/Navbar/Dashboard/NavbarDashboard'
import { DataReservasi } from '../../components/Content/Table/DataReservasi'

export const ReservasiPage = () => {
    return (
        <>
            <NavbarDashboard />
            <DataReservasi />
        </>
    )
}
