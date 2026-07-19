import { useEffect, useState } from "react";
import api from "../services/api";

function SummaryCards({ refreshKey }) {

    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0
    });

    const [loading, setLoading] = useState(true);

useEffect(() => {
    loadDashboard();
}, []);

    const loadDashboard = async () => {

        try {

            const response =
                await api.get("/transactions/dashboard");

            setSummary(response.data);

        } catch (error) {

            console.error(
                "Failed to load dashboard:",
                error
            );

        } finally {

            setLoading(false);

        }

    };

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0
            }
        ).format(amount || 0);

    };

    if (loading) {

        return (
            <div className="summary-loading">
                Loading financial summary...
            </div>
        );

    }

    return (

        <section className="summary-grid">

            <div className="summary-card income-card">

                <div className="summary-card-top">

                    <div>
                        <p>Total Income</p>

                        <h2>
                            {formatCurrency(
                                summary.totalIncome
                            )}
                        </h2>
                    </div>

                    <div className="summary-icon">
                        ↑
                    </div>

                </div>

                <span className="summary-label">
                    Money received
                </span>

            </div>


            <div className="summary-card expense-card">

                <div className="summary-card-top">

                    <div>
                        <p>Total Expenses</p>

                        <h2>
                            {formatCurrency(
                                summary.totalExpense
                            )}
                        </h2>
                    </div>

                    <div className="summary-icon">
                        ↓
                    </div>

                </div>

                <span className="summary-label">
                    Money spent
                </span>

            </div>


            <div className="summary-card balance-card">

                <div className="summary-card-top">

                    <div>
                        <p>Current Balance</p>

                        <h2>
                            {formatCurrency(
                                summary.balance
                            )}
                        </h2>
                    </div>

                    <div className="summary-icon">
                        ₹
                    </div>

                </div>

                <span className="summary-label">
                    Available balance
                </span>

            </div>

        </section>

    );

}

export default SummaryCards;