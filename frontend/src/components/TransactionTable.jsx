import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionTable() {

    const [transactions, setTransactions] = useState([]);

    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");

    const [typeFilter, setTypeFilter] =
        useState("ALL");

    const [categoryFilter, setCategoryFilter] =
        useState("ALL");


    useEffect(() => {

        loadTransactions();

    }, []);


    const loadTransactions = async () => {

        try {

            setLoading(true);

            const response =
                await api.get("/transactions");

            setTransactions(response.data);

        } catch (error) {

            console.error(
                "Failed to load transactions:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    const deleteTransaction = async (id) => {

        const confirmDelete =
            window.confirm(
                "Are you sure you want to delete this transaction?"
            );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/transactions/${id}`
            );

            // Remove immediately from UI
            setTransactions(
                transactions.filter(
                    (transaction) =>
                        transaction.id !== id
                )
            );

        } catch (error) {

            console.error(
                "Delete failed:",
                error
            );

            alert(
                "Failed to delete transaction."
            );

        }

    };


    const formatCurrency = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR"
            }
        ).format(amount || 0);

    };


    const filteredTransactions =
        transactions.filter(
            (transaction) => {

                const searchText =
                    search.toLowerCase();

                const matchesSearch =

                    transaction.title
                        ?.toLowerCase()
                        .includes(searchText)

                    ||

                    transaction.description
                        ?.toLowerCase()
                        .includes(searchText)

                    ||

                    transaction.category
                        ?.toLowerCase()
                        .includes(searchText);


                const matchesType =

                    typeFilter === "ALL"

                    ||

                    transaction.type ===
                        typeFilter;


                const matchesCategory =

                    categoryFilter === "ALL"

                    ||

                    transaction.category ===
                        categoryFilter;


                return (
                    matchesSearch &&
                    matchesType &&
                    matchesCategory
                );

            }
        );


    if (loading) {

        return (

            <div className="table-loading">

                Loading transactions...

            </div>

        );

    }


    return (

        <div className="transaction-table-container">


            {/* Search and Filters */}

            <div className="transaction-toolbar">

                <div className="search-container">

                    <input
                        type="text"
                        placeholder="Search transactions..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                </div>


                <div className="filter-container">

                    <select
                        value={typeFilter}
                        onChange={(e) =>
                            setTypeFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="ALL">
                            All Types
                        </option>

                        <option value="INCOME">
                            Income
                        </option>

                        <option value="EXPENSE">
                            Expense
                        </option>

                    </select>


                    <select
                        value={categoryFilter}
                        onChange={(e) =>
                            setCategoryFilter(
                                e.target.value
                            )
                        }
                    >

                        <option value="ALL">
                            All Categories
                        </option>

                        <option value="SALARY">
                            Salary
                        </option>

                        <option value="FOOD">
                            Food
                        </option>

                        <option value="TRAVEL">
                            Travel
                        </option>

                        <option value="SHOPPING">
                            Shopping
                        </option>

                        <option value="BILLS">
                            Bills
                        </option>

                        <option value="HEALTH">
                            Health
                        </option>

                        <option value="ENTERTAINMENT">
                            Entertainment
                        </option>

                        <option value="OTHER">
                            Other
                        </option>

                    </select>

                </div>

            </div>


            {/* Transaction Table */}

            <div className="table-wrapper">

                <table className="transaction-table">

                    <thead>

                        <tr>

                            <th>Title</th>

                            <th>Category</th>

                            <th>Type</th>

                            <th>Amount</th>

                            <th>Date</th>

                            <th>Description</th>

                            <th>Action</th>

                        </tr>

                    </thead>


                    <tbody>

                        {filteredTransactions.length > 0
                            ? (

                            filteredTransactions.map(
                                (transaction) => (

                                <tr
                                    key={
                                        transaction.id
                                    }
                                >

                                    <td>

                                        <strong>

                                            {
                                                transaction.title
                                            }

                                        </strong>

                                    </td>


                                    <td>

                                        <span className="category-badge">

                                            {
                                                transaction.category
                                            }

                                        </span>

                                    </td>


                                    <td>

                                        <span
                                            className={
                                                transaction.type ===
                                                "INCOME"
                                                    ? "type-badge income-badge"
                                                    : "type-badge expense-badge"
                                            }
                                        >

                                            {
                                                transaction.type
                                            }

                                        </span>

                                    </td>


                                    <td
                                        className={
                                            transaction.type ===
                                            "INCOME"
                                                ? "amount-income"
                                                : "amount-expense"
                                        }
                                    >

                                        {
                                            transaction.type ===
                                            "INCOME"
                                                ? "+"
                                                : "-"
                                        }

                                        {
                                            formatCurrency(
                                                transaction.amount
                                            )
                                        }

                                    </td>


                                    <td>

                                        {
                                            transaction.date
                                        }

                                    </td>


                                    <td>

                                        {
                                            transaction.description
                                                || "-"
                                        }

                                    </td>


                                    <td>

                                        <div className="table-actions">

                                            <button
                                                className="edit-button"
                                                onClick={() =>
                                                    alert(
                                                        "Edit feature coming next!"
                                                    )
                                                }
                                            >

                                                Edit

                                            </button>


                                            <button
                                                className="delete-button"
                                                onClick={() =>
                                                    deleteTransaction(
                                                        transaction.id
                                                    )
                                                }
                                            >

                                                Delete

                                            </button>

                                        </div>

                                    </td>

                                </tr>

                            ))

                        ) : (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="empty-state"
                                >

                                    <div>

                                        <h3>
                                            No transactions found
                                        </h3>

                                        <p>
                                            Try changing your
                                            search or filters.
                                        </p>

                                    </div>

                                </td>

                            </tr>

                        )}

                    </tbody>

                </table>

            </div>

        </div>

    );

}

export default TransactionTable;