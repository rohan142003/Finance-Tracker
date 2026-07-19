function Navbar() {

    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";

    };

    return (

        <nav className="navbar">

            <div className="navbar-content">

                <div className="navbar-brand">

                    <div className="brand-icon">
                        ₹
                    </div>

                    <div>
                        <h2>FinTrack</h2>
                        <span>Personal Finance Tracker</span>
                    </div>

                </div>

                <div className="navbar-actions">

                    <div className="user-avatar">
                        R
                    </div>

                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>

                </div>

            </div>

        </nav>

    );

}

export default Navbar;