import { useEffect, useState } from "react";
import api from "../services/api";


function Navbar() {

    const [user, setUser] = useState(null);


    useEffect(() => {

        const loadCurrentUser = async () => {

            try {

                const response =
                    await api.get("/auth/me");

                setUser(response.data);

            } catch (error) {

                console.error(
                    "Failed to load current user:",
                    error
                );

            }

        };


        loadCurrentUser();

    }, []);


    const handleLogout = () => {

        localStorage.removeItem("token");

        window.location.href = "/";

    };


    const initial =
        user?.name
            ? user.name.charAt(0).toUpperCase()
            : "?";


    return (

        <nav className="navbar">

            <div className="navbar-content">

                <div className="navbar-brand">

                    <div className="brand-icon">
                        ₹
                    </div>

                    <div>

                        <h2>FinTrack</h2>

                        <span>
                            Personal Finance Tracker
                        </span>

                    </div>

                </div>


                <div className="navbar-actions">

                    <div className="user-info">

                        <div className="user-avatar">
                            {initial}
                        </div>


                        {user && (

                            <div className="user-details">

                                <strong>
                                    {user.name}
                                </strong>

                                <span>
                                    {user.email}
                                </span>

                            </div>

                        )}

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