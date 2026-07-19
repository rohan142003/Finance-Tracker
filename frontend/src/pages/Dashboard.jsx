import { useState } from "react";

import Navbar from "../components/Navbar";
import SummaryCards from "../components/SummaryCards";
import Charts from "../components/Charts";
import TransactionForm from "../components/TransactionForm";
import TransactionTable from "../components/TransactionTable";

import "../styles/dashboard.css";

function Dashboard() {

    const [refreshKey, setRefreshKey] = useState(0);

    const refreshDashboard = () => {
        setRefreshKey((previousKey) => previousKey + 1);
    };

    return (

        <div className="dashboard-page">

            <Navbar />

            <main className="dashboard-container">

                <section className="dashboard-header">

                    <div>

                        <h1>Financial Dashboard</h1>

                        <p>
                            Track your income, expenses and manage
                            your finances in one place.
                        </p>

                    </div>

                    <div className="dashboard-date">

                        {new Date().toLocaleDateString(
                            "en-IN",
                            {
                                day: "numeric",
                                month: "long",
                                year: "numeric"
                            }
                        )}

                    </div>

                </section>


                <SummaryCards
                    refreshKey={refreshKey}
                />


                <section className="dashboard-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Financial Overview
                            </h2>

                            <p>
                                Visual breakdown of
                                your finances
                            </p>

                        </div>

                    </div>

                    <Charts
                        refreshKey={refreshKey}
                    />

                </section>


                <section className="dashboard-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Add Transaction
                            </h2>

                            <p>
                                Record your latest
                                income or expense
                            </p>

                        </div>

                    </div>

                    <TransactionForm
                        onTransactionAdded={
                            refreshDashboard
                        }
                    />

                </section>


                <section className="dashboard-section">

                    <div className="section-header">

                        <div>

                            <h2>
                                Recent Transactions
                            </h2>

                            <p>
                                View and manage your
                                transaction history
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