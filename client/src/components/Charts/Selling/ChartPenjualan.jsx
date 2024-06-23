import React, { useState, useEffect } from "react";
import {
    Card,
    CardBody,
    CardHeader,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import {
    CubeIcon,
    CurrencyDollarIcon,
} from "@heroicons/react/24/outline";
import LineChartComponent, { DataPemasukan } from "./LineChartMui";
import { PredictChart } from "../Predict/LineChartPredict";

const dummyData = {
    "2020": [30, 40, 45, 50, 49, 60, 70, 91, 125, 130, 140, 150],
    "2021": [50, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
    "2022": [70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
    "2023": [90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
};

const chartConfig = (data = []) => ({
    type: "bar",
    height: 240,
    series: [
        {
            name: "Orders",
            data: data,
        },
    ],
    options: {
        chart: {
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
        colors: ["#0ea5e9"],
        stroke: {
            lineCap: "round",
            curve: "smooth",
        },
        markers: {
            size: 0,
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
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
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
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "dark",
        },
    },
});

const dummyLineData = {
    "2020": [30, 40, 45, 50, 49, 60, 70, 91, 125, 130, 140, 150],
    "2021": [50, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170],
    "2022": [70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180],
    "2023": [90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190, 200]
};

const chartConfigLine = (data = []) => ({
    type: "line",
    height: 350,
    series: [
        {
            name: "Sales",
            data: data,
        },
    ],
    options: {
        chart: {
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
        colors: ["#0ea5e9"],
        stroke: {
            lineCap: "round",
            curve: "smooth",
        },
        markers: {
            size: 0,
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
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
            categories: [
                "Jan",
                "Feb",
                "Mar",
                "Apr",
                "May",
                "Jun",
                "Jul",
                "Aug",
                "Sep",
                "Oct",
                "Nov",
                "Dec",
            ],
        },
        yaxis: {
            labels: {
                style: {
                    colors: "#616161",
                    fontSize: "12px",
                    fontFamily: "inherit",
                    fontWeight: 400,
                },
            },
        },
        grid: {
            show: true,
            borderColor: "#dddddd",
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
        fill: {
            opacity: 0.8,
        },
        tooltip: {
            theme: "dark",
        },
    },
});

export default function ChartPenjualan() {
    const [selectedYear, setSelectedYear] = useState("2024");
    const [chartData, setChartData] = useState([]);
    const [lineChartData, setLineChartData] = useState([]);
    const [totalIncome2024, setTotalIncome2024] = useState(0);
    const [totalPengeluaran, setTotalPengeluaran] = useState(0);

    useEffect(() => {
        if (selectedYear === "2024") {
            fetch(`/Chart/GrafikPenjualan.php?year=${selectedYear}`)
                .then(response => response.json())
                .then(data => {
                    console.log("Data fetched from server:", data); // Log data from server
                    const ordersData = new Array(12).fill(0);

                    data.forEach(item => {
                        ordersData[item.month - 1] = item.orders;
                    });
                    console.log("Calculated ordersData:", ordersData); // Log ordersData
                    setChartData(ordersData);
                    setLineChartData(ordersData);
                    setTotalIncome2024(ordersData.reduce((a, b) => a + b, 0));
                })
                .catch(error => console.error('Error fetching data:', error));
        } else {
            setChartData(dummyData[selectedYear] || []);
            setLineChartData(dummyLineData[selectedYear] || []);
            setTotalIncome2024(dummyData[selectedYear].reduce((a, b) => a + b, 0)); // Calculate total income for dummy data
        }
    }, [selectedYear]);

    useEffect(() => {
        fetch(`/Outcome/HandlePengeluaran.php`)
            .then(response => response.json())
            .then(data => {
                console.log("Total pengeluaran fetched from server:", data.totalPengeluaran); // Log total pengeluaran
                setTotalPengeluaran(data.totalPengeluaran);
            })
            .catch(error => console.error('Error fetching total pengeluaran:', error));
    }, []);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    };

    return (
        <>
            <div className="w-full flex-row mt-4">
                <DataPenjualan totalIncome2024={totalIncome2024} totalPengeluaran={totalPengeluaran} />
                <div className="w-full flex mt-8">
                    <div className="grid grid-cols-2 w-full">
                        <div className="w-full pe-8">
                            <Chart1 selectedYear={selectedYear} handleYearChange={handleYearChange} chartData={chartData} />
                        </div>
                        <div className="w-full pe-14">
                            <PredictChart lineChartData={lineChartData} />
                        </div>
                    </div>
                </div>
                <div className="w-full flex">
                    <div className="w-full pe-14">
                        <LineChartComponent lineChartData={lineChartData} />
                    </div>
                </div>
            </div>
        </>
    );
}

function DataPenjualan({ totalIncome2024, totalPengeluaran }) {
    const [selectedYear, setSelectedYear] = useState("2024");
    const [orderCount, setOrderCount] = useState(0);

    const handleYearChange = (event) => {
        setSelectedYear(event.target.value);
    };

    const formatRupiah = (number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0
        }).format(number);
    }


    useEffect(() => {
        const fetchOrderData = async () => {
            try {
                const response = await fetch(`/Chart/GrafikPenjualan.php?year=${selectedYear}`);
                const data = await response.json();
                const totalOrders = data.reduce((acc, curr) => acc + curr.orders, 0);
                setOrderCount(totalOrders);
            } catch (error) {
                console.error("Error fetching order data:", error);
            }
        };

        fetchOrderData();
    }, [selectedYear]);

    return (
        <div className="flex w-full mt-10">
            <div className="box">
                <div className="grid grid-cols-3 gap-8">
                    <div className="w-80 h-36 rounded-md shadow-md bg-red-500">
                        <div className="w-full p-4">
                            <label htmlFor="#" className="text-xl font-semibold text-white">Pengeluaran</label>
                            <div className="w-fit mt-3 flex items-center">
                                <CurrencyDollarIcon className="h-6 w-6 text-white mr-2" />
                                <label htmlFor="#" className="text-white text-lg">{formatRupiah(totalPengeluaran)}</label>
                            </div>
                        </div>
                    </div>
                    <div className="w-80 h-36 rounded-md shadow-md bg-cyan-500">
                        <div className="w-full p-4">
                            <div className="flex justify-between items-start">
                                <label htmlFor="#" className="text-xl font-semibold text-white mr-36">Order</label>
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
                                <CubeIcon className="h-6 w-6 text-white mr-2" />
                                <label htmlFor="#" className="text-white text-lg">{orderCount}</label>
                            </div>
                        </div>
                    </div>
                    <DataPemasukan totalIncome2024={totalIncome2024} />
                </div>
            </div>
        </div>
    );
}


function Chart1({ selectedYear, handleYearChange, chartData }) {
    return (
        <section className="max-w-full h-full pb-8">
            <Card className="rounded-xl h-full max-w-full">
                <CardHeader
                    floated={false}
                    shadow={false}
                    color="gray-200"
                    className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                    <div className="flex justify-between gap-2 w-full">
                        <h4 className="text-2xl font-semibold text-gray-900 flex items-center justify-center h-fit">
                            Grafik Penjualan
                        </h4>
                        <div className="float-right">
                            <select
                                className="py-2 px-3 border rounded-md flex mx-auto text-gray-700"
                                value={selectedYear}
                                onChange={handleYearChange}
                            >
                                {Object.keys(dummyData).concat("2024").map((year) => (
                                    <option key={year} value={year} className="text-sm">
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </CardHeader>
                <CardBody className="px-2 mt-16">
                    <Chart {...chartConfig(chartData)} />
                </CardBody>
            </Card>
        </section>
    );
}