import { useState } from "react";
import api from "../services/api";

function TransactionForm({ onTransactionAdded }) {

    const [transaction, setTransaction] = useState({
        title: "",
        amount: "",
        type: "INCOME",
        category: "SALARY",
        date: "",
        description: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setTransaction({
            ...transaction,
            [e.target.name]: e.target.value
        });
    };

    const saveTransaction = async (e) => {

        e.preventDefault();

        if (
            !transaction.title ||
            !transaction.amount ||
            !transaction.date
        ) {
            alert("Please fill all required fields.");
            return;
        }

        try {

            setLoading(true);

            await api.post("/transactions", {
                ...transaction,
                amount: Number(transaction.amount)
            });

alert("Transaction Added Successfully!");

setTransaction({
    title: "",
    amount: "",
    type: "INCOME",
    category: "SALARY",
    date: "",
    description: ""
});

if (onTransactionAdded) {
    onTransactionAdded();
}

            // Temporary refresh so dashboard + table update
            window.location.reload();

        } catch (error) {

            console.error(
                "Error adding transaction:",
                error.response?.data || error
            );

            alert("Failed to add transaction.");

        } finally {

            setLoading(false);

        }
    };

    return (

        <form
            className="transaction-form"
            onSubmit={saveTransaction}
        >

            <div className="form-grid">

                <div className="form-group">

                    <label>Transaction Title *</label>

                    <input
                        type="text"
                        name="title"
                        value={transaction.title}
                        placeholder="e.g. Monthly Salary"
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>Amount *</label>

                    <input
                        type="number"
                        name="amount"
                        value={transaction.amount}
                        placeholder="₹ 0"
                        min="0"
                        step="0.01"
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>Transaction Type</label>

                    <select
                        name="type"
                        value={transaction.type}
                        onChange={handleChange}
                    >

                        <option value="INCOME">
                            Income
                        </option>

                        <option value="EXPENSE">
                            Expense
                        </option>

                    </select>

                </div>


                <div className="form-group">

                    <label>Category</label>

                    <select
                        name="category"
                        value={transaction.category}
                        onChange={handleChange}
                    >

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


                <div className="form-group">

                    <label>Date *</label>

                    <input
                        type="date"
                        name="date"
                        value={transaction.date}
                        onChange={handleChange}
                    />

                </div>


                <div className="form-group">

                    <label>Description</label>

                    <input
                        type="text"
                        name="description"
                        value={transaction.description}
                        placeholder="Optional description"
                        onChange={handleChange}
                    />

                </div>

            </div>


            <div className="form-actions">

                <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                >

                    {loading
                        ? "Adding..."
                        : "+ Add Transaction"
                    }

                </button>

            </div>

        </form>

    );
}

export default TransactionForm;