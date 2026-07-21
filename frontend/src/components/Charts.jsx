import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";

import { Pie, Bar } from "react-chartjs-2";
import { useEffect, useState } from "react";
import api from "../services/api";


ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);


function Charts({ refreshKey }) {

    const [dashboard, setDashboard] = useState({

        totalIncome: 0,
        totalExpense: 0,
        balance: 0

    });


    // ==========================================
    // LOAD DASHBOARD DATA
    // ==========================================

    const loadDashboard = async () => {

        try {

            const response =
                await api.get(
                    "/transactions/dashboard"
                );


            setDashboard(
                response.data
            );


        } catch (error) {

            console.error(
                "Error loading chart data:",
                error.response?.data || error
            );

        }

    };


    // ==========================================
    // REFRESH CHARTS
    // ==========================================

    useEffect(() => {

        loadDashboard();

    }, [refreshKey]);


    // ==========================================
    // PIE CHART DATA
    // ==========================================

    const pieData = {

        labels: [
            "Income",
            "Expense"
        ],

        datasets: [

            {

                data: [

                    dashboard.totalIncome,

                    dashboard.totalExpense

                ],


                // Income = Green
                // Expense = Red

                backgroundColor: [

                    "#22c55e",

                    "#ef4444"

                ],


                borderColor: [

                    "#16a34a",

                    "#dc2626"

                ],


                borderWidth: 2

            }

        ]

    };


    // ==========================================
    // BAR CHART DATA
    // ==========================================

    const barData = {

        labels: [

            "Income",

            "Expense",

            "Balance"

        ],

        datasets: [

            {

                label:
                    "Finance Summary",


                data: [

                    dashboard.totalIncome,

                    dashboard.totalExpense,

                    dashboard.balance

                ],


                // Income = Green
                // Expense = Red
                // Balance = Blue

                backgroundColor: [

                    "#22c55e",

                    "#ef4444",

                    "#3b82f6"

                ],


                borderColor: [

                    "#16a34a",

                    "#dc2626",

                    "#2563eb"

                ],


                borderWidth: 1

            }

        ]

    };


    // ==========================================
    // CHART OPTIONS
    // ==========================================

    const pieOptions = {

        responsive: true,

        maintainAspectRatio: true,

        plugins: {

            legend: {

                position: "bottom"

            }

        }

    };


    const barOptions = {

        responsive: true,

        maintainAspectRatio: true,

        plugins: {

            legend: {

                display: false

            }

        },

        scales: {

            y: {

                beginAtZero: true

            }

        }

    };


    return (

        <div className="charts-section">


            <h2>
                Finance Charts
            </h2>


            <div
                style={{

                    display: "flex",

                    gap: "50px",

                    flexWrap: "wrap",

                    alignItems: "center",

                    justifyContent: "center"

                }}
            >


                {/* =========================
                    PIE CHART
                ========================= */}

                <div
                    style={{

                        width: "350px",

                        maxWidth: "100%"

                    }}
                >

                    <Pie

                        data={pieData}

                        options={pieOptions}

                    />

                </div>


                {/* =========================
                    BAR CHART
                ========================= */}

                <div
                    style={{

                        width: "450px",

                        maxWidth: "100%"

                    }}
                >

                    <Bar

                        data={barData}

                        options={barOptions}

                    />

                </div>


            </div>


        </div>

    );

}


export default Charts;