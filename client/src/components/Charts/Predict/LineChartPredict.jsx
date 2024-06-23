import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import merge from "deepmerge";
import { CircularProgress } from "@material-ui/core";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

const Chart = React.lazy(() => import("react-apexcharts"));

const calculateMovingAverage = (data, windowSize) => {
    let movingAverageData = [];
    for (let i = 0; i < data.length; i++) {
        if (i < windowSize - 1) {
            movingAverageData.push(null);
        } else {
            let sum = 0;
            for (let j = 0; j < windowSize; j++) {
                sum += data[i - j];
            }
            movingAverageData.push(sum / windowSize);
        }
    }
    return movingAverageData;
};

const scaleData = (data, maxLimit) => {
    const maxDataValue = Math.max(...data);
    if (maxDataValue <= maxLimit) {
        return data;
    }
    const scaleFactor = maxLimit / maxDataValue;
    return data.map(value => value * scaleFactor);
};

const formatRupiah = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number);
};

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
                        max: 10000000, // Set maximum value for y-axis to 10 million
                        labels: {
                            formatter: (value) => formatRupiah(value),
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

export function PredictChart() {
    const [chartSeries, setChartSeries] = useState([
        {
            name: "2024",
            data: [],
        }
    ]);

    const [totalIncome2024, setTotalIncome2024] = useState(0);
    const windowSize = 3;
    const predictionMultiplier = 1.5;

    useEffect(() => {

        const dummyDataBeforeJune = [2000000, 3000000, 2500000, 2700000, 2900000];
        let data2024 = new Array(12).fill(0);
        let totalIncome = 0;


        dummyDataBeforeJune.forEach((income, index) => {
            data2024[index] = income;
            totalIncome += income;
        });

        axios.get("/Chart/GrafikIncome.php")
            .then(response => {
                let juneIncome = 0;
                response.data.forEach(item => {
                    const monthIndex = item.month - 1;
                    const income = parseFloat(item.totalIncome) || 0;
                    if (monthIndex === 5) {
                        data2024[monthIndex] = income;
                        juneIncome = income;
                    }
                });

                totalIncome += juneIncome;


                const maxLimit = 10000000;
                const normalizedData2024 = scaleData(data2024, maxLimit);


                const dataForPrediction = normalizedData2024.slice(0, 6);
                const predictedData = calculateMovingAverage(dataForPrediction, windowSize)
                    .map(value => (value || 0) * predictionMultiplier + 1000000);


                const combinedData = [...normalizedData2024.slice(0, 6), ...predictedData.slice(windowSize - 1)];

                setChartSeries([
                    {
                        name: "2024",
                        data: combinedData,
                    }
                ]);
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

    return (
        <section className="w-full mb-8">
            <Card>
                <CardBody className="!p-2">
                    <div className="flex gap-2 flex-wrap justify-between px-4 !mt-4 ">
                        <h4 className="text-2xl font-semibold text-gray-900 flex items-center justify-center h-fit">
                            Prediksi Pendapatan Tahun 2024
                        </h4>
                        <div className="flex items-center gap-6">
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
                        colors={["#FF0000"]}
                        options={chartOptions}
                        series={chartSeries}
                    />
                </CardBody>
            </Card>
        </section>
    );
}
