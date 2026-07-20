import { useEffect, useState } from "react";
import api from "../services/api";

function TransactionTable({ refreshKey }) {

    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    // Search
    const [searchTerm, setSearchTerm] = useState("");

    // Edit
    const [editingId, setEditingId] = useState(null);

    const [editTransaction, setEditTransaction] = useState({
        title: "",
        amount: "",
        type: "INCOME",
        category: "SALARY",
        date: "",
        description: ""
    });


    // ==============================
    // LOAD TRANSACTIONS
    // ==============================

    const loadTransactions = async () => {

        try {

            setLoading(true);

            const response = await api.get("/transactions");

            setTransactions(response.data);

        } catch (error) {

            console.error(
                "Error loading transactions:",
                error.response?.data || error
            );

        } finally {

            setLoading(false);

        }

    };


    // Reload whenever refreshKey changes
    // This happens after adding a transaction

    useEffect(() => {

        loadTransactions();

    }, [refreshKey]);


    // ==============================
    // DELETE TRANSACTION
    // ==============================

    const deleteTransaction = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this transaction?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(
                `/transactions/${id}`
            );

            alert(
                "Transaction Deleted Successfully"
            );

            // Immediately reload transactions
            await loadTransactions();

        } catch (error) {

            console.error(
                "Error deleting transaction:",
                error.response?.data || error
            );

            alert(
                "Failed to delete transaction"
            );

        }

    };


    // ==============================
    // START EDITING
    // ==============================

    const startEdit = (transaction) => {

        setEditingId(transaction.id);

        setEditTransaction({

            title: transaction.title,

            amount: transaction.amount,

            type: transaction.type,

            category: transaction.category,

            date: transaction.date,

            description:
                transaction.description || ""

        });

    };


    // ==============================
    // HANDLE EDIT INPUT
    // ==============================

    const handleEditChange = (e) => {

        setEditTransaction({

            ...editTransaction,

            [e.target.name]:
                e.target.value

        });

    };


    // ==============================
    // SAVE EDITED TRANSACTION
    // ==============================

    const saveEdit = async (id) => {

        try {

            await api.put(
                `/transactions/${id}`,
                {
                    ...editTransaction,

                    amount:
                        Number(
                            editTransaction.amount
                        )
                }
            );

            alert(
                "Transaction Updated Successfully"
            );

            setEditingId(null);

            // Reload updated transactions
            await loadTransactions();

        } catch (error) {

            console.error(
                "Error updating transaction:",
                error.response?.data || error
            );

            alert(
                "Failed to update transaction"
            );

        }

    };


    // ==============================
    // CANCEL EDIT
    // ==============================

    const cancelEdit = () => {

        setEditingId(null);

    };


    // ==============================
    // SEARCH FILTER
    // ==============================

    const filteredTransactions =
        transactions.filter((transaction) => {

            const search =
                searchTerm.toLowerCase();

            return (

                transaction.title
                    ?.toLowerCase()
                    .includes(search) ||

                transaction.category
                    ?.toLowerCase()
                    .includes(search) ||

                transaction.type
                    ?.toLowerCase()
                    .includes(search) ||

                transaction.description
                    ?.toLowerCase()
                    .includes(search) ||

                transaction.date
                    ?.toLowerCase()
                    .includes(search)

            );

        });


    // ==============================
    // LOADING
    // ==============================

    if (loading) {

        return (

            <p>
                Loading transactions...
            </p>

        );

    }


    return (

        <div className="transaction-table-container">


            {/* ==========================
                SEARCH BAR
            ========================== */}

            <div className="transaction-search">

                <input
                    type="text"
                    placeholder="Search transactions..."
                    value={searchTerm}
                    onChange={(e) =>
                        setSearchTerm(
                            e.target.value
                        )
                    }
                />

            </div>


            {/* ==========================
                TRANSACTION TABLE
            ========================== */}

            <table className="transaction-table">

                <thead>

                    <tr>

                        <th>Title</th>

                        <th>Amount</th>

                        <th>Type</th>

                        <th>Category</th>

                        <th>Date</th>

                        <th>Description</th>

                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    {filteredTransactions.length > 0 ? (

                        filteredTransactions.map(
                            (t) => (

                                <tr key={t.id}>


                                    {/* TITLE */}

                                    <td>

                                        {editingId === t.id ? (

                                            <input
                                                name="title"
                                                value={
                                                    editTransaction.title
                                                }
                                                onChange={
                                                    handleEditChange
                                                }
                                            />

                                        ) : (

                                            t.title

                                        )}

                                    </td>


                                    {/* AMOUNT */}

                                    <td>

                                        {editingId === t.id ? (

                                            <input
                                                type="number"
                                                name="amount"
                                                value={
                                                    editTransaction.amount
                                                }
                                                onChange={
                                                    handleEditChange
                                                }
                                            />

                                        ) : (

                                            `₹${t.amount}`

                                        )}

                                    </td>


                                    {/* TYPE */}

                                    <td>

                                        {editingId === t.id ? (

                                            <select
                                                name="type"
                                                value={
                                                    editTransaction.type
                                                }
                                                onChange={
                                                    handleEditChange
                                                }
                                            >

                                                <option value="INCOME">
                                                    INCOME
                                                </option>

                                                <option value="EXPENSE">
                                                    EXPENSE
                                                </option>

                                            </select>

                                        ) : (

                                            t.type

                                        )}

                                    </td>


                                    {/* CATEGORY */}

                                    <td>

                                        {editingId === t.id ? (

                                            <select
                                                name="category"
                                                value={
                                                    editTransaction.category
                                                }
                                                onChange={
                                                    handleEditChange
                                                }
                                            >

                                                <option value="SALARY">
                                                    SALARY
                                                </option>

                                                <option value="FOOD">
                                                    FOOD
                                                </option>

                                                <option value="TRAVEL">
                                                    TRAVEL
                                                </option>

                                                <option value="SHOPPING">
                                                    SHOPPING
                                                </option>

                                                <option value="BILLS">
                                                    BILLS
                                                </option>

                                                <option value="HEALTH">
                                                    HEALTH
                                                </option>

                                                <option value="ENTERTAINMENT">
                                                    ENTERTAINMENT
                                                </option>

                                                <option value="OTHER">
                                                    OTHER
                                                </option>

                                            </select>

                                        ) : (

                                            t.category

                                        )}

                                    </td>


                                    {/* DATE */}

                                    <td>

                                        {editingId === t.id ? (

                                            <input
                                                type="date"
                                                name="date"
                                                value={
                                                    editTransaction.date
                                                }
                                                onChange={
                                                    handleEditChange
                                                }
                                            />

                                        ) : (

                                            t.date

                                        )}

                                    </td>


                                    {/* DESCRIPTION */}

                                    <td>

                                        {editingId === t.id ? (

                                            <input
                                                name="description"
                                                value={
                                                    editTransaction.description
                                                }
                                                onChange={
                                                    handleEditChange
                                                }
                                            />

                                        ) : (

                                            t.description

                                        )}

                                    </td>


                                    {/* ACTIONS */}

                                    <td>

                                        {editingId === t.id ? (

                                            <div className="action-buttons">

                                                <button
                                                    className="save-button"
                                                    onClick={() =>
                                                        saveEdit(
                                                            t.id
                                                        )
                                                    }
                                                >
                                                    Save
                                                </button>


                                                <button
                                                    className="cancel-button"
                                                    onClick={
                                                        cancelEdit
                                                    }
                                                >
                                                    Cancel
                                                </button>

                                            </div>

                                        ) : (

                                            <div className="action-buttons">

                                                <button
                                                    className="edit-button"
                                                    onClick={() =>
                                                        startEdit(
                                                            t
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>


                                                <button
                                                    className="delete-button"
                                                    onClick={() =>
                                                        deleteTransaction(
                                                            t.id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>

                                            </div>

                                        )}

                                    </td>

                                </tr>

                            )
                        )

                    ) : (

                        <tr>

                            <td
                                colSpan="7"
                                style={{
                                    textAlign:
                                        "center"
                                }}
                            >

                                {searchTerm
                                    ? "No matching transactions found"
                                    : "No Transactions Found"
                                }

                            </td>

                        </tr>

                    )}

                </tbody>

            </table>

        </div>

    );

}

export default TransactionTable;