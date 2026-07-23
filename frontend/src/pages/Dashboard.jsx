import { useState } from "react";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";
import Charts from "../components/Charts";

import "../styles/dashboard.css";


function Dashboard() {

    const [refreshKey, setRefreshKey] = useState(0);


    const refreshDashboard = () => {

        setRefreshKey(
            (previous) => previous + 1
        );

    };


    return (

        <div className="dashboard-page">

            <Navbar />


            <main className="dashboard-container">


                {/* DASHBOARD HEADER */}

                <div className="dashboard-header">

                    <div>

                        <h1>
                            Financial Dashboard
                        </h1>

                        <p>
                            Track your income, expenses
                            and financial activity.
                        </p>

                    </div>

                </div>


                {/* SUMMARY */}

                <SummaryCards
                    refreshKey={refreshKey}
                />


                {/* CHARTS */}

                <Charts
                    refreshKey={refreshKey}
                />


                {/* ADD TRANSACTION */}

                <section className="dashboard-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Add Transaction
                            </h2>

                            <p>
                                Record your income
                                and expenses.
                            </p>

                        </div>

                    </div>


                    <TransactionForm
                        onTransactionAdded={
                            refreshDashboard
                        }
                    />

                </section>


                {/* TRANSACTIONS */}

                <section className="dashboard-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Recent Transactions
                            </h2>

                            <p>
                                Search, edit and manage
                                your transactions.
                            </p>

                        </div>

                    </div>


                    <TransactionTable
                        refreshKey={refreshKey}
                        onTransactionChanged={
                            refreshDashboard
                        }
                    />

                </section>


            </main>

        </div>

    );

}


export default Dashboard;