import { DashboardTable } from '../../components/Content/Table/DashboardTable';
import { NavbarDashboard } from '../../layouts/Navbar/Dashboard/NavbarDashboard';

export const DashboardMain = () => {
    return (
        <>
            <NavbarDashboard />
            <DashboardTable />
        </>
    );
};
