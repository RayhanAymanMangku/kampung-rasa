import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import merge from "deepmerge";
import { CircularProgress } from "@material-ui/core";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";
import { WalletIcon } from "@heroicons/react/24/outline";

const Chart = React.lazy(() => import("react-apexcharts"));

function AreaChart({ height = 350, series = [], colors = [], options = {} }) {
    const chartOptions = React.useMemo(
        () => ({
            colors,
            ...merge(
                {
                    chart: {
                        height: height,
                        type: "area",
                        zoom: {
                            enabled: false,
                        },
                        toolbar: {
                            show: false,
                        },
                    },
                    title: {
                        show: false,
                    },
                    dataLabels: {
                        enabled: false,
                    },
                    legend: {
                        show: false,
                    },
                    markers: {
                        size: 0,
                        strokeWidth: 0,
                        strokeColors: "transparent",
                    },
                    stroke: {
                        curve: "smooth",
                        width: 2,
                    },
                    grid: {
                        show: true,
                        borderColor: "#EEEEEE",
                        strokeDashArray: 5,
                        xaxis: {
                            lines: {
                                show: true,
                            },
                        },
                        padding: {
                            top: 5,
                            right: 20,
                        },
                    },
                    tooltip: {
                        theme: "light",
                    },
                    yaxis: {
                        labels: {
                            style: {
                                colors: "#757575",
                                fontSize: "12px",
                                fontFamily: "inherit",
                                fontWeight: 300,
                            },
                        },
                    },
                    xaxis: {
                        axisTicks: {
                            show: false,
                        },
                        axisBorder: {
                            show: false,
                        },
                        labels: {
                            style: {
                                colors: "#757575",
                                fontSize: "12px",
                                fontFamily: "inherit",
                                fontWeight: 300,
                            },
                        },
                    },
                    fill: {
                        type: "gradient",
                        gradient: {
                            shadeIntensity: 1,
                            opacityFrom: 0,
                            opacityTo: 0,
                            stops: [0, 100],
                        },
                    },
                },
                options
            ),
        }),
        [height, colors, options]
    );

    return (
        <Suspense fallback={<CircularProgress />}>
            <Chart type="area" height={height} series={series} options={chartOptions} />
        </Suspense>
    );
}

export function ChartsExample5() {
    const [chartSeries, setChartSeries] = useState([
        {
            name: "2022",
            data: [
                0, 200, 180, 35000, 500000, 68000, 800, 800, 880, 900, 680, 900,
            ],
        },
        {
            name: "2023",
            data: [
                200, 160, 150000, 260, 60000, 790, 900, 660, 720, 800, 500, 800,
            ],
        },
        {
            name: "2024",
            data: [],
        }
    ]);

    const [totalIncome2024, setTotalIncome2024] = useState(0);

    useEffect(() => {
        axios.get("/Chart/GrafikIncome.php")
            .then(response => {
                console.log("Data fetched from server:", response.data); // Log data from server
                const data2024 = new Array(12).fill(0);
                let totalIncome = 0;
                response.data.forEach(item => {
                    const monthIndex = item.month - 1;
                    const income = parseFloat(item.totalIncome) || 0; // Ensure totalIncome is a number
                    data2024[monthIndex] = income;
                    totalIncome += income;
                });
                console.log("Calculated data2024:", data2024); // Log calculated data2024
                console.log("Calculated totalIncome:", totalIncome); // Log calculated totalIncome

                setChartSeries(prevSeries => {
                    const updatedSeries = [...prevSeries];
                    updatedSeries[2].data = data2024;
                    return updatedSeries;
                });
                setTotalIncome2024(totalIncome);
            })
            .catch(error => {
                console.error("Error fetching data for 2024:", error);
            });
    }, []);

    const chartOptions = {
        xaxis: {
            categories: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
            ],
        },
    };

    // Function to format number to Rupiah
    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    return (
        <section className=" w-full mb-8">
            <Card>
                <CardBody className="!p-2">
                    <div className="flex gap-2 flex-wrap justify-between px-4 !mt-4 ">
                        <Typography variant="h3" color="blue-gray">
                            {formatRupiah(totalIncome2024)}
                        </Typography>
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1">
                                <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                                <Typography
                                    variant="small"
                                    className="font-normal text-gray-600"
                                >
                                    2022
                                </Typography>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                                <Typography
                                    variant="small"
                                    className="font-normal text-gray-600"
                                >
                                    2023
                                </Typography>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="h-2 w-2 bg-red-500 rounded-full"></span>
                                <Typography
                                    variant="small"
                                    className="font-normal text-gray-600"
                                >
                                    2024
                                </Typography>
                            </div>
                        </div>
                    </div>
                    <AreaChart
                        colors={["#4CAF50", "#2196F3", "#FF0000"]}
                        options={chartOptions}
                        series={chartSeries}
                    />
                </CardBody>
            </Card>
        </section>
    );
}

export default ChartsExample5;

export const DataPemasukan = () => {
    const dummyData = {
        2022: 5000000,
        2023: 6000000
    };

    const [selectedYear, setSelectedYear] = useState("2024");
    const [totalIncome, setTotalIncome] = useState(0);

    useEffect(() => {
        if (selectedYear === "2024") {
            axios.get("/Chart/GrafikIncome.php")
                .then(response => {
                    const data2024 = new Array(12).fill(0);
                    let totalIncome = 0;
                    response.data.forEach(item => {
                        const monthIndex = item.month - 1;
                        const income = parseFloat(item.totalIncome) || 0; // Ensure totalIncome is a number
                        data2024[monthIndex] = income;
                        totalIncome += income;
                    });
                    setTotalIncome(totalIncome);
                })
                .catch(error => {
                    console.error("Error fetching data for 2024:", error);
                });
        } else {
            setTotalIncome(dummyData[selectedYear]);
        }
    }, [selectedYear]);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
    };

    return (
        <div className="w-80 h-36 rounded-md shadow-md bg-green-500">
            <div className="w-fit p-4">
                <div className="flex justify-between items-center">
                    <label htmlFor="#" className="text-xl font-semibold text-white mr-10">Total Pemasukan</label>
                    <select
                        className="py-1 px-2 border rounded-md text-white bg-transparent"
                        value={selectedYear}
                        onChange={handleYearChange}
                    >
                        {["2022", "2023", "2024"].map((year) => (
                            <option key={year} value={year} className="text-sm">
                                {year}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="w-fit mt-2 flex items-center">
                    <WalletIcon className="h-6 w-6 text-white mr-2" />
                    <label htmlFor="#" className="text-white text-lg">{formatRupiah(totalIncome)}</label>
                </div>
            </div>
        </div>
    );
};
