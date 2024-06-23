
import React from "react";
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,

    Accordion,
    AccordionHeader,

} from "@material-tailwind/react";
import {


    InboxIcon,


    ChartBarIcon,
} from "@heroicons/react/24/solid";
import { ShoppingCartIcon, UserCircleIcon } from "@heroicons/react/24/outline";

export function SidebarWithLogo({ handleTabChange }) {
    const [open, setOpen] = React.useState(0);

    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const handleClickPesanan = () => {
        handleTabChange("pesanan");
    };

    const handleClickGrafikPenjualan = () => {
        handleTabChange("grafikPenjualan");
    };

    const handleClickDashboard = (tab) => {
        handleTabChange("dashboardData");
    }

    const handleClickDineIn = () => {
        handleTabChange("reservasi");
    }

    const handleClickPengeluaran = () => {
        handleTabChange("pengeluaran");
    }

    return (
        <div className="shadow-lg h-full bg-white">
            <Card className="sidebar h-screen w-72 rounded-none bg-white rounded-r-md" style={{ boxShadow: 'none' }}>
                <div className="mb-10 flex items-center gap-4 p-4">
                    <img src="/assets/img/Logo/logo-fix-1.png" alt="brand" className=" h-8 w-36 mx-auto" />
                </div>
                <List>
                    <Accordion
                        open={open === 1}
                    >
                        <ListItem className="p-0" selected={open === 1} onClick={handleClickDashboard}>
                            <AccordionHeader onClick={() => handleOpen(1)} className="border-b-0 p-3">
                                <ListItemPrefix>
                                    {/* <HomeIcon className="h-5 w-5" /> */}
                                    {/* <UserIcon className="h-5 w-5" /> */}
                                    <UserCircleIcon className="h-5 w-5" />
                                </ListItemPrefix>
                                <Typography color="blue-gray" className="mr-auto font-normal">
                                    Data Staf
                                </Typography>
                            </AccordionHeader>
                        </ListItem>
                    </Accordion>



                    <ListItem onClick={handleClickPesanan}>
                        <ListItemPrefix>
                            <InboxIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Pesanan Masuk
                    </ListItem>
                    <ListItem onClick={handleClickDineIn}>
                        <ListItemPrefix>
                            <InboxIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Reservasi
                    </ListItem>

                    <ListItem onClick={handleClickGrafikPenjualan}>
                        <ListItemPrefix>
                            {/* <ShoppingBagIcon className="h-5 w-5" /> */}
                            <ChartBarIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Grafik Penjualan
                    </ListItem>
                    <ListItem onClick={handleClickPengeluaran} >
                        <ListItemPrefix>
                            <ShoppingCartIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        Data Pengeluaran
                    </ListItem>
                </List>
            </Card>
        </div>
    );
}
