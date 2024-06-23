import React from 'react'
import { ManageOrder } from '../../components/Content/ManageOrder'
import { NavbarDashboard } from '../../layouts/Navbar/Dashboard/NavbarDashboard'

export const PesananPage = () => {
    return (
        <>
            <NavbarDashboard />
            <ManageOrder />
        </>
    )
}
